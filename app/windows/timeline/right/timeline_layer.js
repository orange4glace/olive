import React from 'react';

import { Timeline } from 'napi';

import TimelineItem from 'windows/timeline/right/timeline_item';

import ResourceCommutor from 'windows/commutor/resource-commutor';

import style from './timeline_layer.scss';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);
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
    var startTimecode = this.props.getTimecodeAt(e);
    Timeline.AddResourceTimelineItem(this.props.layer.native, startTimecode, -1, ResourceCommutor.getData().native);
    e.stopPropagation();
  }

  render() {
    const layer = this.props.layer;
    return (
      <div className={`${style.component} timeline-layer`}
        onDragEnter={e=>this.dragEnterHandler(e)}
        onDragOver={e=>this.dragOverHandler(e)}
        onDrop={e=>this.dropHandler(e)}> 
        {
          [...layer.items].map(([key, item]) => {
            var left = this.props.getPositionAtTimecode(item.start_timecode);
            var width = this.props.getPositionAtTimecode(item.end_timecode - item.start_timecode + 1);
            var st = {
              left: left + '%',
              width: width + '%'
            };
            return (
              <TimelineItem key={item.id} item={item} st={st}/>
            )
          })
        }
      </div>
    )
  }

}

export default TimelineLayer;