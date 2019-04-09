import { PolygonRenderer } from "./polygon";
import { RectangleBase, Vector2PropertyBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import NVG from "../../../../nanovg-webgl";

@Posted('Rectangle')
export class RectangleRenderer extends PolygonRenderer
    implements RectangleBase {

  protected size: Vector2PropertyRenderer;

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
  }

  afterDraw(vg: NVG) {
    
  }
}