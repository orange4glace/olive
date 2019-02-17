import Property from 'internal/object/property'
import { Vector2PropertyValue } from 'internal/object/property-value';

import Vector2 from 'util/vector2'
import Polygon from 'internal/object/polygon'
import NVG from '../../../nanovg-webgl';

export default class Rectangle extends Polygon {

  protected size: Property<Vector2PropertyValue>;

  constructor() {
    super();
  }

  draw(vg: NVG, timecode: number) {
    var position = this.position.getInterpolatedPropertyValue(timecode).value;
    var size = this.size.getInterpolatedPropertyValue(timecode).value;
    var tl, tr, bl, br;
    tl = new Vector2(position.value.x, position.value.y);
    tr = new Vector2(position.value.x + size.value.x, position.value.x);
    bl = new Vector2(position.value.x, position.value.y + size.value.y);
    br = new Vector2(position.value.x + size.value.x, position.value.y + size.value.y);
    vg.beginPath();
    vg.moveTo(tl.x, tl.y);
    vg.lineTo(tr.x, tr.y);
    vg.lineTo(br.x, br.y);
    vg.lineTo(bl.x, bl.y);
    vg.closePath();
    vg.fill();
  }
}