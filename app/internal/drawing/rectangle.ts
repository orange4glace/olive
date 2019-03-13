import Polygon, { PolygonBase } from './polygon'
import PostableVector2 from 'util/postable_vector2';
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector2Property } from './property';

export interface RectangleBase extends PolygonBase {

}

@Postable
export default class Rectangle extends Polygon implements RectangleBase {

  @postable protected size: Vector2Property;

  constructor() {
    super(DrawingType.RECTANGLE);

    this.size = new Vector2Property(new PostableVector2(100, 100));
  }
}