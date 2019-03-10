import { PolygonRenderer } from "./polygon";
import { RectangleBase } from "internal/drawing";
import { PropertyRenderer } from "./property";
import { Vector2PropertyValueRenderer } from "./property-value";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('Rectangle')
export class RectangleRenderer extends PolygonRenderer
    implements RectangleBase {

  protected size: PropertyRenderer<PostableVector2Renderer>;

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext) {
    const nvg = context.nvg;
    let position = this.position.getInterpolatedPropertyValue(context.timecode).value;
    let size = this.size.getInterpolatedPropertyValue(context.timecode).value;
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