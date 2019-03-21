import DrawingRenderer from "./drawing";
import { VideoDrawingBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('VideoDrawing')
export class VideoDrawingRenderer extends DrawingRenderer
    implements VideoDrawingBase {

  size: Vector2PropertyRenderer;

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext, timeoffset: number) {
    // const vg = context.nvg;
    // const videoFrame = context.videoFrame;
    // const image = vg.createImageRGBA(videoFrame.width, videoFrame.height, 0, BigInt(videoFrame.ptr));
    // const paint = vg.imagePattern(image);
    // console.log(image, paint);
    // vg.beginPath();
    // vg.moveTo(0, 0);
    // vg.lineTo(videoFrame.width, 0);
    // vg.lineTo(videoFrame.width, videoFrame.height);
    // vg.lineTo(0, videoFrame.height);
    // vg.closePath();
    // vg.strokeColor(30, 80, 100, 255);
    // vg.stroke();
    // vg.fillPaint(paint);
    // vg.fill();
  }
}