import { Postable, postable } from 'worker-postable'

import TrackItem, { TrackItemBase } from './track-item'
import TrackItemType from './track-item-type';
import { IResource } from 'standard';
import VideoDrawing from 'internal/drawing/video-drawing';
import { Rectangle } from 'internal/drawing';

export interface VideoTrackItemBase extends TrackItemBase {

}

@Postable
export default class VideoTrackItem extends TrackItem implements TrackItemBase {

  resource: IResource;

  constructor(resource: IResource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;

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