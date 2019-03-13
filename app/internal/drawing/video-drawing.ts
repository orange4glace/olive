import Drawing, { DrawingBase } from './drawing'
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector2Property, Vector2PropertyBase } from './property';

export interface VideoDrawingBase extends DrawingBase {
  size: Vector2PropertyBase;
}

@Postable
export default class VideoDrawing extends Drawing implements VideoDrawingBase {

  @postable size: Vector2Property;

  constructor() {
    super(DrawingType.VIDEO);
  }
}