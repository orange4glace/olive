import React from 'react';
import ObjectType from 'object/type';

import Rectangle from 'object/figure/rectangle';

import RectangleComponent from 'renderer/component/rectangle';

class CanvasData {
  objects = [];
  
  constructor() {
    this.objects.push(new Rectangle());
  }
};

let canvasData = new CanvasData();

function GetObjectComponent(object) {
  const OBJECT_COMPONENT_MAP = {
    [ObjectType.RECTANGLE]: RectangleComponent
  }
  console.log(OBJECT_COMPONENT_MAP[object.type], <div/>)
  return OBJECT_COMPONENT_MAP[object.type];
}

class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {canvasData.objects.map(object => {
          var component = GetObjectComponent(object);
          React.cloneElement(
            <component/>, {
            key: object.id
          });
        })}
      </div>
    )
  }

}

export default Canvas;