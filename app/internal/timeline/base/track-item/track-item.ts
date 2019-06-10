import { Cloneable } from "base/olive/cloneable";
import { Event } from "base/common/event";
import { ConstTrackItemTime } from "internal/timeline/base/track-item/track-item-time";

export interface ITrackItem extends Cloneable {

  readonly onTimeChanged: Event<void>;

  readonly type: string;
  readonly time: ConstTrackItemTime;

  /*@observable*/ readonly duration: number;

  getTimeoffset(time: number): number;
  isInTime(time: number): boolean;

  serialize(): object;

}