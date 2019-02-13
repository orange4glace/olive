import * as React from 'react';
import app from 'internal/app';

const style = require('./timeline_ruler.scss');

interface TimelineRulerProps {
  timelineUtil: any;
}

@app.mobx.observer
class TimelineRuler extends React.Component<TimelineRulerProps, {}> {

  timelineUtil: any;

  constructor(props: any) {
    super(props);
    this.timelineUtil = props.timelineUtil;
    
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: React.MouseEvent) {
    this.setCurrentTimecodeByEvent(e);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', 
        ()=>document.removeEventListener('mousemove', this.mouseMoveHandler));
  }

  mouseMoveHandler(e: MouseEvent) {
    this.setCurrentTimecodeByEvent(e);
  }

  setCurrentTimecodeByEvent(e: MouseEvent | React.MouseEvent) {
    var timecode = this.timelineUtil.getTimecodeAtEvent(e);
    console.log(timecode);
    app.timeline.setCurrentTimecode(timecode);
    // Timeline.DirtyVideo();
  }

  render() {
    return (
      <div className={style.component}
          onMouseDown={e=>this.mouseDownHandler(e)}>
      </div>
    )
  }

}

export default TimelineRuler;