import DrawingRenderer from "./drawing";
import { PolygonBase } from "internal/drawing";
import { Posted } from "worker-postable";
import { PostableVector2Renderer } from "../renderer-util";

@Posted('Polygon')
export abstract class PolygonRenderer extends DrawingRenderer
    implements PolygonBase {

  points: PostableVector2Renderer[];

  constructor() {
    super();
  }
}