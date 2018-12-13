import React from 'react';

import { Timeline } from 'napi';

import style from './timeline_ruler.scss';

@observer
class TimelineRuler extends React.Component {

  constructor(props) {
    super(props);
    this.timelineUtil = props.timelineUtil;
    
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e) {
    this.setCurrentTimecodeByEvent(e);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', 
        ()=>document.removeEventListener('mousemove', this.mouseMoveHandler));
  }

  mouseMoveHandler(e) {
    this.setCurrentTimecodeByEvent(e);
  }

  setCurrentTimecodeByEvent(e) {
    var timecode = this.timelineUtil.getTimecodeAtEvent(e);
    console.log(timecode);
    Timeline.SetCurrentTimecode(timecode);
    Timeline.DirtyVideo();
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