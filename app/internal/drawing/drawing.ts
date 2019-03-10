import Property, { PropertyBase } from './property'
import { ScalarPropertyValue, Vector2PropertyValue, Vector2PropertyValueBase, ScalarPropertyValueBase } from './property-value';
import { Postable, postable } from 'worker-postable';
import PostableVector2 from 'util/postable_vector2';

export interface DrawingBase {
  position: PropertyBase<PostableVector2>;
  scale: PropertyBase<PostableVector2>;
  children: Array<DrawingBase>;
}

@Postable
export default abstract class Drawing implements DrawingBase {

  @postable position: Property<PostableVector2>;
  @postable scale: Property<PostableVector2>;
  @postable children: Array<Drawing>;

  constructor() {
    this.position = new Property<PostableVector2>(
      new Vector2PropertyValue(new PostableVector2(0, 0)));
    this.scale = new Property<PostableVector2>(
        new Vector2PropertyValue(new PostableVector2(1, 1)));

    this.children = new Array<Drawing>();
  }
  
}