import React from 'react';

import Timeline from 'timeline';

import style from './timeline_item.scss';

@observer
class TimelineItem extends React.Component {

  constructor(props) {
    super(props);
    this.timelineUtil = props.timelineUtil;
    
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.leftHandleMouseDownHandler = this.leftHandleMouseDownHandler.bind(this);
    this.leftHandleMouseMoveHandler = this.leftHandleMouseMoveHandler.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
  }

  dragStartHandler(e) {
    // this.props.timelineItemMover.setTarget(this.props.item);
  }

  mouseDownHandler(e) {
    this.props.timelineLayer.selectTimelineItem(this.props.timelineItem);
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
    if (this.props.timelineItem.start_timecode != timecode) {
      Timeline.MoveTimelineItem(this.props.layer.native, this.props.timelineItem.native, timecode, this.props.timelineItem.end_timecode);
    }
  }

  render() {
    return (
      <div className={style.component} style={this.props.st}
          onMouseDown={this.mouseDownHandler}
          onDragStart={this.dragStartHandler}>
          <div className='handle'>
            <div className='handle-left' onMouseDown={this.leftHandleMouseDownHandler}></div>
            <div className='handle-right'></div>
          </div>
      </div>
    )
  }

}

export default TimelineItem;