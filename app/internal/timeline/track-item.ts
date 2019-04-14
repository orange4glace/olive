import { Postable, postable } from 'worker-postable';

import TrackItemType from './track-item-type'
import { DrawingBase } from 'internal/drawing';
import { Drawing } from 'internal/drawing/drawing';
import { TimePair, TimePairBase } from './time-pair';

let _nextTrackItemID = 0;

export interface TrackItemBase {
  type: TrackItemType;

  time: TimePairBase;
  baseTime: number;

  videoDrawing: DrawingBase;
  audioDrawing: DrawingBase;
}

@Postable
export default class TrackItem implements TrackItemBase {

  id: number;
  @postable type: TrackItemType;

  @postable time: TimePair;
  @postable baseTime: number;

  @postable videoDrawing: Drawing;
  @postable audioDrawing: Drawing;

  constructor(type: TrackItemType = TrackItemType.NORMAL) {
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