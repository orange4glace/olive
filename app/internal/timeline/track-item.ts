import { Postable, postable } from 'worker-postable';

import TrackItemType from './track-item-type'
import { TimePair, TimePairBase } from './time-pair';

let _nextTrackItemID = 0;

export interface TrackItemBase {
  type: TrackItemType;

  time: TimePairBase;
  baseTime: number;
}

@Postable
export default class TrackItem implements TrackItemBase {

  id: number;
  @postable type: TrackItemType;

  @postable time: TimePair;
  @postable baseTime: number;

  constructor(type: TrackItemType) {
    this.id = _nextTrackItemID++;
    this.type = type;
  }

  clone(): TrackItem {
    let trackItem = new TrackItem(this.type);
    trackItem.__setTime(this.time, this.baseTime);
    return trackItem;
  }

  getTimeoffset(time: number) {
    return time - this.time.start + this.baseTime;
  }

  __setTime(time: TimePair, baseTime: number) {
    this.baseTime = baseTime;
    this.time = new TimePair(time.start, time.end);
  }

}