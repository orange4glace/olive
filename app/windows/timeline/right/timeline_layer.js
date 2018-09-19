import React from 'react';

import style from './timeline_layer.scss';

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
      <div className={`${style.component} timeline-layer`}> 
      </div>
    )
  }

}

export default TimelineLayer;