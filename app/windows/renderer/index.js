import React from 'react';

import rendererCanvas from 'windows/renderer/canvas';

import style from './index.scss';

@observer
class RendererWindow extends React.Component {

  constructor(props) {
    super(props);

    this.componentRef = React.createRef();
  }

  componentDidMount() {
    // this.componentRef.current.appendChild(rendererCanvas.element);
  }

  render() {
    return (
      <div className={style.component} ref={this.componentRef}>

      </div>
    )
  }

}

export default RendererWindow;