import React from 'react';

import { Timeline } from 'napi';
import TimelineLayer from 'windows/timeline/right/timeline_layer';
import TimelineRuler from 'windows/timeline/right/timeline_ruler';

import { mousePositionElement } from 'util/mouse_event'

import style from './index.scss';

class TimelineItemMover {
  @mobx.observable target = null;

  @mobx.action setTarget(target) {
    console.log("[TimelineItemMover] Set target", target);
    this.target = target;
  }

  @mobx.action move(layer, start_offset, end_offset) {
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
      zoomRatio: 1
    };

    this.getTimecodeAtEvent = this.getTimecodeAtEvent.bind(this);
    this.getPositionAtTimecode = this.getPositionAtTimecode.bind(this);
    this.timecodeBarRef = this.timecodeBarRef.bind(this);

    this.timelineUtil = {
      getTimecodeAtEvent: this.getTimecodeAtEvent,
      getPositionAtTimecode: this.getPositionAtTimecode
    };
  }

  timecodeBarRef(el) {
    mobx.autorun(() => {
      var timecode = Timeline.current_timecode;
      var position = this.getPositionAtTimecode(timecode);
      el.style.left = position + '%';
    })
  }

  getTimecodeAtEvent(e) {
    var timelineEl = this.timelineRef.current;
    var offset = mousePositionElement(e, timelineEl);
    offset.x += timelineEl.parentElement.scrollLeft;
    var percent = offset.x / timelineEl.offsetWidth;
    var timecode = percent * Timeline.total_timecode;
    return Math.floor(timecode);
  }

  getPositionAtTimecode(timecode) {
    return timecode / Timeline.total_timecode * 100;
  }

  render() {
    var timelineStyle = {
      width: (100 / this.state.zoomRatio) + '%'
    };
    return (
      <div className={`${style.component} timeline`}>
        <div className='inner'>
          <div className='ruler'><TimelineRuler timelineUtil={this.timelineUtil}/></div>
          <div className='content-wrap'>
            <div className='content' style={timelineStyle} ref={this.timelineRef}>
              <div className='timecode-bar' ref={this.timecodeBarRef}><div className='timecode-bar-head'></div></div>
              <div className='layers'>
              {
                [...Timeline.layers].map(([key, layer]) => {
                  return (
                    <TimelineLayer layer={layer} key={layer.id}
                                  timelineUtil={this.timelineUtil}
                                  timelineItemMover={timelineItemMover}/>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default TimelineRight;