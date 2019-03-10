import Drawing, { DrawingBase } from './drawing';
import { Postable } from 'worker-postable';

export interface PolygonBase extends DrawingBase {

}

@Postable
export default abstract class Polygon extends Drawing implements PolygonBase {

  constructor() {
    super();
  }
}