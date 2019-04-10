import DrawingRenderer from "./drawing";
import { PolygonBase } from "internal/drawing";
import { Posted } from "worker-postable";
import { Vector2PropertyRenderer } from "./property";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import NVG from "../../../../nanovg-webgl";

@Posted('Polygon')
export class PolygonRenderer extends DrawingRenderer implements PolygonBase {

  points: Vector2PropertyRenderer[];

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;

    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);

    if (this.points.length < 3) return;

    let points: PostableVector2Renderer[] = [];
    for (let i = 0; i < this.points.length; i ++) {
      const point = this.points[i];
      const currentPos = point.getInterpolatedPropertyValue(timeoffset);
      points.push(currentPos);
    }

    vg.save();
    vg.translate(position.x, position.y);
    vg.scale(scale.x, scale.y);
    vg.beginPath();

    const firstPoint = points[0];
    vg.moveTo(firstPoint.x, firstPoint.y);
    for (let i = 1; i < points.length; i ++) 
      vg.lineTo(points[i].x, points[i].y);

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