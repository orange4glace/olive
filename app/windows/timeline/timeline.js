import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { timeline } from 'napi';
import TimelineLayer from "windows/timeline/timeline_layer";

class TimelineItemMover {
  @observable target = null;

  @action setTarget(target) {
    console.log("[TimelineItemMover] Set target", target);
    this.target = target;
  }

  @action move(layer, start_offset, end_offset) {
    if (this.target == null) return console.error("[TimelineItemMover] target is null")
    timeline.MoveTimelineItem(layer, this.target, start_offset, end_offset);
  }
}

const timelineItemMover = new TimelineItemMover();

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className='ruler'>
        </div>
        <div className='layers'>
        {
          timeline.iterateLayers(layer => {
            <TimelineLayer layer={layer}
                           timelineItemMover={timelineItemMover}/>
          })
        }
        </div>
      </React.Fragment>
    )
  }

}

export default Timeline;