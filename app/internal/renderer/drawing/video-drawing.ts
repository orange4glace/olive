import DrawingRenderer from "./drawing";
import { VideoDrawingBase } from "internal/drawing";
import { PropertyRenderer, Vector2PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('VideoDrawing')
export class VideoDrawingRenderer extends DrawingRenderer
    implements VideoDrawingBase {

  size: Vector2PropertyRenderer;

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext) {
    console.log('draw vid')
  }
}