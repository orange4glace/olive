import { Postable, postable } from 'worker-postable'

import { ResourceBase, VideoResource } from 'internal/resource';
import TrackItemImpl from 'internal/timeline/track-item-impl';
import { TrackItemBase } from 'internal/timeline/track-item';
import { TrackItemTime } from 'internal/timeline/track-item-time';
import { TrackItemType } from 'internal/timeline/track-item-type';

export interface VideoTrackItemBase extends TrackItemBase {
  resource: ResourceBase;

  // videoRendering: VideoRenderingBase;
}

@Postable
export default class VideoTrackItem extends TrackItemImpl implements VideoTrackItemBase {

  @postable resource: VideoResource;

  // @postable videoRendering: VideoRendering;

  constructor(resource: VideoResource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;

    // this.videoRendering = new VideoRendering();
  }

  clone(): VideoTrackItem {
    let trackItem = new VideoTrackItem(this.resource);
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