import React from 'react';
import FigureType from 'figure/type';

import Rectangle from 'figure/rectangle';

import RectangleComponent from 'renderer/component/rectangle';

class CanvasData {
  figures = [];
  
  constructor() {
    this.figures.push(new Rectangle());
  }
};

let canvasData = new CanvasData();

function GetFigureComponent(figure) {
  const FIGURE_COMPONENT_MAP = {
    [FigureType.RECTANGLE]: RectangleComponent
  }
  console.log(FIGURE_COMPONENT_MAP[figure.type], <div/>)
  return FIGURE_COMPONENT_MAP[figure.type];
}

class Test extends React.Component {
  render() {
    return <div/>
  }
}

class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {canvasData.figures.map(figure => {
          var component = GetFigureComponent(figure);
          React.cloneElement(
            <component/>, {
            key: figure.id
          });
        })}
      </div>
    )
  }

}

export default Canvas;