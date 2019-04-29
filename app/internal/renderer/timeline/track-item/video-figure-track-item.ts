import { Posted } from "worker-postable";
import NVG from "../../../../../nanovg-webgl";
import { VideoTrackItemRenderer } from "internal/renderer/timeline/track-item/video-track-item";
import { VideoFigureTrackItemBase } from "internal/timeline/video-figure-track-item";

@Posted('VideoFigureTrackItemImpl')
export abstract class VideoFigureTrackItemRenderer extends VideoTrackItemRenderer
    implements VideoFigureTrackItemBase {

  async draw(nvg: NVG, timecode: number): Promise<null> {
    return null;
  }

}