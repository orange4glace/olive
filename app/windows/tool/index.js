import React from 'react';

import Timeline from 'timeline';

import Rectangle from 'object/figure/rectangle';

class ToolWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  createObject() {
    var timelineLayer = Timeline.getSelectedTimelineLayer();
    var timelineItem = Timeline.createTimelineItem();
    timelineItem.setStartTimecode(Timeline.currentTimecode);
    timelineItem.setEndTimecode(Timeline.currentTimecode + 30);
    timelineItem.addObject(new Rectangle());
    timelineLayer.addTimelineItem(timelineItem);
  }

  render() {
    return (
      <div>
        <div onClick={e=>this.createObject()}>RECTANGLE</div>
      </div>
    );
  }

}

export default ToolWindow;