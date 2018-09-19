import React from 'react';
import { action, observable } from 'mobx';

import { timeline } from 'napi';
import TimelineLayer from "windows/timeline/right/timeline_layer";

import style from './index.scss';

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
class TimelineRight extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${style.component} timeline`}>
        <div className='ruler'>
        </div>
        <div className='layers'>
        {
          [...timeline.layers].map(([key, layer]) => {
            return (
              <TimelineLayer layer={layer} key={layer.id}
                            timelineItemMover={timelineItemMover}/>
            )
          })
        }
        </div>
      </div>
    )
  }

}

export default TimelineRight;