import { Postable, postable } from 'worker-postable';

import TrackItem, { TrackItemBase } from './track-item'

import { TreeMap, Pair, IComparable } from 'tstl';
import { Iterator, MapIterator } from 'tstl/base';
import { EventEmitter2 } from 'eventemitter2';
import { TimePair, TimePairBase } from './time-pair';
import { observable } from 'mobx';

let _nextTrackID = 0;

export enum TrackEvent {
  TRACK_ITEM_ADDED = 'TRACK_ITEM_ADDED',
  TRACK_ITEM_REMOVED = 'TRACK_ITEM_REMOVED',
  TRACK_ITEM_TIME_CHANGED = 'TRACK_ITEM_CHANGED'
}

export interface TrackBase {

  trackItems: Set<TrackItemBase>;

}

@Postable
export default class Track implements TrackBase {

  readonly id: number;
  @observable name: string;

  @postable trackItems: Set<TrackItem>;
  trackItemTreeMap: TreeMap<TimePair, TrackItem>;

  private ee: EventEmitter2;

  constructor() {
    this.name = 'unnamed track';
    // Initialize objects
    this.trackItems = new Set<TrackItem>();
    this.trackItemTreeMap = new TreeMap<TimePair, TrackItem>();

    this.ee = new EventEmitter2();

    this.id = _nextTrackID++;
  }

  addTrackItem(trackItem: TrackItem): void {
    this._clearTime(trackItem.time.start, trackItem.time.end);
    this._addTrackItem(trackItem);
  }

  removeTrackItem(trackItem: TrackItem) {
    this._removeTrackItem(trackItem);
  }

  getTrackItemAt(time: number): TrackItem {
    let q = new TimePair(time, time);
    let it = this.trackItemTreeMap.lower_bound(q);
    let test = null;
    if (it.equals(this.trackItemTreeMap.end())) {
      if (this.trackItemTreeMap.size() == 0) return null;
      test = this.trackItemTreeMap.rbegin().value;
    }
    else test = it.value;
    if (test.first.start <= time && time < test.first.end) return test.second;
    return null;
  }

  getTrackItemBefore(trackItem: TrackItem) {
    console.assert(this.trackItems.has(trackItem));
    let it = this.trackItemTreeMap.find(trackItem.time);
    if (it.equals(this.trackItemTreeMap.begin())) return null;
    return it.prev().value.second;
  }

  getTrackItemAfter(trackItem: TrackItem) {
    console.assert(this.trackItems.has(trackItem));
    let it = this.trackItemTreeMap.find(trackItem.time).next();
    if (it.equals(this.trackItemTreeMap.end())) return null;
    return it.value.second;
  }

  setTrackItemTime(trackItem: TrackItem, startTime: number, endTime: number, baseTime: number): void {
    this._setTrackItemTime(trackItem, new TimePair(startTime, endTime), baseTime);
  }

  clearTime(startTime: number, endTime: number) {
    this._clearTime(startTime, endTime);
  }

  private _addTrackItem(trackItem: TrackItem) {
    this.trackItems.add(trackItem);
    this.trackItemTreeMap.insert(new Pair(trackItem.time, trackItem));
    this.ee.emit(TrackEvent.TRACK_ITEM_ADDED, trackItem);
  }

  private _removeTrackItem(trackItem: TrackItem) {
    console.assert(this.trackItems.has(trackItem));
    this.trackItems.delete(trackItem);
    console.assert(this.trackItemTreeMap.count(trackItem.time));
    this.trackItemTreeMap.erase(trackItem.time);
    this.ee.emit(TrackEvent.TRACK_ITEM_REMOVED, trackItem);
  }

  private _setTrackItemTime(trackItem: TrackItem, timePair: TimePair, baseTime: number): void {
    // assert check
    console.assert(this.trackItemTreeMap.count(trackItem.time));
    console.assert(this.trackItems.has(trackItem));
    console.assert(!this.trackItemTreeMap.has(timePair));
    let lastTimePair = trackItem.time;

    this.trackItemTreeMap.erase(trackItem.time);
    this._clearTime(timePair.start, timePair.end);

    trackItem.__setTime(timePair, baseTime);
    this.trackItemTreeMap.insert(new Pair(timePair, trackItem));
    
    this.ee.emit(TrackEvent.TRACK_ITEM_TIME_CHANGED, trackItem, lastTimePair, timePair);
  }

  private _clearTime(startTime: number, endTime: number) {
    let additions: TrackItem[] = [];
    let removals = [];
    let it = this.accessAfter(startTime);
    while (!it.equals(this.trackItemTreeMap.end())) {
      let timePair = it.value.first;
      let current = it.value.second;
      if (timePair.start >= endTime || timePair.end < startTime) break;
      if (startTime <= timePair.start) {
        if (timePair.end <= endTime) {
          // Completely inside of clear box
          removals.push(current);
        }
        else {
          this._setTrackItemTime(current, new TimePair(endTime, timePair.end), current.baseTime + (endTime - current.time.start));
        }
      }
      else {
        if (endTime <= timePair.end) {
          // Complete inside of current box
          const currentLeft = current.clone();
          const currentRight = current.clone();
          currentLeft.__setTime(new TimePair(current.time.start, startTime), current.baseTime);
          currentRight.__setTime(new TimePair(endTime, current.time.end), current.baseTime + (endTime - current.time.start));
          additions.push(currentLeft);
          additions.push(currentRight);
          removals.push(current);
        }
        else {
          this._setTrackItemTime(current, new TimePair(timePair.start, startTime), current.baseTime);
        }
      }
      it = it.next();
    }
    removals.forEach(removal => {
      this._removeTrackItem(removal);
    })
    additions.forEach(addition => {
      this._addTrackItem(addition);
    })
  }

  private accessAfter(query: number): MapIterator<TimePair, TrackItem, true, TreeMap<TimePair, TrackItem>> {
    if (this.trackItemTreeMap.size() == 0) return this.trackItemTreeMap.end();
    let q = new TimePair(query, query);
    let it = this.trackItemTreeMap.lower_bound(q);
    if (it.equals(this.trackItemTreeMap.begin())) return it;
    let prev = it.prev();
    let timePair = prev.value.first;
    if (timePair.start <= query && query < timePair.end) return prev;
    return it;
  }


  // Event Emitter
  addEventListener(type: (TrackEvent.TRACK_ITEM_ADDED | TrackEvent.TRACK_ITEM_REMOVED),
      callback: (trackItem: TrackItem) => void): void;
  addEventListener(type: TrackEvent.TRACK_ITEM_TIME_CHANGED,
      callback: (trackItem: TrackItem, oldTimePair: TimePair, newTimePair: TimePair) => void): void;
  addEventListener(type: TrackEvent, callback: (...args: any) => void) {
    this.ee.addListener(type, callback);
  }

  removeEventListener(type: (TrackEvent.TRACK_ITEM_ADDED | TrackEvent.TRACK_ITEM_REMOVED),
      callback: (trackItem: TrackItem) => void): void;
  removeEventListener(type: TrackEvent.TRACK_ITEM_TIME_CHANGED,
      callback: (trackItem: TrackItem, oldTimePair: TimePair, newTimePair: TimePair) => void): void;
  removeEventListener(type: TrackEvent, callback: (...args: any) => void) {
    this.ee.removeListener(type, callback);
  }

}