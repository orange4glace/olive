import { PolygonRenderer } from "./polygon";
import { RectangleBase } from "internal/drawing";
import { Vector4PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import NVG from "../../../../nanovg-webgl";
import DrawingRenderer from "./drawing";

@Posted('Rectangle')
export class RectangleRenderer extends DrawingRenderer
    implements RectangleBase {

  size: Vector4PropertyRenderer;

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;

    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);
    const size = this.size.getInterpolatedPropertyValue(timeoffset);

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

  afterDraw(vg: NVG) {
    
  }
}