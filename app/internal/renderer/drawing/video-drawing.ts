import DrawingRenderer from "./drawing";
import { VideoDrawingBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import NVG, { NVGType } from "../../../../nanovg-webgl";

@Posted('VideoDrawing')
export class VideoDrawingRenderer extends DrawingRenderer
    implements VideoDrawingBase {

  size: Vector2PropertyRenderer;

  image: NVGType.image_t;
  paint: NVGType.paint_t;

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;
    const videoFrame = context.videoFrame;
    this.image = vg.createImageRGBA(videoFrame.width, videoFrame.height, 0, videoFrame.ptr);
    this.paint = vg.imagePattern(0, 0, videoFrame.width, videoFrame.height, 0, this.image, 1);

    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);
    vg.save();
    vg.translate(position.x, position.y);
    vg.scale(scale.x, scale.y);
    vg.beginPath();
    vg.moveTo(0, 0);
    vg.lineTo(videoFrame.width, 0);
    vg.lineTo(videoFrame.width, videoFrame.height);
    vg.lineTo(0, videoFrame.height);
    vg.closePath();
    vg.strokeColor(20, 90, Math.floor(Math.random() * 235), 255);
    vg.stroke()
    vg.fillPaint(this.paint);
    vg.fill();
    vg.restore();
  }

  afterDraw(vg: NVG) {
    vg.freePaint(this.paint);
    vg.deleteImage(this.image);
  }
}