import React from 'react';

import { Timeline } from 'napi';

import style from './timeline_item.scss';

@observer
class TimelineItem extends React.Component {

  constructor(props) {
    super(props);
    this.timelineUtil = props.timelineUtil;
    
    this.leftHandleMouseMoveHandler = this.leftHandleMouseMoveHandler.bind(this);
  }

  dragStartHandler(e) {
    // this.props.timelineItemMover.setTarget(this.props.item);
  }

  leftHandleMouseDownHandler(e) {
    this.setState({
      leftHandle: true
    })
    document.addEventListener('mousemove', this.leftHandleMouseMoveHandler);
    document.addEventListener('mouseup',
        ()=>document.removeEventListener('mousemove', this.leftHandleMouseMoveHandler));
  }

  leftHandleMouseMoveHandler(e) {
    var timecode = this.timelineUtil.getTimecodeAtEvent(e);
    if (this.props.item.start_timecode != timecode) {
      Timeline.MoveTimelineItem(this.props.layer.native, this.props.item.native, timecode, this.props.item.end_timecode);
    }
  }

  render() {
    console.log("render");
    return (
      <div className={style.component} style={this.props.st}
          onDragStart={e=>this.dragStartHandler(e)}>
          <div className='handle'>
            <div className='handle-left' onMouseDown={e=>this.leftHandleMouseDownHandler(e)}></div>
            <div className='handle-right'></div>
          </div>
      </div>
    )
  }

}

export default TimelineItem;