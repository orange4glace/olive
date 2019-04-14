
import * as React from 'react'

import { PropertyViewNode, PropertyViewNodeFormView, PropertyViewNodeChildrenFormViewRenderer, PropertyViewNodeTimelineEmptyView } from "./node";
import { Drawing, Paper } from "internal/drawing";
import { DrawingHost } from "window/view/timeline/controller/drawing-host";
import { TrackItemHost } from "window/view/timeline/controller";
import VideoDrawing from "internal/drawing/video-drawing";
import { PropertyViewNodeType } from "./node-type";
import { observer } from 'window/app-mobx';

import * as style from './index.scss'

export class PropertyViewDrawingNode<T extends Drawing> extends PropertyViewNode {
  trackItemHost: TrackItemHost;
  drawingHost: DrawingHost<T>;

  constructor(trackItemHost: TrackItemHost, drawingHost: DrawingHost<T>) {
    super(PropertyViewNodeType.DRAWING);

    this.formView = PropertyViewDrawingNodeFormView;
    this.timelineView = PropertyViewNodeTimelineEmptyView;
  }
}

@observer
class PropertyViewDrawingFormView extends React.Component<{
  node: PropertyViewDrawingNode<Drawing>,
  label: string,
}, {}> {

  constructor(props: any) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const node = this.props.node;
    const drawingHost = node.drawingHost;
    drawingHost.open = !drawingHost.open;
    node.trackItemHost.focusDrawingHost(drawingHost);
  }

  render() {
    const node = this.props.node;
    const drawingHost = node.drawingHost;
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

class PropertyViewDrawingNodeFormView extends PropertyViewNodeFormView<PropertyViewDrawingNode<Drawing>> {
  render() {
    return (
      <PropertyViewDrawingFormView node={this.props.node} label='drawing'>
        <PropertyViewNodeChildrenFormViewRenderer children={this.props.node.children}/>
      </PropertyViewDrawingFormView>
    )
  }
}