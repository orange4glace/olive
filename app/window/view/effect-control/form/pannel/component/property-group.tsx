import *  as React from 'react'

import * as style from './property-group.scss'
import { observer } from 'window/app-mobx';
import { Drawing } from 'internal/drawing';
import { TrackItemHost } from 'window/view/timeline/controller';
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';

@observer
export class PropertyGroupView extends React.Component<{
  label: string;
  trackItemHost: TrackItemHost;
  drawingHost: DrawingHost<Drawing>;
}, {}> {

  constructor(props: any) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const drawingHost = this.props.drawingHost;
    drawingHost.open = !drawingHost.open;
    this.props.trackItemHost.focusDrawingHost(drawingHost);
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