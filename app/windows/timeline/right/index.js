import React from 'react';
import { action, observable } from 'mobx';

import { Timeline } from 'napi';
import TimelineLayer from "windows/timeline/right/timeline_layer";

import { mousePositionElement } from 'util/mouse_event'

import style from './index.scss';

class TimelineItemMover {
  @observable target = null;

  @action setTarget(target) {
    console.log("[TimelineItemMover] Set target", target);
    this.target = target;
  }

  @action move(layer, start_offset, end_offset) {
    if (this.target == null) return console.error("[TimelineItemMover] target is null")
    Timeline.MoveTimelineItem(layer, this.target, start_offset, end_offset);
  }
}

const timelineItemMover = new TimelineItemMover();

@observer
class TimelineRight extends React.Component {

  constructor(props) {
    super(props);
    this.timelineRef = React.createRef();

    this.state = {
      zoomRatio: 0.1
    };

    this.getTimecodeAtEvent = this.getTimecodeAtEvent.bind(this);
    this.getPositionAtTimecode = this.getPositionAtTimecode.bind(this);
  }

  getTimecodeAtEvent(e) {
    var timelineEl = this.timelineRef.current;
    var offset = mousePositionElement(e, timelineEl);
    offset.x += timelineEl.parentElement.scrollLeft;
    var percent = offset.x / timelineEl.offsetWidth;
    var timecode = percent * Timeline.totalTimecode;
    return Math.floor(timecode);
  }

  getPositionAtTimecode(timecode) {
    return timecode / Timeline.totalTimecode * 100;
  }

  render() {
    var timelineStyle = {
      width: (100 / this.state.zoomRatio) + '%'
    };
    return (
      <div className={`${style.component} timeline`}>
        <div className='inner' style={timelineStyle} ref={this.timelineRef}>
          <div className='ruler'>
          </div>
          <div className='layers'>
          {
            [...Timeline.layers].map(([key, layer]) => {
              return (
                <TimelineLayer layer={layer} key={layer.id}
                               getTimecodeAt={this.getTimecodeAtEvent}
                               getPositionAtTimecode={this.getPositionAtTimecode}
                               timelineItemMover={timelineItemMover}/>
              )
            })
          }
          </div>
        </div>
      </div>
    )
  }

}

export default TimelineRight;