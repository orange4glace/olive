import { Polygon, PolygonBase } from './polygon'
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector4PropertyBase, Vector4Property } from './property';
import { Vector4 } from 'oliveutil/vector4';

export interface RectangleBase extends PolygonBase {
  size: Vector4PropertyBase;
}

@Postable
export default class Rectangle extends Polygon implements RectangleBase {

  @postable size: Vector4Property;

  constructor() {
    super(DrawingType.RECTANGLE);
    this.size = new Vector4Property(new Vector4(-100, 100, 100, -100));

    this.addProperty(this.size);
  }
}