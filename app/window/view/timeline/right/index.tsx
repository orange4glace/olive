import * as React from 'react';
import app from 'internal/app';

import TimelineLayer from 'window/view/timeline/right/timeline_layer';
import TimelineRuler from 'window/view/timeline/right/timeline_ruler';

import MouseEvent from 'util/mouse_event'

const style = require('./index.scss');

class TimelineItemMover {
  @app.mobx.observable target: any = null;

  @app.mobx.action setTarget(target: any) {
    console.log("[TimelineItemMover] Set target", target);
    this.target = target;
  }

  @app.mobx.action move(layer: any, start_offset: number, end_offset: number) {
    if (this.target == null) return console.error("[TimelineItemMover] target is null")
    app.timeline.moveTimelineItem(layer, this.target, start_offset, end_offset);
  }
}

const timelineItemMover = new TimelineItemMover();

interface TimelineRightState {
  zoomRatio: number;
}

@app.mobx.observer
class TimelineRight extends React.Component<{}, TimelineRightState> {

  timelineRef: any;
  timelineUtil: any;

  constructor(props: any) {
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

  timecodeBarRef(el: HTMLElement) {
    app.mobx.autorun(() => {
      var timecode = app.timeline.currentTimecode;
      var position = this.getPositionAtTimecode(timecode);
      el.style.left = position + '%';
    })
  }

  getTimecodeAtEvent(e: MouseEvent) {
    var timelineEl = this.timelineRef.current;
    var offset = MouseEvent.mousePositionElement(e, timelineEl);
    offset.x += timelineEl.parentElement.scrollLeft;
    var percent = offset.x / timelineEl.offsetWidth;
    var timecode = percent * app.timeline.totalTimecode;
    return Math.floor(timecode);
  }

  getPositionAtTimecode(timecode: number) {
    return timecode / app.timeline.totalTimecode * 100;
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
                app.timeline.timelineLayers.map(layer => {
                  return (
                    <TimelineLayer timelineLayer={layer} key={layer.id}
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