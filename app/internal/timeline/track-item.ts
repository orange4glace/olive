import { TrackItemType } from "internal/timeline/track-item-type";
import { ConstTrackItemTime } from "internal/timeline/track-item-time";

export interface TrackItemBase {
  type: TrackItemType;
  time: ConstTrackItemTime;
}

export interface TrackItem extends TrackItemBase {

  /*@postable*/ readonly type: TrackItemType;
  /*@postable*/ readonly time: ConstTrackItemTime;

  /*@observable*/ readonly duration: number;

  getTimeoffset(time: number): number;

  clone(): TrackItem;

}