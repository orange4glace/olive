import DrawingRenderer from "./drawing";
import { PolygonBase } from "internal/drawing";
import { Posted } from "worker-postable";

@Posted('Polygon')
export abstract class PolygonRenderer extends DrawingRenderer
    implements PolygonBase {

  constructor() {
    super();
  }
}