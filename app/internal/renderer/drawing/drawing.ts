import { DrawingBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";
import { DrawingType } from "internal/drawing/drawing-type";

@Posted('Drawing')
export default abstract class DrawingRenderer implements DrawingBase {
  type: DrawingType;
  position: Vector2PropertyRenderer;
  scale: Vector2PropertyRenderer;
  children: Array<DrawingRenderer>;

  draw(context: DrawingContext, timeoffset: number) {
    this.drawSelf(context, timeoffset);
    this.children.forEach(child => {
      child.draw(context, timeoffset);
    })
  }
  protected abstract drawSelf(context: DrawingContext, timeoffset: number): void;
}