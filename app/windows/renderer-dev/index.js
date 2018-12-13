import React from 'react';
import Renderer from 'renderer/canvas';

@observer
class RendererDevWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Renderer/>
    )
  }

}

export default RendererDevWindow;