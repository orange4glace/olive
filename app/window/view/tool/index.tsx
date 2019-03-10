import * as React from 'react';

import app from 'internal/app';

class ToolView extends React.Component {

  constructor(props: any) {
    super(props);
  }

  createObject() {
    /*
    var timelineLayer = app.timeline.getSelectedTimelineLayer();
    var timelineItem = app.timeline.createTimelineItem();
    timelineItem.setStartTimecode(app.timeline.currentTimecode);
    timelineItem.setEndTimecode(app.timeline.currentTimecode + 30);
    timelineItem.addObject(new Rectangle());
    timelineLayer.addTimelineItem(timelineItem);
    */
  }

  render() {
    return (
      <div>
        <div onClick={e=>this.createObject()}>RECTANGLE</div>
      </div>
    );
  }

}

export default ToolView;