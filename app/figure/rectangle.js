import Figure from 'figure/figure';
import FigureType from 'figure/type';

import Vector2 from 'util/vector2';

class Rectangle extends Figure {

  constructor() {
    super(FigureType.RECTANGLE);
  }

  size = new Vector2();

}

export default Rectangle;