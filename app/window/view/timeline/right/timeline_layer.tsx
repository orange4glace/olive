import * as React from 'react';
import app from 'internal/app';

import TimelineLayer from 'internal/timeline/timeline_layer';

import TimelineItemView from 'window/view/timeline/right/timeline_item';

const style = require('./timeline_layer.scss');

interface TimelineLayerViewProps {
  timelineUtil: any;
  timelineLayer: TimelineLayer;
  timelineItemMover: any;
}

@app.mobx.observer
class TimelineLayerView extends React.Component<TimelineLayerViewProps, {}> {

  timelineUtil: any;

  constructor(props: any) {
    super(props);

    this.timelineUtil = props.timelineUtil;
  }

  mouseDownHandler(e: React.MouseEvent) {
    app.timeline.selectTimelineLayer(this.props.timelineLayer);
    e.preventDefault();
  }

  dragEnterHandler(e: React.MouseEvent) {
    e.preventDefault();
  }

  dragOverHandler(e: React.MouseEvent) {
    e.preventDefault();
  }

  dropHandler(e: React.MouseEvent) {
    /*
    e.preventDefault();
    console.log(ResourceCommutor.getData());
    var startTimecode = this.timelineUtil.getTimecodeAtEvent(e);
    Timeline.AddResourceTimelineItem(this.props.layer.native, startTimecode, -1, ResourceCommutor.getData().native);
    e.stopPropagation();
    */
  }

  render() {
    const layer = this.props.timelineLayer;
    var selected = (app.timeline.selectedTimelineLayer == layer);
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
              <TimelineItemView key={item.id} timelineLayer={layer} timelineItem={item} st={st} timelineUtil={this.timelineUtil}/>
            )
          })
        }
      </div>
    )
  }

}

export default TimelineLayerView;