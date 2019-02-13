import * as React from 'react';
import app from 'internal/app';

import TimelineLayer from 'internal/timeline/timeline_layer';

import TimelineItemView from 'window/view/timeline/left/timeline_item';

const style = require('./timeline_layer.scss');

interface TimelineLayerViewProps {
  key: number;
  layer: TimelineLayer;
}

@app.mobx.observer
class TimelineLayerView extends React.Component<TimelineLayerViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  dragStartHandler(e: React.MouseEvent) {
  }

  dragHandler(e: React.MouseEvent) {
  }

  render() {
    const layer = this.props.layer;
    return (
      <div className={`${style.component} timeline-layer`}
          onDrag={e=>this.dragStartHandler(e)}
          onDragStart={e=>this.dragStartHandler(e)}>
          <div className='name'>{layer.name}</div>
          <div className='timeline-item'>
            {
              layer.selectedTimelineItem &&
              <TimelineItemView timelineItem={layer.selectedTimelineItem}/>
            }
          </div>
      </div>
    )
  }

}

export default TimelineLayerView;