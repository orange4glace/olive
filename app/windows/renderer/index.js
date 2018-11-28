import React from 'react';

import rendererCanvas from 'windows/renderer/canvas';

import style from './index.scss';

@observer
class RendererWindow extends React.Component {

  constructor(props) {
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
    this.containerRef.current.appendChild(rendererCanvas.element);
    
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

        </div>
      </div>
    )
  }

}

export default RendererWindow;