import { Polygon, PolygonBase } from './polygon'
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector4PropertyBase, Vector4Property, Vector2Property } from './property';
import { Vector4 } from 'oliveutil/vector4';
import { Drawing, DrawingBase } from './drawing';

export interface RectangleBase extends DrawingBase {
  size: Vector4PropertyBase;
}

@Postable
export default class Rectangle extends Drawing implements RectangleBase {

  @postable size: Vector4Property;

  constructor(position: Vector2Property, scale: Vector2Property) {
    super(DrawingType.RECTANGLE, position, scale);
    this.size = new Vector4Property(new Vector4(-100, 100, 100, -100));

    this.addProperty(this.size);
  }
}