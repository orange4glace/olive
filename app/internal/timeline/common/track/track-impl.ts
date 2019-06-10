// import { Postable, postable } from 'worker-postable';

// import { TreeMap, Pair, } from 'tstl';
// import { MapIterator } from 'tstl/base';
// import { EventEmitter2 } from 'eventemitter2';
// import { observable } from 'mobx';
// import { Emitter, Event } from 'base/common/event';
// import { Disposable } from 'base/common/lifecycle';
// import { clone } from 'base/olive/cloneable';
// import { SerializedTrackItem, TrackItem } from 'internal/timeline/base/track-item/track-item-impl';
// import { ITrack, TrackTrackItemEvent, TrackItemTimeChangedEvent } from 'internal/timeline/base/track/track';
// import { TrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
// import { IInstantiationService } from 'platform/instantiation/common/instantiation';

// let _nextTrackID = 0;

// export interface SerializedTrack {
//   name: string;
//   trackItems: SerializedTrackItem[];
// }

// @Postable
// export default class TrackImpl extends Disposable implements ITrack {

//   private readonly onTrackItemAdded_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
//   readonly onTrackItemAdded: Event<TrackTrackItemEvent> = this.onTrackItemAdded_.event;

//   private readonly onTrackItemWillRemove_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
//   readonly onTrackItemWillRemove: Event<TrackTrackItemEvent> = this.onTrackItemWillRemove_.event;

//   private readonly onTrackItemRemoved_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
//   readonly onTrackItemRemoved: Event<TrackTrackItemEvent> = this.onTrackItemRemoved_.event;

//   private readonly onTrackItemTimeChanged_: Emitter<TrackItemTimeChangedEvent> = this._register(new Emitter<TrackItemTimeChangedEvent>());
//   readonly onTrackItemTimeChanged: Event<TrackItemTimeChangedEvent> = this.onTrackItemTimeChanged_.event;

//   readonly id: number;
//   @observable name: string;

//   @postable trackItems: Map<TrackItem, TrackItemTime>;
//   trackItemTreeMap: TreeMap<TrackItemTime, TrackItem>;

//   private ee: EventEmitter2;

//   constructor() {
//     super();
//     this.name = 'unnamed track';
//     // Initialize objects
//     this.trackItems = new Map();
//     this.trackItemTreeMap = new TreeMap<TrackItemTime, TrackItem>();

//     this.ee = new EventEmitter2();

//     this.id = _nextTrackID++;
//   }

//   addTrackItem(trackItem: TrackItem, start: number, end: number, baseTime: number): void {
//     trackItem.__setTime(new TrackItemTime(start, end, baseTime));
//     this.doClearTime(trackItem.time.start, trackItem.time.end);
//     this.doAddTrackItem(trackItem);
//   }

//   removeTrackItem(trackItem: TrackItem) {
//     this.doRemoveTrackItem(trackItem);
//   }

//   getTrackItemAt(time: number): TrackItem {
//     let q = new TrackItemTime(time, time, 0);
//     let it = this.trackItemTreeMap.lower_bound(q);
//     if (it.equals(this.trackItemTreeMap.end()) || time < it.value.first.start)
//       if (it.equals(this.trackItemTreeMap.begin())) return null;
//       else it = it.prev();
//     if (time < it.value.first.end) return it.value.second;
//     return null;
//   }

//   getTrackItemBefore(trackItem: TrackItem) {
//     console.assert(this.trackItems.has(trackItem));
//     let it = this.trackItemTreeMap.find(trackItem.time);
//     if (it.equals(this.trackItemTreeMap.begin())) return null;
//     return it.prev().value.second;
//   }

//   getTrackItemAfter(trackItem: TrackItem) {
//     console.assert(this.trackItems.has(trackItem));
//     let it = this.trackItemTreeMap.find(trackItem.time).next();
//     if (it.equals(this.trackItemTreeMap.end())) return null;
//     return it.value.second;
//   }

//   getTrackItemsBetween(startTime: number, endTime: number): TrackItem[] {
//     const result: TrackItem[] = [];
//     const first = this.getTrackItemAt(startTime);
//     if (first) result.push(first);
//     let q = new TrackItemTime(startTime + 1, startTime + 1, 0);
//     let it = this.trackItemTreeMap.lower_bound(q);
//     while (!it.equals(this.trackItemTreeMap.end())) {
//       if (it.second.time.start <= endTime) result.push(it.second);
//       else break;
//       it = it.next();
//     }
//     return result;
//   }
//   setTrackItemTime(trackItem: TrackItem, startTime: number, endTime: number, baseTime: number): void {
//     this.doSetTrackItemTime(trackItem, new TrackItemTime(startTime, endTime, baseTime));
//   }

//   clearTime(startTime: number, endTime: number) {
//     this.doClearTime(startTime, endTime);
//   }

//   private doAddTrackItem(trackItem: TrackItem) {
//     this.trackItems.set(trackItem, trackItem.time);
//     this.trackItemTreeMap.insert(new Pair(trackItem.time, trackItem));
//     this.onTrackItemAdded_.fire({
//       trackItem: trackItem
//     })
//   }

//   private doRemoveTrackItem(trackItem: TrackItem) {
//     console.assert(this.trackItems.has(trackItem));
//     console.assert(this.trackItemTreeMap.count(trackItem.time));
//     this.onTrackItemWillRemove_.fire({
//       trackItem: trackItem
//     })
//     this.trackItems.delete(trackItem);
//     this.trackItemTreeMap.erase(trackItem.time);
//   }

//   private doSetTrackItemTime(trackItem: TrackItem, time: TrackItemTime): void {
//     // assert check
//     console.assert(this.trackItemTreeMap.count(trackItem.time));
//     console.assert(this.trackItems.has(trackItem));
//     console.assert(!this.trackItemTreeMap.has(time));
//     let lastTime = trackItem.time;

//     this.trackItemTreeMap.erase(trackItem.time);
//     trackItem.__setTime(time);
//     time = new TrackItemTime(trackItem.time.start, trackItem.time.end, trackItem.time.base);
//     this.doClearTime(time.start, time.end);

//     this.trackItems.set(trackItem, time);
//     this.trackItemTreeMap.insert(new Pair(time, trackItem));
    
//     this.onTrackItemTimeChanged_.fire({
//       trackItem: trackItem,
//       old: clone(lastTime),
//       new: clone(time)
//     })
//   }

//   private doClearTime(startTime: number, endTime: number) {
//     let additions: TrackItem[] = [];
//     let removals = [];
//     let it = this.accessAfter(startTime);
//     while (!it.equals(this.trackItemTreeMap.end())) {
//       let timePair = it.value.first;
//       let current = it.value.second;
//       if (timePair.start >= endTime || timePair.end < startTime) break;
//       if (startTime <= timePair.start) {
//         if (timePair.end <= endTime) {
//           // Completely inside of clear box
//           removals.push(current);
//         }
//         else {
//           this.doSetTrackItemTime(current, new TrackItemTime(endTime, timePair.end, current.time.base + (endTime - current.time.start)));
//         }
//       }
//       else {
//         if (endTime <= timePair.end) {
//           // Complete inside of current box
//           const currentLeft = clone(current);
//           const currentRight = clone(current);
//           currentLeft.__setTime(new TrackItemTime(current.time.start, startTime, current.time.base));
//           currentRight.__setTime(new TrackItemTime(endTime, current.time.end, current.time.base + (endTime - current.time.start)));
//           additions.push(currentLeft);
//           additions.push(currentRight);
//           removals.push(current);
//         }
//         else {
//           this.doSetTrackItemTime(current, new TrackItemTime(timePair.start, startTime, current.time.base));
//         }
//       }
//       it = it.next();
//     }
//     removals.forEach(removal => {
//       this.doRemoveTrackItem(removal);
//     })
//     additions.forEach(addition => {
//       this.doRemoveTrackItem(addition);
//     })
//   }

//   private accessAfter(query: number): MapIterator<TrackItemTime, TrackItem, true, TreeMap<TrackItemTime, TrackItem>> {
//     if (this.trackItemTreeMap.size() == 0) return this.trackItemTreeMap.end();
//     let q = new TrackItemTime(query, query, 0);
//     let it = this.trackItemTreeMap.lower_bound(q);
//     if (it.equals(this.trackItemTreeMap.begin())) return it;
//     let prev = it.prev();
//     let timePair = prev.value.first;
//     if (timePair.start <= query && query < timePair.end) return prev;
//     return it;
//   }

//   clone(obj: TrackImpl): Object {
//     throw "Not implemented";
//   }

//   serialize(): SerializedTrack {
//     const trackItems: SerializedTrackItem[] = [];
//     this.trackItems.forEach((time, ti) => {
//       trackItems.push(ti.serialize());
//     })
//     return {
//       name: this.name,
//       trackItems: trackItems
//     }
//   }

//   static deserialize(instantiationService: IInstantiationService, serial: SerializedTrack): TrackImpl {
//     const track = new TrackImpl();
//     serial.trackItems.forEach(ti => {
//       const trackItem = TrackItem.deserialize(instantiationService, ti);
//       if (!trackItem) {
//         console.warn('Failed to deserialize TrackItem. ' + ti);
//         return;
//       }
//       track.doAddTrackItem(trackItem);
//     })
//     return track;
//   }
// }