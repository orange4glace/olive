import Property from 'internal/object/property'
import { ScalarPropertyValue, Vector2PropertyValue } from 'internal/object/property-value';

import NVG from '../../../nanovg-webgl'

export default abstract class ObjectBase {

  protected position: Property<Vector2PropertyValue>;
  protected scale: Property<ScalarPropertyValue>;

  abstract draw(vg: NVG, timecode: number): void;
  // abstract testPoint(point: Vector2): boolean;
}