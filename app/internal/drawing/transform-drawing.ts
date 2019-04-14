import { DrawingBase, Drawing } from './drawing';
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { PolyPathProperty, PolyPathPropertyBase, Vector2Property, Vector2PropertyBase } from './property';
import { Vector2 } from 'oliveutil/vector2';

export interface TransformDrawingBase extends DrawingBase {
  position: Vector2PropertyBase;
  scale: Vector2PropertyBase;
}

@Postable
export class TransformDrawing extends Drawing implements TransformDrawingBase {

  @postable position: Vector2Property;

}