import React from 'react';

import ResourceCommutor from 'windows/commutor/resource-commutor';
import TimelineItem from 'windows/timeline/left/timeline_item';

import style from './timeline_layer.scss';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  dragStartHandler(e) {
  }

  dragHandler(e) {
  }

  render() {
    const layer = this.props.layer;
    return (
      <div className={`${style.component} timeline-layer`}
          onDrag={e=>this.dragStartHandler(e)}
          onDragStart={e=>this.dragStartHandler(e)}>
          <div className='name'>{layer.name}</div>
          <div className='timeline-item'>
            {
              layer.selectedTimelineItem &&
              <TimelineItem timelineItem={layer.selectedTimelineItem}/>
            }
          </div>
      </div>
    )
  }

}

export default TimelineLayer;