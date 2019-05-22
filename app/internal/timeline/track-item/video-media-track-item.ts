import { VideoTrackItemBase, VideoTrackItem, VideoTrackItemImpl } from "internal/timeline/track-item/video-track-item";
import { Postable, postable } from "worker-postable";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { VideoResourceBase, VideoResource } from "internal/resource";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
import { clone } from "base/common/cloneable";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";

export interface VideoMediaTrackItemBase extends VideoTrackItemBase {
  readonly resource: VideoResourceBase;
}

export interface VideoMediaTrackItem extends VideoTrackItem {
  readonly resource: VideoResource;
}

@Postable
export class VideoMediaTrackItemImpl extends VideoTrackItemImpl implements VideoMediaTrackItemBase {

  @postable resource: VideoResource;

  constructor(resource: VideoResource) {
    super(TrackItemType.VIDEO_MEDIA);
    this.resource = resource;
    this.drawing = new VideoMediaDrawing(resource);
  }

  __setTime(time: TrackItemTime) {
    time = clone(time);
    if (time.base < 0) {
      time.start -= time.base;
      time.base = 0;
    }
    let dur = time.end - time.start;
    if (dur > this.resource.duration)
      time.end -= dur - this.resource.duration;
    this.time = time;
    this.onTimeChanged_.fire();
  }

  clone(obj: VideoMediaTrackItemImpl): Object {
    super.clone(obj);
    obj.resource = this.resource;
    return obj;
  }
  

}