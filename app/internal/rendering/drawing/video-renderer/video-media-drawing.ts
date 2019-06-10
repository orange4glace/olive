import { WithVideoMediaDrawingBase } from "internal/rendering/drawing/common/video-media-drawing";
import { VideoDrawingVideoRenderer } from "internal/rendering/drawing/video-renderer/video-drawing";
import { RenderingContext } from "internal/rendering/drawing/video-renderer/context";
import NVG, { NVGType } from "../../../../../nanovg-webgl";

export class VideoMediaDrawingVideoRenderer extends WithVideoMediaDrawingBase(VideoDrawingVideoRenderer) {

  image: NVGType.image_t;
  paint: NVGType.paint_t;

  draw(context: RenderingContext) {
    const vg = context.nvg;
    const timeOffset = context.timeOffset;

    const transformEffect = this.transformEffect;
    const position = transformEffect.position.getInterpolatedPropertyValue(timeOffset);
    const scale = transformEffect.scale.getInterpolatedPropertyValue(timeOffset);

    const videoFrame = context.videoFrame;
    this.image = vg.createImageRGBA(videoFrame.width, videoFrame.height, 0, videoFrame.ptr);
    this.paint = vg.imagePattern(0, 0, videoFrame.width, videoFrame.height, 0, this.image, 1);

    const w = this.resource.width;
    const h = this.resource.height;

    vg.save();
    vg.translate(position.x, position.y);
    vg.scale(scale.x, scale.y);
    vg.beginPath();
    vg.moveTo(0, 0);
    vg.lineTo(w, 0);
    vg.lineTo(w, h);
    vg.lineTo(0, h);
    vg.closePath();
    vg.fillPaint(this.paint);
    vg.fill();
    vg.restore();
  }

  afterDraw(context: RenderingContext) {
    context.nvg.freePaint(this.paint);
    context.nvg.deleteImage(this.image);
  }

}