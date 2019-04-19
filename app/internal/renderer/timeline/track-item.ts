import { Posted } from "worker-postable";
import NVG from "../../../../nanovg-webgl";
import { TrackItemBase } from "internal/timeline/track-item";
import { TrackItemTimeRenderer } from "internal/renderer/timeline/track-item-time";
import { TrackItemType } from "internal/timeline/track-item-type";

@Posted('TrackItemImpl')
export class TrackItemRenderer implements TrackItemBase {
  type: TrackItemType;

  time: TrackItemTimeRenderer;

  // drawing: DrawingRenderer;

  draw(nvg: NVG, timecode: number): void {
    // let context: DrawingContext = {
    //   nvg: nvg,
    //   timecode: timecode,
    //   screenWidth: 300,
    //   screenHeight: 150
    // };
    // this.drawing.draw(context, timecode);
  }

  afterDraw(nvg: NVG, timecode: number): void {
    // this.drawing.afterDraw(nvg);
  }
}