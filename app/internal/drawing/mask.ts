import { Drawing } from "./drawing";
import Polygon, { PolygonBase } from "./polygon";
import { DrawingType } from "./drawing-type";
import { Postable } from "worker-postable";

export interface MaskDrawingBase extends PolygonBase {

}

@Postable
class MaskDrawing extends Polygon implements MaskDrawingBase {

  constructor() {
    super(DrawingType.MASK);
  }

}