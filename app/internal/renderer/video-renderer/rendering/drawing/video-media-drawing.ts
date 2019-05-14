import { Posted } from "worker-postable";
import { RenderingContext } from "internal/renderer/video-renderer/rendering/context/rendering-context";
import NVG, { NVGType } from "../../../../../../nanovg-webgl";
import { VideoMediaDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-media-drawing";

@Posted('VideoMediaDrawing')
export class VideoMediaDrawingVideoRenderer extends VideoMediaDrawingRenderer {

  image: NVGType.image_t;
  paint: NVGType.paint_t;

  draw(context: RenderingContext): void {
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

  afterDraw(vg: NVG) {
    vg.freePaint(this.paint);
    vg.deleteImage(this.image);
  }

}