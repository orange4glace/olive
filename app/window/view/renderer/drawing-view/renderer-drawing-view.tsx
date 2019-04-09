import * as React from 'react'
import { RendererDrawingHost, RendererVideoDrawingHost } from '../controller/renderer-drawing-host';
import { Drawing } from 'internal/drawing';
import { RendererDrawingControlPoint } from './renderer-drawing-control-point';
import { vec2 } from 'gl-matrix';
import { RendererController } from '../controller/renderer-controller';

interface RendererDrawingViewProps<T extends RendererDrawingHost<any>> {
  rendererController: RendererController
  drawingHost: T;
}

export class RendererDrawingView<T extends RendererDrawingHost<any>>
    extends React.Component<RendererDrawingViewProps<T>, {}> {
  
}

export class RendererVideoDrawingView extends RendererDrawingView<RendererVideoDrawingHost> {

  constructor(props: RendererDrawingViewProps<RendererVideoDrawingHost>) {
    super(props);
  }

  render() {
    const videoDrawingHost = this.props.drawingHost;
    const videoDrawing = videoDrawingHost.drawing;
    const size = videoDrawing.size.
    let p1 = vec2.fromValues(0, 0),
        p2 = vec2.fromValues
    videoDrawing.
    return (
      <div className='video-drawing'>
      {
        <RendererDrawingControlPoint 
      }
      </div>
    )
  }

}