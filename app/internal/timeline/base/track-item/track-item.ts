import { Cloneable } from "base/olive/cloneable";
import { Event } from "base/common/event";
import { ConstTrackItemTime } from "internal/timeline/base/track-item/track-item-time";
import { ReadonlyTimebase } from "internal/timeline/base/timebase";

export interface TrackItemDidChangeTimeEvent {
  old: ConstTrackItemTime;
}

export interface ITrackItem extends Cloneable {

  readonly onTimeChanged: Event<void>;
  readonly onDidChangeTime: Event<TrackItemDidChangeTimeEvent>;

  readonly type: string;
  readonly timebase: ReadonlyTimebase;
  readonly time: ConstTrackItemTime;

  /*@observable*/ readonly duration: number;

  setTime(startTime: number, endTime: number, baseTime: number): void;

  getTimeoffset(time: number): number;
  isInTime(time: number): boolean;

  serialize(): object;

}