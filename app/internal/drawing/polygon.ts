import { DrawingBase, Drawing } from './drawing';
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import PostableVector2 from 'util/postable_vector2';

export interface PolygonBase extends DrawingBase {
  points: PostableVector2[];
}

@Postable
export default abstract class Polygon extends Drawing implements PolygonBase {

  @postable points: PostableVector2[] = [];

  constructor(type: DrawingType) {
    super(type);
  }

  addPoint(x: number, y: number) {
    const point = new PostableVector2(x, y);
    this.points.push(point);
  }
}