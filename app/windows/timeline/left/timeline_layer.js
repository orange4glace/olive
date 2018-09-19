import React from 'react';

import style from './timeline_layer.scss';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  dragStartHandler(e) {
  }

  render() {
    const layer = this.props.layer;
    return (
      <div className={`${style.component} timeline-layer`}
          onDragStart={e=>this.dragStartHandler(e)}>
          <div className='name'>{layer.name}</div>
      </div>
    )
  }

}

export default TimelineLayer;