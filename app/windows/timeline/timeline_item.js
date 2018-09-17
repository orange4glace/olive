import React from 'react';
import { observer } from 'mobx-react';

@observer
class TimelineItem extends React.Component {

  constructor(props) {
    super(props);
  }

  dragStartHandler(e) {
    this.props.timelineItemMover.setTarget(this.props.item);
  }

  render() {
    return (
      <div className='timeline-item'
          onDragStart={e=>this.dragStartHandler(e)}>
      </div>
    )
  }

}

export default Timeline;