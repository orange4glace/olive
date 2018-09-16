import React from 'react';
import { observer } from 'mobx-react';

import Layers from 'windows/timeline/header';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='component'>
        <Layers/>
        <Timeline/>
      </div>
    )
  }

}

export default Timeline;