import { observable, computed } from 'mobx'
import { make_pair ,TreeMap } from 'tstl'
import IntervalTree from 'node-interval-tree'

import Track from 'standard/track'
import TrackItem from 'standard/track-item'

import TrackItemHost from "./track-item-host";

let __next_track_item_host_set_id = 0;
export class TrackItemHostSet {
  readonly id: number;
  @observable private trackItemHosts_: Set<TrackItemHost>;


  constructor() {
    this.id = __next_track_item_host_set_id++;
    this.trackItemHosts_ = new Set();
  }

  add(trackItemHost: TrackItemHost) {
    this.trackItemHosts_.add(trackItemHost);
  }

  remove(trackItemHost: TrackItemHost) {
    this.trackItemHosts_.delete(trackItemHost);
  }

  get value() {
    return this.trackItemHosts_ as ReadonlySet<TrackItemHost>;
  }
}

export default class TrackHost {

  track: Track;

  private startTimeSet: TreeMap<number, TrackItemHost>;
  private endTimeSet: TreeMap<number, TrackItemHost>;
  private intervalTree: IntervalTree<TrackItemHost>;

  @observable private trackItemHosts_: Map<TrackItem, TrackItemHost>;
  get trackItemHosts(): ReadonlyMap<TrackItem, TrackItemHost> {
    return this.trackItemHosts_; }

  @observable private activatedTrackItemHostSets_: Set<TrackItemHostSet>;
  get activatedTrackItemHostSets(): ReadonlySet<TrackItemHostSet> {
    return this.activatedTrackItemHostSets_; }

  constructor(track: Track) {
    this.track = track;
    this.trackItemHosts_ = new Map<TrackItem, TrackItemHost>();
    this.activatedTrackItemHostSets_ = new Set<TrackItemHostSet>();
    this.startTimeSet = new TreeMap<number, TrackItemHost>();
    this.endTimeSet = new TreeMap<number, TrackItemHost>();
    this.intervalTree = new IntervalTree<TrackItemHost>();

    this.track.trackItems.forEach(trackItem => {
      this.addTrackItemHost(trackItem);
    })

    this.addTrackItemHost = this.addTrackItemHost.bind(this);
    this.removeTrackItemHost = this.removeTrackItemHost.bind(this);
    this.trackItemTimeChangeHandler = this.trackItemTimeChangeHandler.bind(this);

    this.track.ee.on('addTrackItem', this.addTrackItemHost);
    this.track.ee.on('willRemoveTrackItem', this.removeTrackItemHost);
    this.track.ee.on('trackItemTimeChange', this.trackItemTimeChangeHandler);
  }

  private addTrackItemHost(trackItem: TrackItem) {
    let trackItemHost = new TrackItemHost(trackItem);
    this.trackItemHosts_.set(trackItem, trackItemHost);
    // Update set
    this.startTimeSet.insert(make_pair(trackItemHost.startTime, trackItemHost));
    this.endTimeSet.insert(make_pair(trackItemHost.endTime, trackItemHost));
    // Update interval tree
    this.intervalTree.insert(trackItem.startTime, trackItem.endTime, trackItemHost);
  }

  private removeTrackItemHost(trackItem: TrackItem) {
    const trackItemHost = this.trackItemHosts.get(trackItem);
    // Update set
    this.startTimeSet.erase(trackItem.startTime);
    this.endTimeSet.erase(trackItem.endTime);
    // Update interval tree
    this.intervalTree.remove(trackItem.startTime, trackItem.endTime, trackItemHost);
    // delete it
    this.trackItemHosts_.delete(trackItem);
  }

  private trackItemTimeChangeHandler(trackItem: TrackItem, lastStartTime: number, lastEndTime: number) {
    const trackItemHost = this.trackItemHosts.get(trackItem);
    trackItemHost.startTime = trackItem.startTime;
    trackItemHost.endTime = trackItem.endTime;
    console.log('time changed',trackItemHost)
    // Update set
    this.startTimeSet.erase(lastStartTime);
    this.endTimeSet.erase(lastEndTime);
    this.startTimeSet.insert(make_pair(trackItemHost.startTime, trackItemHost));
    this.endTimeSet.insert(make_pair(trackItemHost.endTime, trackItemHost));
    // Update interval tree
    this.intervalTree.remove(lastStartTime, lastEndTime, trackItemHost);
    this.intervalTree.insert(trackItem.startTime, trackItem.endTime, trackItemHost);
  }

  getTrackItemHostAt(time: number) {
    let it = this.endTimeSet.lower_bound(time);
    if (it.equals(this.endTimeSet.end())) return null;
    if (it.value.first == time) {
      it = this.startTimeSet.lower_bound(time);
      if (it.equals(this.startTimeSet.end())) return null;
      if (it.value.first == time) return it.value.second;
      return null;
    }
    if (it.equals(this.endTimeSet.end())) return null;
    if (it.value.second.startTime <= time) return it.value.second;
    return null;
  }

  getTrackItemHostsAtRange(startTime: number, endTime: number): Array<TrackItemHost> {
    return this.intervalTree.search(startTime, endTime);
  }

  private _getClosestTime(time: number, set: TreeMap<number, TrackItemHost>): number {
    let it = set.lower_bound(time);
    if (it.equals(set.end())) {
      console.assert(set.size() != 0);
      return set.rbegin().value.first;
    }
    if (it.equals(set.begin())) return it.value.first;
    let prev = it.prev();
    const le = prev.value;
    const ri = it.value;
    return (Math.abs(le.first - time) > Math.abs(ri.first - time)) ?
            ri.first: le.first;
  }

  getClosestSnapTime(time: number) {
    if (this.startTimeSet.size() == 0) return Infinity;
    const le = this._getClosestTime(time, this.startTimeSet);
    const ri = this._getClosestTime(time, this.endTimeSet);
    return (Math.abs(le - time) > Math.abs(ri - time)) ? 
           ri : le;
  }

  getFirstFocusedTrackItemHost(): TrackItemHost {
    let first = null;
    let firstTime = Infinity;
    this.trackItemHosts_.forEach(trackItemHost => {
      if (trackItemHost.trackItem.startTime < firstTime) {
        first = trackItemHost;
        firstTime = trackItemHost.trackItem.startTime;
      }
    })
    return first;
  }

  getLastFocusedTrackItemHost(): TrackItemHost {
    let last = null;
    let lastTime = -Infinity;
    this.trackItemHosts_.forEach(trackItemHost => {
      if (trackItemHost.trackItem.startTime > lastTime) {
        last = trackItemHost;
        lastTime = trackItemHost.trackItem.startTime;
      }
    })
    return last;
  }

  private calculateTrackItemBoundary(trackItemHost: TrackItemHost) {
    let sIt = this.startTimeSet.upper_bound(trackItemHost.startTime);
    if (sIt.equals(this.startTimeSet.end())) trackItemHost.endBoundaryTime = Infinity;
    else trackItemHost.endBoundaryTime = sIt.value.first;
    let eIt = this.endTimeSet.lower_bound(trackItemHost.startTime);
    if (eIt.equals(this.endTimeSet.end()))
      if (this.endTimeSet.size() == 0) trackItemHost.startBoundaryTime = -Infinity;
      else trackItemHost.startBoundaryTime = this.endTimeSet.rbegin().value.first;
    else if (eIt.value.first == trackItemHost.startTime) trackItemHost.startBoundaryTime = eIt.value.first;
    else if (eIt.equals(this.endTimeSet.begin())) trackItemHost.startBoundaryTime = -Infinity;
    else trackItemHost.startBoundaryTime = eIt.prev().value.first;
  }

  addActivatedTrackItemHostSet(set: TrackItemHostSet) {
    this.activatedTrackItemHostSets_.add(set);
  }

  removeActivatedTrackItemHostSet(set: TrackItemHostSet) {
    this.activatedTrackItemHostSets_.delete(set);
  }

}