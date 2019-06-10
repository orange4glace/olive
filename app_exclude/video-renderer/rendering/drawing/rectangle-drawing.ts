import { RectangleDrawingBase } from "internal/rendering/drawing/base/rectangle-drawing";
import { Posted } from "worker-postable";
import { RenderingContext } from "internal/renderer/video-renderer/rendering/context/rendering-context";
import { RectangleDrawingRenderer } from "internal/renderer/base/rendering/drawing/rectangle-drawing";
import NVG from "../../../../../../nanovg-webgl";

@Posted('RectangleDrawing')
export class RectangleDrawingVideoRenderer extends RectangleDrawingRenderer
    implements RectangleDrawingBase {

  draw(context: RenderingContext): void {
    const vg = context.nvg;
    const timeOffset = context.timeOffset;

    const transformEffect = this.transformEffect;
    const rectangleEffect = this.rectangleEffect;
    const position = transformEffect.position.getInterpolatedPropertyValue(timeOffset);
    const scale = transformEffect.scale.getInterpolatedPropertyValue(timeOffset);
    const size = rectangleEffect.size.getInterpolatedPropertyValue(timeOffset);

    const top = size.x;
    const right = size.y;
    const bottom = size.z;
    const left = size.w;

    vg.save();
    vg.translate(position.x, position.y);
    vg.scale(scale.x, scale.y);
    vg.beginPath();
    vg.moveTo(left, top);
    vg.lineTo(right, top);
    vg.lineTo(right, bottom);
    vg.lineTo(left, bottom);
    vg.closePath();
    vg.fillColor(199, 125, 125, 255);
    vg.fill();
    vg.strokeColor(35,129,19,255);
    vg.stroke();
    vg.restore();
  }

  afterDraw(nvg: NVG) {}

}