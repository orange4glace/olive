import { VideoDrawingRenderer } from "internal/renderer/rendering/drawing/video-drawing";
import { RectangleDrawingBase } from "internal/rendering/drawing/rectangle-drawing";
import { RectangleEffectRenderer } from "internal/renderer/rendering/effect/video-effect/rectangle-effect";
import { Posted } from "worker-postable";
import { RenderingContext } from "internal/renderer/rendering/context/rendering-context";

@Posted('RectangleDrawing')
export class RectangleDrawingRenderer extends VideoDrawingRenderer
    implements RectangleDrawingBase {

  rectangleEffect: RectangleEffectRenderer;

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

    console.log(size);

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

}