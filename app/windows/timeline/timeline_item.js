import React from 'react';
import { observer } from 'mobx-react';

@observer
class TimelineItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='timeline-item'>
      </div>
    )
  }

}

export default Timeline;