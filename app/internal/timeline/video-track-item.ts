import { Postable, postable } from 'worker-postable'

import { ResourceBase, VideoResource } from 'internal/resource';
import TrackItemImpl from 'internal/timeline/track-item-impl';
import { TrackItemBase, TrackItem } from 'internal/timeline/track-item';
import { TrackItemTime } from 'internal/timeline/track-item-time';
import { TrackItemType } from 'internal/timeline/track-item-type';
import { VideoDrawingBase, VideoDrawing } from 'internal/rendering/drawing/video-drawing';
import { RectangleDrawing } from 'internal/rendering/drawing/rectangle-drawing';

export interface VideoTrackItemBase extends TrackItemBase {
  drawing: VideoDrawingBase;
  resource: ResourceBase;
}

export interface VideoTrackItem extends TrackItem {
  readonly drawing: VideoDrawing;
  readonly resource: VideoResource;
}

@Postable
export default class VideoTrackItemImpl extends TrackItemImpl implements VideoTrackItemBase {

  @postable drawing: VideoDrawing;
  @postable resource: VideoResource;

  constructor(resource: VideoResource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;
    this.drawing = new RectangleDrawing();

  }

  clone(): VideoTrackItemImpl {
    let trackItem = new VideoTrackItemImpl(this.resource);
    this.__setTime(this.time);
    return trackItem;
  }

  __setTime(time: TrackItemTime) {
    time = time.clone();
    if (time.base < 0) {
      time.start -= time.base;
      time.base = 0;
    }
    let dur = time.end - time.start;
    if (dur > this.resource.duration)
      time.end -= dur - this.resource.duration;
    this.time = time;
  }

}