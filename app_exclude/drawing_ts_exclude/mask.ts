import { Drawing } from "./drawing";
import { Polygon, PolygonBase } from "./polygon";
import { DrawingType } from "./drawing-type";
import { Postable, postable } from "worker-postable";
import { Vector2 } from "oliveutil/vector2";
import { Vector2Property } from "./property";

export interface MaskDrawingBase extends PolygonBase {

}

@Postable
export class MaskDrawing extends Polygon implements MaskDrawingBase {

  constructor(path: Vector2[]) {
    super(DrawingType.MASK, 
        new Vector2Property(new Vector2(0, 0)),
        new Vector2Property(new Vector2(1, 1)),
        path);
  }

}