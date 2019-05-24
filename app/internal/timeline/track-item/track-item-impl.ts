import { Postable, postable } from 'worker-postable';
import { TrackItemTime } from 'internal/timeline/track-item/track-item-time';
import { TrackItem } from 'internal/timeline/track-item/track-item';
import { TrackItemType } from 'internal/timeline/track-item/track-item-type';
import { computed } from 'mobx';
import { clone } from 'base/common/cloneable';
import { Emitter, Event } from 'base/common/event';

let __next_id = 0;

@Postable
export abstract class TrackItemImpl implements TrackItem {

  readonly onTimeChanged_: Emitter<void> = new Emitter();
  readonly onTimeChanged: Event<void> = this.onTimeChanged_.event;

  id: number;
  @postable type: TrackItemType;
  @postable time: TrackItemTime;

  @computed get duration(): number {
    if (!this.time) return 0;
    return this.time.end - this.time.start;
  }

  constructor(type: TrackItemType) {
    this.id = __next_id++;
    this.type = type;
  }

  getTimeoffset(time: number) {
    return time - this.time.start + this.time.base;
  }
  
  isInTime(time: number): boolean {
    return this.time.start <= time && time < this.time.end;
  }

  abstract __setTime(time: TrackItemTime): void;

  clone(obj: TrackItemImpl): Object {
    obj.id = __next_id++;
    obj.type = this.type;
    obj.time = clone(this.time);
    return obj;
  }

}