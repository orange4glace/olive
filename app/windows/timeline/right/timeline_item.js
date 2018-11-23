import React from 'react';

import style from './timeline_item.scss';

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
      <div className={style.component} style={this.props.st}
          onDragStart={e=>this.dragStartHandler(e)}>
      </div>
    )
  }

}

export default TimelineItem;