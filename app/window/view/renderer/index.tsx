import * as React from 'react';
import app from 'internal/app';
import { observer, computed } from 'window/app-mobx';
import { RendererViewController } from './controller/renderer-view-controller';
import TimelineViewState from '../timeline/controller/state';
import { RendererUIView } from './ui/renderer-ui-view';

const style = require('./index.scss');

@observer
export class RendererView extends React.Component<{}, {}> {

  @computed get rendererViewController(): RendererViewController {
    return TimelineViewState.focusedTimelineViewController ?
      new RendererViewController(TimelineViewState.focusedTimelineViewController) :  null;
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.rendererViewController) {
      return (
        <RendererContentViewWrapper rendererViewController={this.rendererViewController}/>
      )
    }
    else {
      return <div>NO TrackItem Selected</div>
    }
  }

}

interface RendererContentViewProps {
  rendererViewController: RendererViewController;
}

class RendererContentViewWrapper extends React.PureComponent<RendererContentViewProps, {}> {

  render() {
    return (
      <RendererContentView {...this.props}/>
    )
  }

}

class RendererContentView extends React.Component<RendererContentViewProps, any> {

  componentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.componentRef = React.createRef();
    this.containerRef = React.createRef();
    this.resizeHandler = this.resizeHandler.bind(this);
    this.state = {
      width: 0,
      height : 0,
    }
  }

  componentDidMount() {
    const controller = this.props.rendererViewController;
    controller.containerRef =  this.containerRef;

    const canvas: HTMLCanvasElement = app.canvas;
    this.containerRef.current.appendChild(canvas);
    
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler();
  }

  resizeHandler() {
    const controller = this.props.rendererViewController;
    var width = app.project.sequence.screenWidth;
    var height = app.project.sequence.screenHeight;
    var ratio = width / height;
    var el = this.componentRef.current;
    var elWidth = Math.min(width, el.clientWidth);
    var elHeight = Math.min(height, el.clientHeight);
    var elRatio = elWidth / elHeight;
    console.log(elWidth, elHeight)
    let w, h;
    if (ratio >= elRatio) {
      // width first
      w = elWidth;
      h = elWidth / ratio;
    }
    else {
      // height first
      w = elHeight * ratio;
      h = elHeight;
    }
    controller.setViewSize(w, h);
    this.setState({
      width: w,
      height: h
    })
  }

  render() {
    var containerStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    }
    return (
      <div className={style.component} ref={this.componentRef}>
        <div className='canvas-container' style={containerStyle} ref={this.containerRef}>
          <RendererUIView {...this.props}/>
        </div>
      </div>
    )
  }

}

export default RendererView;