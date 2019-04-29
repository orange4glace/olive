import { DrawingBase, Drawing } from './drawing';
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { PolyPathProperty, PolyPathPropertyBase, Vector2Property } from './property';
import { Vector2 } from 'oliveutil/vector2';

export interface PolygonBase extends DrawingBase {
  path: PolyPathPropertyBase;
}

@Postable
export abstract class Polygon extends Drawing implements PolygonBase {

  @postable path: PolyPathProperty;

  constructor(type: DrawingType, position: Vector2Property, scale: Vector2Property, path: Vector2[]) {
    super(type, position, scale);
    this.path = new PolyPathProperty(path);
    this.addProperty(this.path);
  }
}