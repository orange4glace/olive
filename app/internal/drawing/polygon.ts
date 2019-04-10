import { DrawingBase, Drawing } from './drawing';
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import PostableVector2 from 'util/postable_vector2';
import { Vector2Property, Vector2PropertyBase } from './property';

export interface PolygonBase extends DrawingBase {
  points: Vector2PropertyBase[];
}

@Postable
export class Polygon extends Drawing implements PolygonBase {

  @postable points: Vector2Property[] = [];

  constructor(type?: DrawingType) {
    super(type || DrawingType.POLYGON);
  }

  addPoint(x: number, y: number) {
    const point = new Vector2Property(new PostableVector2(x, y));
    this.points.push(point);
  }
}