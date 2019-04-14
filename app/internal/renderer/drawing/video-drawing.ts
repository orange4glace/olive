import DrawingRenderer from "./drawing";
import { VideoDrawingBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import NVG, { NVGType } from "../../../../nanovg-webgl";
import { MaskDrawingRenderer } from "./mask";

@Posted('VideoDrawing')
export class VideoDrawingRenderer extends DrawingRenderer
    implements VideoDrawingBase {

  masks: MaskDrawingRenderer[];

  image: NVGType.image_t;
  paint: NVGType.paint_t;

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;
    const videoFrame = context.videoFrame;

    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);
    
    const vw = context.videoFrame.width;
    const vh = context.videoFrame.height;

    this.image = vg.createImageRGBA(videoFrame.width, videoFrame.height, 0, videoFrame.ptr);
    this.paint = vg.imagePattern(0, 0, vw, vh, 0, this.image, 1);

    vg.save();
    // vg.gl.blendFunc(vg.gl.FUNC_ADD, vg.gl.FUNC_ADD);
    vg.globalCompositeBlendFuncSeparate(vg.gl.ONE, vg.gl.ZERO, vg.gl.ZERO, vg.gl.ZERO); 
    // vg.globalCompositeBlendFuncSeparate(vg.gl.ONE, vg.gl.ZERO, vg.gl.ZERO, vg.gl.ZERO); 
    // vg.globalCompositeBlendFunc(vg.gl.ONE, vg.gl.ONE_MINUS_SRC_ALPHA); 
    vg.translate(position.x, position.y);
    vg.beginPath();
    vg.moveTo(0, 0);
    vg.lineTo(vw, 0);
    vg.lineTo(vw, vh);
    vg.lineTo(0, vh);
    vg.closePath();
    // vg.fillColor(255, 0, 0, 125);
    vg.fillPaint(this.paint);
    vg.fill();

    this.masks.forEach(mask => {
      console.log(mask)
      mask.draw(context, timeoffset)
    });

    vg.restore();
  }

  afterDraw(vg: NVG) {
    vg.freePaint(this.paint);
    vg.deleteImage(this.image);
  }
}