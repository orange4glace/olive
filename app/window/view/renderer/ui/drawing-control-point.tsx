import * as React from 'react'
import ADiv, { ADivProps } from 'window/view/advanced-div';

interface RendererDrawingControlPointProps extends ADivProps {
  x: number;
  y: number;
}

export class RendererDrawingControlPoint extends React.PureComponent<RendererDrawingControlPointProps, {}> {

  render() {
    const props = {...this.props};
    const style = {
      left: props.x + 'px',
      top: props.y + 'px'
    }
    delete props.x;
    delete props.y;
    return (
      <ADiv className='drawing-control-point' {...props} style={style}>
        <div className='circle'><div className='fill'/></div>
      </ADiv>);
  }

}