import ITrack from 'standard/track'
import { Postable, postable } from 'worker-postable';

import TrackItem, { TrackItemBase } from './track-item'

import { EventEmitter2 } from 'eventemitter2';

let _nextTrackID = 0;

export interface TrackBase {

  trackItems: Set<TrackItemBase>;

}

@Postable
export default class Track implements TrackBase, ITrack {

  readonly id: number;

  @postable trackItems: Set<TrackItem>;
  
  private lastAccessedTrackItem: TrackItem = null;
  private tailTrackItem: TrackItem = null;

  ee: EventEmitter2;

  constructor() {
    // Initialize objects
    this.ee = new EventEmitter2();
    this.trackItems = new Set<TrackItem>();

    this.id = _nextTrackID++;
  }

  addTrackItem(trackItem: TrackItem) {
    this.trackItems.add(trackItem);
    this.link(trackItem);
    this.ee.emit('addTrackItem', trackItem);
  }

  removeTrackItem(trackItem: TrackItem) {
    this.ee.emit('willRemoveTrackItem', trackItem);
    this.unlink(trackItem);
    this.trackItems.delete(trackItem);
  }

  getTrackItemAt(time: number) {
    const item = this.accessAfter(time);
    if (item == null) return null;
    if (item.startTime <= time && time < item.endTime) return item;
    return null;
  }

  setTrackItemTime(trackItem: TrackItem, startTime: number, endTime: number) {
    const lastStartTime = trackItem.startTime;
    const lastEndTime = trackItem.endTime;
    console.log('set Time', trackItem, startTime, endTime);
    trackItem.setTime(startTime, endTime);
    this.ee.emit('trackItemTimeChange', trackItem, lastStartTime, lastEndTime);
  }

  clearTime(startTime: number, endTime: number) {
    let additions = [];
    let removals = [];
    let current = this.accessAfter(startTime);
    while (current != null) {
      console.log('traverse', current);
      if (current.startTime >= endTime || current.endTime < startTime) break;
      if (startTime <= current.startTime) {
        if (current.endTime <= endTime) {
          // Completely inside of clear box
          removals.push(current);
        }
        else {
          this.setTrackItemTime(current, endTime, current.endTime);
        }
      }
      else {
        if (endTime <= current.endTime) {
          // Complete inside of current box
          const currentLeft = current.clone();
          const currentRight = current.clone();
          currentLeft.endTime = startTime;
          currentRight.startTime = endTime;
          additions.push(currentLeft);
          additions.push(currentRight);
          removals.push(current);
        }
        else {
          console.log('clear time', current);
          this.setTrackItemTime(current, current.startTime, startTime);
        }
      }
      current = this.accessNext(current);
    }
    removals.forEach(removal => {
      this.removeTrackItem(removal);
    })
    additions.forEach(addition => {
      this.addTrackItem(addition);
    })
  }

  link(trackItem: TrackItem) {
    if (this.tailTrackItem == null) {
      this.tailTrackItem = trackItem;
      return;
    }
    const next = this.accessAfter(trackItem.startTime);
    if (next == null) {
      this.tailTrackItem.next = trackItem;
      trackItem.prev = this.tailTrackItem;
      trackItem.next = null;
      this.tailTrackItem = trackItem;
      return;
    }
    const prev = next.prev;
    trackItem.prev = prev;
    trackItem.next = next;
    if (prev != null)
      prev.next = trackItem;
    next.prev = trackItem;

  }

  unlink(trackItem: TrackItem) {
    const prev = trackItem.prev;
    const next = trackItem.next;
    if (this.tailTrackItem == trackItem)
      this.tailTrackItem = prev;
    if (this.lastAccessedTrackItem == trackItem)
      this.lastAccessedTrackItem = trackItem.next;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
    trackItem.prev = null;
    trackItem.next = null;
  }

  private access(trackItem: TrackItem) {
    this.lastAccessedTrackItem = trackItem;
  }

  private accessNext(trackItem: TrackItem) {
    this.lastAccessedTrackItem = trackItem.next;
    return this.lastAccessedTrackItem;
  }

  private accessAfter(query: number): TrackItem {
    if (this.lastAccessedTrackItem == null) {
      if (this.tailTrackItem == null) return null;
      this.lastAccessedTrackItem = this.tailTrackItem;
    }
    var lastAccessed = this.lastAccessedTrackItem;
    var ne = lastAccessed.next;
    if (lastAccessed.startTime <= query && query < lastAccessed.endTime) return lastAccessed;

    if (lastAccessed.startTime > query) {
      var candidate = lastAccessed;
      while (true) {
        candidate = lastAccessed;
        lastAccessed = lastAccessed.prev;
        if (lastAccessed == null) break;
        this.lastAccessedTrackItem = lastAccessed;
        if (lastAccessed.endTime <= query) break;
      }
      return candidate;
    }

    else {
      while (lastAccessed != null) {
        this.lastAccessedTrackItem = lastAccessed;
        if (lastAccessed.endTime > query) break;
        lastAccessed = lastAccessed.next;
      }
      return lastAccessed;
    }
  }

}