import React from 'react';
import { observer } from 'mobx-react';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  dragEnterHandler(e) {
    console.log("Drag enter", e);
  }

  dragOverHandler(e) {
    console.log("Drag over", e);
  }

  render() {
    return (
      <div className='timeline-layer'>
      </div>
    )
  }

}

export default TimelineLayer;