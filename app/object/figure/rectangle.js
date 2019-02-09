import Figure from 'object/figure/figure';
import ObjectType from 'object/type';

import Vector2 from 'util/vector2';

class Rectangle extends Figure {

  constructor() {
    super(ObjectType.RECTANGLE);
  }

  size = new Vector2();

}

export default Rectangle;