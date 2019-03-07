import ITrackItem from 'standard/track-item'
import { Postable, postable } from 'worker-postable';

import TrackItemType from './track-item-type'

import { observable, action } from 'mobx'

let _nextTrackItemID = 0;

@Postable
export default class TrackItem implements ITrackItem {

  id: number;
  @postable type: TrackItemType;

  @postable startTime: number;
  @postable endTime: number;

  @postable next: TrackItem;
  @postable prev: TrackItem;

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