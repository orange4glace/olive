import * as React from 'react'
import ADiv, { ADivProps } from 'window/view/advanced-div';
import { RendererViewController } from '../controller/renderer-view-controller';
import { observer } from 'window/app-mobx';

interface RendererDrawingControlPointProps extends ADivProps {
  rendererViewController: RendererViewController;
  x: number;
  y: number;
}

@observer
export class RendererDrawingControlPoint extends React.PureComponent<RendererDrawingControlPointProps, {}> {

  render() {
    const controller = this.props.rendererViewController
    const props = {...this.props};
    const viewPos = controller.toViewSize(props.x, props.y);
    const style = {
      left: viewPos[0] + 'px',
      top: viewPos[1] + 'px'
    }
    delete props.rendererViewController;
    delete props.x;
    delete props.y;
    return (
      <ADiv className='drawing-control-point' {...props} style={style}>
        <div className='circle'><div className='fill'/></div>
      </ADiv>);
  }

}