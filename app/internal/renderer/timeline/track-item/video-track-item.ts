import { TrackItemRenderer } from "../track-item";
import { Posted } from "worker-postable";
import NVG from "../../../../../nanovg-webgl";
import { VideoTrackItemBase } from "internal/timeline/video-track-item";
import { VideoDrawingRenderer } from "internal/renderer/rendering/drawing/video-drawing";

@Posted('VideoTrackItemImpl')
export abstract class VideoTrackItemRenderer extends TrackItemRenderer
    implements VideoTrackItemBase {
  
  drawing: VideoDrawingRenderer;

  abstract async draw(nvg: NVG, timecode: number): Promise<null>;
  decode(timecode: number): void {}

}