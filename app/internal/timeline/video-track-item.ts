import { Postable, postable } from 'worker-postable'

import TrackItem, { TrackItemBase } from './track-item'
import TrackItemType from './track-item-type';
import { IResource } from 'standard';
import VideoDrawing from 'internal/drawing/video-drawing';
import { Rectangle } from 'internal/drawing';
import { Resource, ResourceBase } from 'internal/resource';
import { TimePair } from './time-pair';

export interface VideoTrackItemBase extends TrackItemBase {
  resource: ResourceBase;
}

@Postable
export default class VideoTrackItem extends TrackItem implements VideoTrackItemBase {

  @postable resource: Resource;

  constructor(resource: Resource, time: TimePair, baseTime: number) {
    super(TrackItemType.VIDEO, time, baseTime);
    this.resource = resource;

    this.drawing = new Rectangle();
  }

  clone(): VideoTrackItem {
    let trackItem = new VideoTrackItem(this.resource, this.time, this.baseTime);
    return trackItem;
  }

}