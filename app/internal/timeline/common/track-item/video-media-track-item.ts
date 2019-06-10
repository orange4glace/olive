import { postable, Postabled } from "worker-postable";
import { VideoTrackItemBaseCtor, VideoTrackItemBase } from "internal/timeline/common/track-item/video-track-item";
import { VideoResourceBase } from "internal/resource/common/video-resource";

export function WithVideoMediaTrackItemBase<TBase extends VideoTrackItemBaseCtor>(Base: TBase) { 
  @Postabled
  class VideoMediaTrackItem extends Base {
    static readonly TYPE = 'olive.timeline.VideoMediaTrackItem';
    @postable protected resource_: VideoResourceBase;
    public get resource() { return this.resource_; }
  };
  return VideoMediaTrackItem;
}
@Postabled
export class VideoMediaTrackItemBase extends WithVideoMediaTrackItemBase(VideoTrackItemBase) {}