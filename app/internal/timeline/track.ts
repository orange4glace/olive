import { TrackItem, TrackItemBase } from "internal/timeline/track-item";
import { Event } from "base/common/event";
import { TrackItemTime, TrackItemTimeBase, ConstTrackItemTime } from "internal/timeline/track-item-time";

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

export interface Track extends TrackBase {

  readonly id: number;
  /*@observable*/ readonly name: string;

  /*@postable*/ readonly trackItems: Map<TrackItem, TrackItemTime>;

  addTrackItem(trackItem: TrackItem, start: number, end: number, base: number): void;
  setTrackItemTime(trackIte: TrackItem, startTime: number, endTime: number, baseTime: number): void;
  clearTime(startTime: number, endTime: number): void;

  getTrackItemAt(time: number): TrackItem;
  getTrackItemBefore(trackItem: TrackItem): TrackItem;
  getTrackItemAfter(trackItem: TrackItem): TrackItem;
  
  readonly onTrackItemAdded: Event<TrackTrackItemEvent>;
  readonly onTrackItemWillRemove: Event<TrackTrackItemEvent>;
  readonly onTrackItemTimeChanged: Event<TrackItemTimeChangedEvent>;

}