import { Postable, postable } from 'worker-postable'

import TrackItem, { TrackItemBase } from './track-item'
import TrackItemType from './track-item-type';
import { IResource } from 'standard';
import VideoDrawing from 'internal/drawing/video-drawing';
import { Rectangle } from 'internal/drawing';
import { Resource, ResourceBase } from 'internal/resource';

export interface VideoTrackItemBase extends TrackItemBase {
  resource: ResourceBase;
}

@Postable
export default class VideoTrackItem extends TrackItem implements VideoTrackItemBase {

  @postable resource: Resource;

  constructor(resource: Resource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;
    console.log('RESOURCE',resource)

    this.startTime = 0;
    this.endTime = 3000;

    this.drawing = new Rectangle();
  }

  clone(): VideoTrackItem {
    let trackItem = new VideoTrackItem(this.resource);
    super.clone();
    return trackItem;
  }

}