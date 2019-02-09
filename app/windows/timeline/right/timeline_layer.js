import React from 'react';

import Timeline from 'timeline';

import TimelineItem from 'windows/timeline/right/timeline_item';

import ResourceCommutor from 'windows/commutor/resource-commutor';

import style from './timeline_layer.scss';

@observer
class TimelineLayer extends React.Component {

  constructor(props) {
    super(props);

    this.timelineUtil = props.timelineUtil;
  }

  mouseDownHandler(e) {
    Timeline.selectTimelineLayer(this.props.timelineLayer);
    e.preventDefault();
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
    const layer = this.props.timelineLayer;
    var selected = (Timeline.selectedTimelineLayer == layer);
    return (
      <div className={`${style.component} timeline-layer ${selected && 'selected'}`}
        onMouseDown={e=>this.mouseDownHandler(e)}
        onDragEnter={e=>this.dragEnterHandler(e)}
        onDragOver={e=>this.dragOverHandler(e)}
        onDrop={e=>this.dropHandler(e)}> 
        {
          layer.timelineItems.map(item => {
            var left = this.timelineUtil.getPositionAtTimecode(item.startTimecode);
            var width = this.timelineUtil.getPositionAtTimecode(item.endTimecode - item.startTimecode + 1);
            var st = {
              left: left + '%',
              width: width + '%'
            };
            return (
              <TimelineItem key={item.id} timelineLayer={layer} timelineItem={item} st={st} timelineUtil={this.timelineUtil}/>
            )
          })
        }
      </div>
    )
  }

}

export default TimelineLayer;