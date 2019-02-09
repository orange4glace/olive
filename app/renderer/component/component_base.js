import React from 'react';

import timeline from 'napi/timeline';

class ComponentBase extends React.Component {

  onMousedown(e) {
    timeline.SetCurrentTimelineItem(this.props.timelineItem)
  }

}

export default ComponentBase;