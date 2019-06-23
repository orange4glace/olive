import { Postable, postable, PostableEvent, getPostableID } from 'worker-postable';

import { TreeMap, TreeMultiMap, Pair } from 'tstl';
import { MapIterator } from 'tstl/base';
import { EventEmitter2 } from 'eventemitter2';
import { observable } from 'mobx';
import { Emitter, Event } from 'base/common/event';
import { SerializedTrackItem, TrackItem } from 'internal/timeline/base/track-item/track-item-impl';
import { ITrack, TrackTrackItemEvent, TrackItemTimeChangedEvent } from 'internal/timeline/base/track/track';
import { WithTrackBase } from 'internal/timeline/common/track/track';
import { MixinBase } from 'base/olive/mixin';
import { TrackItemTime, ConstTrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
import { clone } from 'base/olive/cloneable';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { WithDisposable, DisposableMap, newDisposableMap } from 'base/olive/lifecycle';
import { Timebase, SerializedTimebase, ReadonlyTimebase } from 'internal/timeline/base/timebase';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { IDisposable, dispose } from 'base/common/lifecycle';

let _nextTrackID = 0;

export interface SerializedTrack {
  name: string;
  timebase: SerializedTimebase;
  trackItems_: SerializedTrackItem[];
}

@Postable
export class Track extends WithDisposable(WithTrackBase(MixinBase)) implements ITrack {

  /*#region TrackBase*/
  protected trackItemStartTimeMap_: TreeMultiMap<number, TrackItem>;
  protected trackItemEndTimeMap_: TreeMultiMap<number, TrackItem>;
  protected trackItemTimeMap_: Map<TrackItem, Pair<number, number>>;

  @postable protected POSTABLE_onDidUpsertTrackItemTime: PostableEvent<number>;
  @postable protected POSTABLE_onDidRemoveTrackItemTime: PostableEvent<number>;

  protected doUpsertTrackItemTime(trackItem: TrackItem) {
    super.doUpsertTrackItemTime(trackItem);
    this.POSTABLE_onDidUpsertTrackItemTime.emit(getPostableID(trackItem));
  }

  protected doRemoveTrackItemTime(trackItem: TrackItem) {
    super.doRemoveTrackItemTime(trackItem);
    this.POSTABLE_onDidRemoveTrackItemTime.emit(getPostableID(trackItem));
  }
  /*#endregion*/

  private readonly onTrackItemAdded_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
  readonly onTrackItemAdded: Event<TrackTrackItemEvent> = this.onTrackItemAdded_.event;
  protected readonly POSTABLE_onDidAddTrackItem: PostableEvent<TrackItem>;

  private readonly onTrackItemWillRemove_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
  readonly onTrackItemWillRemove: Event<TrackTrackItemEvent> = this.onTrackItemWillRemove_.event;
  protected readonly POSTABLE_onWillRemoveTrackItem: PostableEvent<TrackItem>;

  private readonly onTrackItemRemoved_: Emitter<TrackTrackItemEvent> = this._register(new Emitter<TrackTrackItemEvent>());
  readonly onTrackItemRemoved: Event<TrackTrackItemEvent> = this.onTrackItemRemoved_.event;

  private readonly onTrackItemTimeChanged_: Emitter<TrackItemTimeChangedEvent> = this._register(new Emitter<TrackItemTimeChangedEvent>());
  readonly onTrackItemTimeChanged: Event<TrackItemTimeChangedEvent> = this.onTrackItemTimeChanged_.event;

  readonly id: number;
  @observable name: string;

  protected timebase_: Timebase;
  public get timebase(): ReadonlyTimebase { return this.timebase_; }

  protected trackItems_: Set<TrackItem>;
  public get trackItems() { return this.trackItems_; }

  private trackItemDisposables_: DisposableMap<ITrackItem, IDisposable[]>;

  private ee: EventEmitter2;

  constructor(timebase: Timebase) {
    super();
    this.name = 'unnamed track';
    this.POSTABLE_onDidAddTrackItem = new PostableEvent();
    this.POSTABLE_onWillRemoveTrackItem = new PostableEvent();
    this.POSTABLE_onDidUpsertTrackItemTime = new PostableEvent();
    this.POSTABLE_onDidRemoveTrackItemTime = new PostableEvent();
    // Initialize objects
    this.timebase_ = clone(timebase);
    this.trackItems_ = new Set();

    this.trackItemDisposables_ = this._register(newDisposableMap<ITrackItem, any>());

    this.ee = new EventEmitter2();

    this.id = _nextTrackID++;
  }

  addTrackItem(trackItem: TrackItem): void;
  addTrackItem(trackItem: TrackItem, startTime: number, endTime: number, baseTime: number): void;
  addTrackItem(trackItem: TrackItem, startTime?: number, endTime?: number, baseTime?: number): void {
    if (typeof startTime === 'number') trackItem.setTime(startTime, endTime, baseTime);
    this.doClearTime(trackItem.time.start, trackItem.time.end);
    this.doAddTrackItem(trackItem);
  }

  removeTrackItem(trackItem: TrackItem) {
    this.doRemoveTrackItem(trackItem);
  }

  setTrackItemTime(trackItem: TrackItem, startTime: number, endTime: number, baseTime: number): void {
    this.doSetTrackItemTime(trackItem, new TrackItemTime(startTime, endTime, baseTime));
  }

  clearTime(startTime: number, endTime: number) {
    this.doClearTime(startTime, endTime);
  }

  hasTrackItem(trackItem: TrackItem): boolean {
    return this.trackItems_.has(trackItem);
  }

  getTrackItemAt(time: number): TrackItem | null {
    return super.getTrackItemAt(time) as TrackItem;
  }

  getTrackItemBefore(time: number): TrackItem | null {
    return super.getTrackItemBefore(time) as TrackItem;
  }

  getTrackItemAfter(time: number): TrackItem | null {
    return super.getTrackItemAfter(time) as TrackItem;
  }

  getTrackItemsBetween(startTime: number, endTime: number): TrackItem[] {
    return super.getTrackItemsBetween(startTime, endTime) as TrackItem[];
  }

  private doAddTrackItem(trackItem: TrackItem) {
    if (this.hasTrackItem(trackItem)) return;
    const disposables: IDisposable[] = [];
    this.trackItems_.add(trackItem);

    this.doUpsertTrackItemTime(trackItem);

    disposables.push(trackItem.onDidChangeTime(e => { this.trackItemDidChangeTimeHandler(trackItem, e.old);}));
    this.trackItemDisposables_.set(trackItem, disposables);
    this.onTrackItemAdded_.fire({
      trackItem: trackItem
    })
    this.POSTABLE_onDidAddTrackItem.emit(getPostableID(trackItem));
  }

  private doRemoveTrackItem(trackItem: TrackItem) {
    if (!this.hasTrackItem(trackItem)) return;
    this.onTrackItemWillRemove_.fire({trackItem: trackItem})
    this.POSTABLE_onWillRemoveTrackItem.emit(getPostableID(trackItem));
    const disposables = this.trackItemDisposables_.get(trackItem);
    this.trackItemDisposables_.delete(trackItem);
    dispose(disposables);
    this.doRemoveTrackItemTime(trackItem);
    this.trackItems_.delete(trackItem);
  }

  private trackItemDidChangeTimeHandler(trackItem: TrackItem, oldTime: ConstTrackItemTime) {
    this.onTrackItemTimeChanged_.fire({
      trackItem: trackItem,
      old: oldTime,
      new: trackItem.time
    })
    this.doUpsertTrackItemTime(trackItem)
  }

  private doSetTrackItemTime(trackItem: TrackItem, time: TrackItemTime): void {
    if (!this.hasTrackItem(trackItem)) return;
    if (time.start >= time.end) {
      this.doRemoveTrackItem(trackItem);
      return;
    }
    const scaledTime = time.rescale(this.timebase, trackItem.timebase);
    trackItem.setTime(scaledTime.start, scaledTime.end, scaledTime.base);
  }

  private doClearTime(startTime: number, endTime: number) {
    let additions: TrackItem[] = [];
    let removals: TrackItem[] = [];
    let it = this.trackItemEndTimeMap_.lower_bound(startTime);
    while (!it.equals(this.trackItemEndTimeMap_.end())) {
      let current = it.value.second;
      if (current.time.start >= endTime || current.time.end < startTime) break;
      if (startTime <= current.time.start) {
        if (current.time.end <= endTime) {
          // Completely inside of clear box
          removals.push(current);
        }
        else {
          this.doSetTrackItemTime(current, new TrackItemTime(endTime, current.time.end, current.time.base + (endTime - current.time.start)));
        }
      }
      else {
        if (endTime <= current.time.end) {
          // Complete inside of current box
          const currentLeft = clone(current);
          const currentRight = clone(current);
          currentLeft.setTime(current.time.start, startTime, current.time.base);
          currentRight.setTime(endTime, current.time.end, current.time.base + (endTime - current.time.start));
          additions.push(currentLeft);
          additions.push(currentRight);
          removals.push(current);
        }
        else {
          this.doSetTrackItemTime(current, new TrackItemTime(current.time.start, startTime, current.time.base));
        }
      }
      it = it.next();
    }
    removals.forEach(removal => {
      this.doRemoveTrackItem(removal);
    })
    additions.forEach(addition => {
      this.doRemoveTrackItem(addition);
    })
  }

  clone(obj: Track): Object {
    throw "Not implemented";
  }

  serialize(): SerializedTrack {
    const trackItems_: SerializedTrackItem[] = [];
    this.trackItems_.forEach((time, ti) => {
      trackItems_.push(ti.serialize());
    })
    return {
      name: this.name,
      timebase: this.timebase.serialize(),
      trackItems_: trackItems_
    }
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedTrack): Track {
    const track = new Track(Timebase.deserialize(serial.timebase));
    serial.trackItems_.forEach(ti => {
      const trackItem = TrackItem.deserialize(instantiationService, ti);
      if (!trackItem) {
        console.warn('Failed to deserialize TrackItem. ' + ti);
        return;
      }
      track.doAddTrackItem(trackItem);
    })
    return track;
  }
}