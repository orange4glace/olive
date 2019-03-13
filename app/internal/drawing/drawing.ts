import { Postable, postable } from 'worker-postable';
import PostableVector2 from 'util/postable_vector2';
import { type } from 'os';
import { DrawingType } from './drawing-type';
import { Vector2Property, Vector2PropertyBase } from './property';

export interface DrawingBase {
  type: DrawingType;
  position: Vector2PropertyBase;
  scale: Vector2PropertyBase;
  children: Array<DrawingBase>;
}

@Postable
export default abstract class Drawing implements DrawingBase {

  @postable type: DrawingType;

  @postable position: Vector2Property;
  @postable scale: Vector2Property;
  @postable children: Array<Drawing>;

  constructor(type: DrawingType) {
    this.type = type;
    this.position = new Vector2Property(new PostableVector2(0, 0));
    this.scale = new Vector2Property(new PostableVector2(1, 1));

    this.children = new Array<Drawing>();
  }
  
}