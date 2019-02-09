import CanvasObject from 'object/object'
import Property from 'object/property';

import Vector2 from 'util/vector2';

class Figure extends CanvasObject {

  constructor(type) {
    super(type);

    this.enableProperties([
      Property.Transform.POSITION,
      Property.Transform.WIDTH,
      Property.Transform.HEIGHT,
    ]);
  }
  
  Serialize(){}
  Deserialize(serialized){}

  type;
  position = new Vector2();

}

export default Figure;