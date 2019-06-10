import { Event } from "base/common/event";
import { Cloneable } from "base/olive/cloneable";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { ConstTrackItemTime, TrackItemTime } from "internal/timeline/base/track-item/track-item-time";

export interface TrackTrackItemEvent {
  readonly trackItem: ITrackItem;
}

export interface TrackItemTimeChangedEvent {
  readonly trackItem: ITrackItem;
  readonly old: ConstTrackItemTime;
  readonly new: ConstTrackItemTime;
}

export interface ITrack extends Cloneable {
  
  readonly onTrackItemAdded: Event<TrackTrackItemEvent>;
  readonly onTrackItemWillRemove: Event<TrackTrackItemEvent>;
  readonly onTrackItemRemoved: Event<TrackTrackItemEvent>;
  readonly onTrackItemTimeChanged: Event<TrackItemTimeChangedEvent>;

  readonly id: number;
  /*@observable*/ readonly name: string;

  /*@postable*/ readonly trackItems: Map<ITrackItem, TrackItemTime>;

  addTrackItem(trackItem: ITrackItem, start: number, end: number, base: number): void;
  removeTrackItem(trackItem: ITrackItem): void;
  setTrackItemTime(trackIte: ITrackItem, startTime: number, endTime: number, baseTime: number): void;
  clearTime(startTime: number, endTime: number): void;

  getTrackItemAt(time: number): ITrackItem;
  getTrackItemBefore(trackItem: ITrackItem): ITrackItem;
  getTrackItemAfter(trackItem: ITrackItem): ITrackItem;
  getTrackItemsBetween(startTime: number, endTime: number): ITrackItem[];

  serialize(): object;

}