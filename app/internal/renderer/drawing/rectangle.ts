import { PolygonRenderer } from "./polygon";
import { RectangleBase, Vector2PropertyBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('Rectangle')
export class RectangleRenderer extends PolygonRenderer
    implements RectangleBase {

  protected size: Vector2PropertyRenderer;

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;
    const videoFrame = context.videoFrame;
    const image = vg.createImageRGBA(1280, 720, 0, videoFrame.ptr);
    const paint = vg.imagePattern(0, 0, 1280, 720, 0, image, 1);
    console.log(image,paint)
    vg.beginPath();
    // vg.moveTo(0, 0);
    // vg.lineTo(videoFrame.width, 0);
    // vg.lineTo(videoFrame.width, videoFrame.height);
    // vg.lineTo(0, videoFrame.height);
    vg.moveTo(0, 0);
    vg.lineTo(1280, 0);
    vg.lineTo(1280, 720);
    vg.lineTo(0, 720);
    vg.closePath();
    vg.strokeColor(20, 90, Math.floor(Math.random() * 235), 255);
    vg.stroke()
    vg.fillPaint(paint);
    vg.fill();
    vg.endFrame();
    vg.freePaint(paint);
    vg.deleteImage(image);
    return;
    const nvg = context.nvg;
    let position = this.position.getInterpolatedPropertyValue(timeoffset);
    let size = this.size.getInterpolatedPropertyValue(timeoffset);
    nvg.strokeColor(125, 39, 92, 255);
    nvg.beginPath();
    nvg.moveTo(position.x, position.y);
    nvg.lineTo(position.x + size.x, position.y);
    nvg.lineTo(position.x + size.x, position.y + size.y);
    nvg.lineTo(position.x, position.y + size.y);
    nvg.closePath();
    nvg.stroke();
  }
}