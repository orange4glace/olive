import { DrawingBase } from "internal/drawing";
import { PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('Drawing')
export default abstract class DrawingRenderer implements DrawingBase {
  position: PropertyRenderer<PostableVector2Renderer>;
  scale: PropertyRenderer<PostableVector2Renderer>;
  children: Array<DrawingRenderer>;

  draw(context: DrawingContext) {
    console.log('Draw on Drawing',this);
    this.drawSelf(context);
    this.children.forEach(child => {
      child.draw(context);
    })
  }
  protected abstract drawSelf(context: DrawingContext): void;
}