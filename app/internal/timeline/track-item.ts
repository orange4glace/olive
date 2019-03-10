import ITrackItem from 'standard/track-item'
import { Postable, postable } from 'worker-postable';

import TrackItemType from './track-item-type'
import { DrawingBase } from 'internal/drawing';
import Drawing from 'internal/drawing/drawing';

let _nextTrackItemID = 0;

export interface TrackItemBase {
  type: TrackItemType;

  startTime: number;
  endTime: number;

  next: TrackItemBase;
  prev: TrackItemBase;

  drawing: DrawingBase;
}

@Postable
export default class TrackItem implements TrackItemBase, ITrackItem {

  id: number;
  @postable type: TrackItemType;

  @postable startTime: number;
  @postable endTime: number;

  @postable next: TrackItem;
  @postable prev: TrackItem;

  @postable drawing: Drawing;

  constructor(type: TrackItemType = TrackItemType.NORMAL) {
    this.id = _nextTrackItemID++;
    this.type = type;

    this.next = null;
    this.prev = null;
  }

  clone(): TrackItem {
    let trackItem = new TrackItem();
    trackItem.startTime = this.startTime;
    trackItem.endTime = this.endTime;
    return trackItem;
  }

  setTime(startTime: number, endTime: number) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

}