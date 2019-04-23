import { Postable, postable } from 'worker-postable';
import { TrackItemTime } from 'internal/timeline/track-item-time';
import { TrackItem } from 'internal/timeline/track-item';
import { TrackItemType } from 'internal/timeline/track-item-type';
import { computed } from 'mobx';

let _nextTrackItemID = 0;

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
    this.id = _nextTrackItemID++;
    this.type = type;
  }

  getTimeoffset(time: number) {
    return time - this.time.start + this.time.base;
  }

  __setTime(time: TrackItemTime) {
    this.time = time.clone();
  }

  clone(): TrackItemImpl {
    let trackItem = new TrackItemImpl(this.type);
    trackItem.__setTime(this.time);
    return trackItem;
  }

}