import Vector2 from 'util/vector2';

var next_figure_id = 0;

class Figure {

  constructor(type) {
    this.type = type;
    this.id = next_figure_id++;
  }
  
  Serialize(){}
  Deserialize(serialized){}

  type;
  position = new Vector2();

}

export default Figure;