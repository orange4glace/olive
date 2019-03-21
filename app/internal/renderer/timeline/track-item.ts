import { TrackItemBase, TrackItemType } from "internal/timeline";
import { Posted } from "worker-postable";
import DrawingRenderer from "../drawing/drawing";
import { DrawingContext } from "../drawing/drawing-context";
import NVG from "../../../../nanovg-webgl";

@Posted('TrackItem')
export class TrackItemRenderer implements TrackItemBase {
  type: TrackItemType;

  startTime: number;
  endTime: number;
  baseTime: number;

  next: TrackItemRenderer;
  prev: TrackItemRenderer;

  drawing: DrawingRenderer;

  draw(nvg: NVG, timecode: number): void {
    let context: DrawingContext = {
      nvg: nvg,
      timecode: timecode,
      screenWidth: 300,
      screenHeight: 150
    };
    this.drawing.draw(context, timecode - this.baseTime);
  }
}