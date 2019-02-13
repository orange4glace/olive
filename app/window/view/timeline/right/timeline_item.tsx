import * as React from 'react';
import app from 'internal/app';

import TimelineLayer from 'internal/timeline/timeline_layer';
import TimelineItem from 'internal/timeline/timeline_item';

const style = require('./timeline_item.scss');

interface TimelineItemViewProps {
  key: number;
  st: any;
  timelineUtil: any;
  timelineLayer: TimelineLayer;
  timelineItem: TimelineItem;
}

@app.mobx.observer
class TimelineItemView extends React.Component<TimelineItemViewProps, {}> {

  timelineUtil: any;

  constructor(props: any) {
    super(props);
    this.timelineUtil = props.timelineUtil;
    
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.leftHandleMouseDownHandler = this.leftHandleMouseDownHandler.bind(this);
    this.leftHandleMouseMoveHandler = this.leftHandleMouseMoveHandler.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
  }

  dragStartHandler(e: React.MouseEvent) {
    // this.props.timelineItemMover.setTarget(this.props.item);
  }

  mouseDownHandler(e: React.MouseEvent) {
    this.props.timelineLayer.selectTimelineItem(this.props.timelineItem);
  }

  leftHandleMouseDownHandler(e: React.MouseEvent) {
    this.setState({
      leftHandle: true
    })
    document.addEventListener('mousemove', this.leftHandleMouseMoveHandler);
    document.addEventListener('mouseup',
        ()=>document.removeEventListener('mousemove', this.leftHandleMouseMoveHandler));
  }

  leftHandleMouseMoveHandler(e: MouseEvent) {
    var timecode = this.timelineUtil.getTimecodeAtEvent(e);
    if (this.props.timelineItem.startTimecode != timecode) {
      app.timeline.moveTimelineItem(this.props.timelineLayer, this.props.timelineItem, timecode, this.props.timelineItem.endTimecode);
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

export default TimelineItemView;