import React from 'react';
import { observer } from 'mobx-react';

import TimelineItem from 'timeline/timeline-item.js';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const timeline = this.props.timeline;
    return (
      <div>
        {timeline.title}
      </div>
    )
  }

}

export default Timeline;