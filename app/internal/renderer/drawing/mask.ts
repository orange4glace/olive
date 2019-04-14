import DrawingRenderer from "./drawing";
import { PolygonBase } from "internal/drawing";
import { Posted } from "worker-postable";
import { Vector2PropertyRenderer } from "./property";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import NVG from "../../../../nanovg-webgl";
import { MaskDrawingBase } from "internal/drawing/mask";
import { PolygonRenderer } from "./polygon";

@Posted('MaskDrawing')
export class MaskDrawingRenderer extends PolygonRenderer implements MaskDrawingBase {

  inverted: boolean;

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;

    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);
    const path = this.path.getInterpolatedPropertyValue(timeoffset);

    if (path.length < 3) return;

    let points: PostableVector2Renderer[] = [];
    for (let i = 0; i < path.length; i ++) {
      const point = path[i];
      const currentPos =  point;
      points.push(currentPos);
    }

    if (this.inverted) {
      vg.save();
      vg.translate(position.x, position.y);
      vg.scale(scale.x, scale.y);

      vg.globalCompositeBlendFuncSeparate(vg.gl.ZERO, vg.gl.ONE, vg.gl.ONE, vg.gl.ONE_MINUS_DST_ALPHA);
      vg.beginPath();
      vg.moveTo(0, 0);
      vg.lineTo(100000, 0);
      vg.lineTo(100000, 100000);
      vg.lineTo(0, 100000);
      vg.closePath();
      vg.fillColor(0, 0, 0, 32);
      vg.fill();

      vg.blendEquationSeparate(vg.gl.FUNC_ADD, vg.gl.FUNC_SUBTRACT);
      vg.beginPath();
      const firstPoint = points[0];
      vg.moveTo(firstPoint.x, firstPoint.y);
      for (let i = 1; i < points.length; i ++) 
        vg.lineTo(points[i].x, points[i].y);
      vg.closePath();
      vg.fillColor(0, 0, 0, 32);
      vg.fill();

      vg.restore();
    }

    else {
      vg.save();
      vg.globalCompositeBlendFuncSeparate(vg.gl.ZERO, vg.gl.ONE, vg.gl.ONE, vg.gl.ONE_MINUS_DST_ALPHA);
      vg.translate(position.x, position.y);
      vg.scale(scale.x, scale.y);

      vg.beginPath();
      const firstPoint = points[0];
      vg.moveTo(firstPoint.x, firstPoint.y);
      for (let i = 1; i < points.length; i ++) 
        vg.lineTo(points[i].x, points[i].y);
      vg.closePath();

      vg.fillColor(0, 0, 0, 128);
      vg.fill();
      vg.restore();
    }
  }

  afterDraw(vg: NVG) {
    
  }
}