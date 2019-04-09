import * as React from 'react';
import app from 'internal/app';
import { RendererUIView } from './ui/renderer-ui-view';

const style = require('./index.scss');

class RendererView extends React.Component<any, any> {

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
    const canvas: HTMLCanvasElement = app.canvas;
    this.containerRef.current.appendChild(canvas);
    
    this.props.layoutEventListener.resize = this.resizeHandler;
    this.resizeHandler();
  }

  resizeHandler() {
    var width = 1920;
    var height = 1080;
    var ratio = 1920 / 1080;
    var el = this.componentRef.current;
    var elWidth = el.clientWidth;
    var elHeight = el.clientHeight;
    var elRatio = elWidth / elHeight;

    if (ratio >= elRatio) {
      // width first
      this.setState({
        width: elWidth,
        height: elWidth / ratio
      });
    }
    else {
      // height first
      this.setState({
        width: elHeight * ratio,
        height: elHeight
      });
    }

  }

  render() {
    var containerStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    }
    return (
      <div className={style.component} ref={this.componentRef}>
        <div className='canvas-container' style={containerStyle} ref={this.containerRef}>
          <RendererUIView/>
        </div>
      </div>
    )
  }

}

export default RendererView;