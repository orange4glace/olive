import { DrawingBase, Drawing } from './drawing'
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector2Property, Vector2PropertyBase } from './property';
import PostableVector2 from 'util/postable_vector2';

export interface VideoDrawingBase extends DrawingBase {
  size: Vector2PropertyBase;
}

@Postable
export default class VideoDrawing extends Drawing implements VideoDrawingBase {

  @postable size: Vector2Property;

  constructor() {
    super(DrawingType.VIDEO);
    this.size = new Vector2Property(new PostableVector2(100, 100));

    this.addProperty(this.size);
  }
}