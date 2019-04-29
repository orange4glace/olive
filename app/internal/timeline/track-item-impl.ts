import { Postable, postable } from 'worker-postable';
import { TrackItemTime } from 'internal/timeline/track-item-time';
import { TrackItem } from 'internal/timeline/track-item';
import { TrackItemType } from 'internal/timeline/track-item-type';
import { computed } from 'mobx';
import { clone } from 'base/common/cloneable';

let __next_id = 0;

@Postable
export default class TrackItemImpl implements TrackItem {

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

  __setTime(time: TrackItemTime) {
    this.time = clone(time);
  }

  clone(obj: TrackItemImpl): Object {
    obj.id = __next_id++;
    obj.type = this.type;
    obj.time = clone(this.time);
    return obj;
  }

}