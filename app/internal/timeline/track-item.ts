import { TrackItemType } from "internal/timeline/track-item-type";
import { ConstTrackItemTime } from "internal/timeline/track-item-time";
import { Cloneable } from "base/common/cloneable";

export interface TrackItemBase {
  type: TrackItemType;
  time: ConstTrackItemTime;
}

export interface TrackItem extends TrackItemBase, Cloneable {

  /*@postable*/ readonly type: TrackItemType;
  /*@postable*/ readonly time: ConstTrackItemTime;

  /*@observable*/ readonly duration: number;

  getTimeoffset(time: number): number;

}