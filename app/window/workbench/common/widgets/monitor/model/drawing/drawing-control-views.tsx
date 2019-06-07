import './drawing-control-views.scss';
import * as React from 'react'
import ADiv, { ADivProps } from 'window/view/advanced-div';
import { observer } from 'window/app-mobx';

interface MonitorWidgetDrawingControlPointProps extends ADivProps {
  x: number;
  y: number;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseMoveStart?: (e: MouseEvent) => void;
}

@observer
export class MonitorWidgetDrawingControlPoint extends React.Component<MonitorWidgetDrawingControlPointProps, {}> {

  render() {
    const props = {...this.props};
    const style = {
      left: props.x + 'px',
      top: props.y + 'px'
    }
    return (
      <ADiv className='drawing-control-point'
        style={style}
        onMouseDown={this.props.onMouseDown}
        onDocumentMouseMoveStart={this.props.onMouseMoveStart}>
        <div className='circle'><div className='fill'/></div>
      </ADiv>);
  }

}