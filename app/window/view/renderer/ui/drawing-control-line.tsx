import * as React from 'react'
import ADiv, { ADivProps } from 'window/view/advanced-div';
import { RendererViewController } from '../controller/renderer-view-controller';
import { observer } from 'window/app-mobx';
import { vec2 } from 'gl-matrix';

interface RendererDrawingControlLineProps extends ADivProps {
  rendererViewController: RendererViewController;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@observer
export class RendererDrawingControlLine extends React.PureComponent<RendererDrawingControlLineProps, {}> {

  render() {
    const controller = this.props.rendererViewController
    const props = {...this.props};
    const viewPos1 = controller.toViewSize(props.x1, props.y1);
    const viewPos2 = controller.toViewSize(props.x2, props.y2);
    const viewVec = vec2.create();
    vec2.sub(viewVec, vec2.fromValues(viewPos2[0], viewPos2[1]), vec2.fromValues(viewPos1[0], viewPos1[1]));
    const angle = Math.atan2(viewVec[1], viewVec[0]) / Math.PI * 180;
    console.log(this.props, viewPos1, viewPos2, viewVec)
    const style = {
      left: viewPos1[0] + 'px',
      top: viewPos1[1] + 'px',
      width: vec2.len(viewVec) + 'px',
      transform: `rotateZ(${angle}deg)`
    }
    delete props.rendererViewController;
    delete props.x1;
    delete props.y1;
    delete props.x2;
    delete props.y2;
    return (
      <ADiv className='drawing-control-line' {...props} style={style}>
        <div className='border'/>
      </ADiv>);
  }

}