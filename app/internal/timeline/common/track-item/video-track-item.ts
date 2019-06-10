import { postable, Postabled } from "worker-postable";
import { VideoDrawingBase } from "internal/rendering/drawing/common/video-drawing";
import { TrackItemBaseCtor, TrackItemBase } from "internal/timeline/common/track-item/track-item";

export type VideoTrackItemBaseCtor = new (...args: any[]) => VideoTrackItemBase;
export function WithVideoTrackItemBase<TBase extends TrackItemBaseCtor>(Base: TBase) { 
  @Postabled
  class VideoTrackItemBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.VideoTrackItem';

    @postable protected drawing_: VideoDrawingBase;
    public get drawing() { return this.drawing_; }
  };
  return VideoTrackItemBase;
}
@Postabled
export class VideoTrackItemBase extends WithVideoTrackItemBase(TrackItemBase) {}