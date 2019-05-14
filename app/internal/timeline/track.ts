import { TrackItem, TrackItemBase } from "internal/timeline/track-item";
import { Event } from "base/common/event";
import { TrackItemTime, TrackItemTimeBase, ConstTrackItemTime } from "internal/timeline/track-item-time";
import { Cloneable } from "base/common/cloneable";

export interface TrackTrackItemEvent {
  readonly trackItem: TrackItem;
}

export interface TrackItemTimeChangedEvent {
  readonly trackItem: TrackItem;
  readonly old: ConstTrackItemTime;
  readonly new: ConstTrackItemTime;
}

export interface TrackBase {

  trackItems: Map<TrackItemBase, TrackItemTimeBase>;

}

export interface Track extends TrackBase, Cloneable {

  readonly id: number;
  /*@observable*/ readonly name: string;

  /*@postable*/ readonly trackItems: Map<TrackItem, TrackItemTime>;

  addTrackItem(trackItem: TrackItem, start: number, end: number, base: number): void;
  removeTrackItem(trackItem: TrackItem): void;
  setTrackItemTime(trackIte: TrackItem, startTime: number, endTime: number, baseTime: number): void;
  clearTime(startTime: number, endTime: number): void;

  getTrackItemAt(time: number): TrackItem;
  getTrackItemBefore(trackItem: TrackItem): TrackItem;
  getTrackItemAfter(trackItem: TrackItem): TrackItem;
  
  readonly onTrackItemAdded: Event<TrackTrackItemEvent>;
  readonly onTrackItemWillRemove: Event<TrackTrackItemEvent>;
  readonly onTrackItemRemoved: Event<TrackTrackItemEvent>;
  readonly onTrackItemTimeChanged: Event<TrackItemTimeChangedEvent>;

}