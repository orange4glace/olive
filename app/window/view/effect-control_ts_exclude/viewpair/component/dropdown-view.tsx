import * as React from 'react'

import * as style from './dropdown-view.scss'
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { Drawing } from 'internal/drawing';

export class PropertyViewDropDownView extends React.Component<{
  open: boolean
}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      this.props.open ?
        <div className='content'>
          {this.props.children}
        </div> : <></>
    )
  }
}

export class PropertyViewDrawingDropDownView extends React.Component<{
  label: string,
  drawingHost: DrawingHost<Drawing>
}, {}> {
  constructor(props: any) {
    super(props);
    this.toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
  }

  toggleButtonClickHandler() {
    const drawingHost = this.props.drawingHost;
    drawingHost.open = !drawingHost.open;
  }

  render() {
    const drawingHost = this.props.drawingHost;
    return (
      <PropertyViewDropDownView open={drawingHost.open}>
        <div className='button' onClick={this.toggleButtonClickHandler}/>
        <div className='label'>{this.props.label}</div>
        <div className='content'>
          {this.props.children}
        </div>
      </PropertyViewDropDownView>
    )
  }
}