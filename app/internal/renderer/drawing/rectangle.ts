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

  protected drawSelf(context: DrawingContext) {
    const nvg = context.nvg;
    let position = this.position.getInterpolatedPropertyValue(context.timecode);
    let size = this.size.getInterpolatedPropertyValue(context.timecode);
    console.log(position,size)
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