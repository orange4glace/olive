import DrawingRenderer from "./drawing";
import { VideoDrawingBase } from "internal/drawing";
import { PropertyRenderer } from "./property";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('VideoDrawing')
export class VideoDrawingRenderer extends DrawingRenderer
    implements VideoDrawingBase {

  size: PropertyRenderer<PostableVector2Renderer>;

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext) {
    console.log('draw vid')
  }
}