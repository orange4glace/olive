import React from 'react';

import { Timeline } from 'napi';

import TimelineItem from 'windows/timeline/right/timeline_item';

import ResourceCommutor from 'windows/commutor/resource-commutor';

import style from './timeline_layer.scss';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);

    this.timelineUtil = props.timelineUtil;
  }

  dragEnterHandler(e) {
    e.preventDefault();
  }

  dragOverHandler(e) {
    e.preventDefault();
  }

  dropHandler(e) {
    e.preventDefault();
    console.log(ResourceCommutor.getData());
    var startTimecode = this.timelineUtil.getTimecodeAtEvent(e);
    Timeline.AddResourceTimelineItem(this.props.layer.native, startTimecode, -1, ResourceCommutor.getData().native);
    e.stopPropagation();
  }

  render() {
    console.log("Render TimelineLayer");
    const layer = this.props.layer;
    return (
      <div className={`${style.component} timeline-layer`}
        onDragEnter={e=>this.dragEnterHandler(e)}
        onDragOver={e=>this.dragOverHandler(e)}
        onDrop={e=>this.dropHandler(e)}> 
        {
          [...layer.items].map(([key, item]) => {
            var left = this.timelineUtil.getPositionAtTimecode(item.start_timecode);
            var width = this.timelineUtil.getPositionAtTimecode(item.end_timecode - item.start_timecode + 1);
            var st = {
              left: left + '%',
              width: width + '%'
            };
            return (
              <TimelineItem key={item.id} layer={layer} item={item} st={st} timelineUtil={this.timelineUtil}/>
            )
          })
        }
      </div>
    )
  }

}

export default TimelineLayer;