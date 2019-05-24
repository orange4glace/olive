import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { ConstTrackItemTime } from "internal/timeline/track-item/track-item-time";
import { Cloneable } from "base/common/cloneable";
import { Event } from "base/common/event";

export interface TrackItemBase {
  type: TrackItemType;
  time: ConstTrackItemTime;
}

export interface TrackItem extends TrackItemBase, Cloneable {

  readonly onTimeChanged: Event<void>;

  /*@observable*/ readonly duration: number;

  getTimeoffset(time: number): number;
  isInTime(time: number): boolean;

}

export interface ITrackItem extends TrackItem {}