import Property, { PropertyBase } from './property'
import { Vector2PropertyValue, Vector2PropertyValueBase } from './property-value';

import Drawing, { DrawingBase } from './drawing'
import { Postable, postable } from 'worker-postable';
import PostableVector2 from 'util/postable_vector2';

export interface VideoDrawingBase extends DrawingBase {
  size: PropertyBase<PostableVector2>;
}

@Postable
export default class VideoDrawing extends Drawing implements VideoDrawingBase {

  @postable size: Property<PostableVector2>;

  constructor() {
    super();
  }
}