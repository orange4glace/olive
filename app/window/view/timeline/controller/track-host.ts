import { observable, autorun } from 'window/app-mobx';

import { make_pair ,TreeMap } from 'tstl'
import IntervalTree from 'node-interval-tree'

import TrackItemHost from "./track-item-host";
import TrackItem from 'internal/timeline/track-item';
import Track, { TrackEvent } from 'internal/timeline/track';
import { IReactionDisposer } from 'mobx';
import { TimePair } from 'internal/timeline/time-pair';
import app from 'internal/app';

export class GhostTrackItem {
  @observable start: number;
  @observable end: number;
  baseStart: number;
  baseEnd: number;
  trackItem: TrackItem;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.baseStart = start;
    this.baseEnd = end;
  }
}

let __next_track_item_host_set_id = 0;
export class GhostTrackItemSet {
  readonly id: number;
  @observable private ghostTrackItems_: Set<GhostTrackItem>;

  @observable baseTime: number = 0;
  @observable leftTime: number = 0;
  @observable rightTime: number = 0;

  private leftMax_: number = Infinity;
  private leftMin_: number = -Infinity;
  private rightMax_: number = Infinity;
  private rightMin_: number = -Infinity;
  get leftMax() { return this.leftMax_; }
  get leftMin() { return this.leftMin_; }
  get rightMax() { return this.rightMax_; }
  get rightMin() { return this.rightMin_; }

  constructor() {
    this.id = __next_track_item_host_set_id++;
    this.ghostTrackItems_ = new Set();
  }

  add(ghostTrackItem: GhostTrackItem) {
    this.ghostTrackItems_.add(ghostTrackItem);
  }

  remove(ghostTrackItem: GhostTrackItem) {
    this.ghostTrackItems_.delete(ghostTrackItem);
  }

  get value() {
    return this.ghostTrackItems_ as ReadonlySet<GhostTrackItem>;
  }

  setLeftMax(value: number) { this.leftMax_ = value; }
  setLeftMin(value: number) { this.leftMin_ = value; }
  setRightMax(value: number) { this.rightMax_ = value; }
  setRightMin(value: number) { this.rightMin_ = value; }
}

let __next_track_host_id = 0;

export default class TrackHost {

  readonly id = __next_track_host_id++;
  track: Track;

  private startTimeSet: TreeMap<number, TrackItem>;
  private endTimeSet: TreeMap<number, TrackItem>;
  private intervalTree: IntervalTree<TrackItem>;

  private trackItemMap: Map<TrackItem, TrackItemHost>;
  @observable private focusedTrackItemHosts_: Set<TrackItemHost>;
  get focusedTrackItemHosts(): ReadonlySet<TrackItemHost> {
    return this.focusedTrackItemHosts_; }

  @observable private trackItemHosts_: Set<TrackItemHost>;
  get trackItemHosts(): ReadonlySet<TrackItemHost> {
    return this.trackItemHosts_; }

  @observable private ghostTrackItemSets_: Set<GhostTrackItemSet>;
  get ghostTrackItemSets(): ReadonlySet<GhostTrackItemSet> {
    return this.ghostTrackItemSets_; }

  constructor(track: Track) {
    this.track = track;
    this.trackItemMap = new Map<TrackItem, TrackItemHost>();
    this.trackItemHosts_ = new Set<TrackItemHost>();
    this.ghostTrackItemSets_ = new Set<GhostTrackItemSet>();
    this.startTimeSet = new TreeMap<number, TrackItem>();
    this.endTimeSet = new TreeMap<number, TrackItem>();
    this.intervalTree = new IntervalTree<TrackItem>();
    this.focusedTrackItemHosts_ = new Set();

    this.trackItemAddedHandler = this.trackItemAddedHandler.bind(this);
    this.trackItemRemovedHandler = this.trackItemRemovedHandler.bind(this);
    this.trackItemTimeChangeHandler = this.trackItemTimeChangeHandler.bind(this);

    track.trackItems.forEach(trackItem => {
      this.trackItemAddedHandler(trackItem);
    });
    track.addEventListener(TrackEvent.TRACK_ITEM_ADDED, this.trackItemAddedHandler);
    track.addEventListener(TrackEvent.TRACK_ITEM_REMOVED, this.trackItemRemovedHandler);
    track.addEventListener(TrackEvent.TRACK_ITEM_TIME_CHANGED, this.trackItemTimeChangeHandler);
  }

  destructor() {
    this.track.removeEventListener(TrackEvent.TRACK_ITEM_ADDED, this.trackItemAddedHandler);
    this.track.removeEventListener(TrackEvent.TRACK_ITEM_REMOVED, this.trackItemRemovedHandler);
    this.track.removeEventListener(TrackEvent.TRACK_ITEM_TIME_CHANGED, this.trackItemTimeChangeHandler);
  }

  private trackItemAddedHandler(trackItem: TrackItem) {
    // Update set
    this.startTimeSet.insert(make_pair(trackItem.time.start, trackItem));
    this.endTimeSet.insert(make_pair(trackItem.time.end, trackItem));
    // Update interval tree
    this.intervalTree.insert(trackItem.time.start, trackItem.time.end, trackItem);
  }

  private trackItemRemovedHandler(trackItem: TrackItem) {
    // Update set
    this.startTimeSet.erase(trackItem.time.start);
    this.endTimeSet.erase(trackItem.time.end);
    // Update interval tree
    this.intervalTree.remove(trackItem.time.start, trackItem.time.end, trackItem);

  }

  private trackItemTimeChangeHandler(trackItem: TrackItem, oldTimePair: TimePair, newTimePair: TimePair) {
    // Update set
    this.startTimeSet.erase(oldTimePair.start);
    this.endTimeSet.erase(oldTimePair.end);
    this.startTimeSet.insert(make_pair(newTimePair.start, trackItem));
    this.endTimeSet.insert(make_pair(newTimePair.end, trackItem));
    // Update interval tree
    this.intervalTree.remove(oldTimePair.start, oldTimePair.end, trackItem);
    this.intervalTree.insert(newTimePair.start, newTimePair.end, trackItem);
  }

  addTrackItemHost(trackItemHost: TrackItemHost) {
    this.trackItemMap.set(trackItemHost.trackItem, trackItemHost);
    this.trackItemHosts_.add(trackItemHost);
  }

  removeTrackItemHost(trackItemHost: TrackItemHost) {
    console.assert(this.trackItemHosts.has(trackItemHost));
    // delete it
    this.trackItemMap.delete(trackItemHost.trackItem);
    this.trackItemHosts_.delete(trackItemHost);
    this.defocusTrackItemHost(trackItemHost);
  }

  getTrackItemHost(trackItem: TrackItem) {
    return this.trackItemMap.get(trackItem);
  }

  getTrackItemHostAt(time: number) {
    let trackItem = this.track.getTrackItemAt(time);
    if (trackItem == null) return null;
    return this.trackItemMap.get(trackItem);
  }

  getTrackItemsAtRange(startTime: number, endTime: number): Array<TrackItem> {
    return this.intervalTree.search(startTime, endTime);
  }

  addGhostTrackItemSet(set: GhostTrackItemSet) {
    this.ghostTrackItemSets_.add(set);
  }

  removeGhostTrackItemSet(set: GhostTrackItemSet) {
    this.ghostTrackItemSets_.delete(set);
  }

  private _getClosestTime(time: number, set: TreeMap<number, TrackItem>): number {
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

  focusTrackItemHost(trackItemHost: TrackItemHost) {
    trackItemHost.focused = true;
    this.focusedTrackItemHosts_.add(trackItemHost);
  }
  
  defocusTrackItemHost(trackItemHost: TrackItemHost) {
    trackItemHost.focused = false;
    this.focusedTrackItemHosts_.delete(trackItemHost);
  }

  defocusAllTrackItemHosts(): void {
    this.focusedTrackItemHosts_.forEach(trackItemHost => {
      this.defocusTrackItemHost(trackItemHost);
    })
  }

  getFirstFocusedTrackItemHost(): TrackItemHost {
    console.assert('not implemeneted');
    return null;
    // let first = null;
    // let firstTime = Infinity;
    // this.trackItemHosts_.forEach(trackItemHost => {
    //   if (trackItemHost.trackItem.startTime < firstTime) {
    //     first = trackItemHost;
    //     firstTime = trackItemHost.trackItem.startTime;
    //   }
    // })
    // return first;
  }

  getLastFocusedTrackItemHost(): TrackItemHost {
    console.assert('not implemeneted');
    return null;
    // let last = null;
    // let lastTime = -Infinity;
    // this.trackItemHosts_.forEach(trackItemHost => {
    //   if (trackItemHost.trackItem.startTime > lastTime) {
    //     last = trackItemHost;
    //     lastTime = trackItemHost.trackItem.startTime;
    //   }
    // })
    // return last;
  }

  private calculateTrackItemBoundary(trackItemHost: TrackItemHost) {
    return;
    // const tiemPair = this.trackItemHosts.get(trackItemHost);
    // let sIt = this.startTimeSet.upper_bound(trackItemHost.startTime);
    // if (sIt.equals(this.startTimeSet.end())) trackItemHost.endBoundaryTime = Infinity;
    // else trackItemHost.endBoundaryTime = sIt.value.first;
    // let eIt = this.endTimeSet.lower_bound(trackItemHost.startTime);
    // if (eIt.equals(this.endTimeSet.end()))
    //   if (this.endTimeSet.size() == 0) trackItemHost.startBoundaryTime = -Infinity;
    //   else trackItemHost.startBoundaryTime = this.endTimeSet.rbegin().value.first;
    // else if (eIt.value.first == trackItemHost.startTime) trackItemHost.startBoundaryTime = eIt.value.first;
    // else if (eIt.equals(this.endTimeSet.begin())) trackItemHost.startBoundaryTime = -Infinity;
    // else trackItemHost.startBoundaryTime = eIt.prev().value.first;
  }

}