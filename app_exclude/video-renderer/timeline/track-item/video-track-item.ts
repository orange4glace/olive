import { Posted } from "worker-postable";
import NVG from "../../../../../../nanovg-webgl";
import { VideoTrackItemRenderer } from "internal/renderer/base/all";
import { VideoDrawingVideoRenderer } from "internal/renderer/video-renderer/rendering/all";
import { TrackItemVideoRenderer } from "internal/renderer/video-renderer/timeline/track-item";

@Posted('VideoTrackItemImpl')
export abstract class VideoTrackItemVideoRenderer
    extends TrackItemVideoRenderer
    implements VideoTrackItemRenderer {

  /*@postable*/ drawing: VideoDrawingVideoRenderer;

  abstract async draw(nvg: NVG, timecode: number): Promise<null>;
  decode(timecode: number): void {}

}