import Drawing, { DrawingBase } from './drawing';
import { Postable } from 'worker-postable';
import { DrawingType } from './drawing-type';

export interface PolygonBase extends DrawingBase {

}

@Postable
export default abstract class Polygon extends Drawing implements PolygonBase {

  constructor(type: DrawingType) {
    super(type);
  }
}