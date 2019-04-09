import *  as React from 'react'

import * as style from './property-group.scss'
import { DrawingHost } from 'window/view/property/control/drawing-host';
import { observer } from 'window/app-mobx';

@observer
export class PropertyGroupView extends React.Component<{
  label: string;
  drawingHost: DrawingHost<any>;
}, {}> {

  constructor(props: any) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const drawingHost = this.props.drawingHost;
    drawingHost.open = !drawingHost.open;
  }

  render() {
    const drawingHost = this.props.drawingHost;
    return (
      <div className={style.component}>
        <div className='group' onClick={this.clickHandler}>
          <div className='label'>{this.props.label}</div>
        </div>
        <div className='content'>
          { drawingHost.open && this.props.children }
        </div>
      </div>
    )
  }

}