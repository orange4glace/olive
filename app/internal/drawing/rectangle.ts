import Property from './property'
import { Vector2PropertyValue } from './property-value';

import Polygon, { PolygonBase } from './polygon'
import PostableVector2 from 'util/postable_vector2';
import { Postable, postable } from 'worker-postable';

export interface RectangleBase extends PolygonBase {

}

@Postable
export default class Rectangle extends Polygon implements RectangleBase {

  @postable protected size: Property<PostableVector2>;

  constructor() {
    super();

    this.size = new Property<PostableVector2>(
        new Vector2PropertyValue(new PostableVector2(100, 100)));
  }
}