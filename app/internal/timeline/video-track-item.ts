import { Postable, postable } from 'worker-postable'

import TrackItem, { TrackItemBase } from './track-item'
import TrackItemType from './track-item-type';
import { ResourceBase, VideoResource } from 'internal/resource';
import { TimePair } from './time-pair';
import { VideoRendering, VideoRenderingBase } from 'internal/rendering/rendering/video-rendering';

export interface VideoTrackItemBase extends TrackItemBase {
  resource: ResourceBase;

  videoRendering: VideoRenderingBase;
}

@Postable
export default class VideoTrackItem extends TrackItem implements VideoTrackItemBase {

  @postable resource: VideoResource;

  @postable videoRendering: VideoRendering;

  constructor(resource: VideoResource) {
    super(TrackItemType.VIDEO);
    this.resource = resource;

    this.videoRendering = new VideoRendering();
  }

  clone(): VideoTrackItem {
    let trackItem = new VideoTrackItem(this.resource);
    this.__setTime(this.time, this.baseTime);
    return trackItem;
  }

  __setTime(time: TimePair, baseTime: number) {
    console.log(this, this.resource)
    let t = new TimePair(time.start, time.end);
    if (baseTime < 0) {
      t.start -= baseTime;
      baseTime = 0;
    }
    let dur = t.end - t.start;
    if (dur > this.resource.duration)
      t.end -= dur - this.resource.duration;
    this.time = t;
    this.baseTime = baseTime;
  }

}