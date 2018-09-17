import React from 'react';
import { observer } from 'mobx-react';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  moveTimelineItem(timelineItem) {
    
  }

  render() {
    return (
      <React.Fragment>
        <div className='ruler'>
        </div>
        <div className='layers'>
        {
          app.iterateLayers(layer => {
            <div className='layer'>
            </div>
          })
        }
        </div>
      </React.Fragment>
    )
  }

}

export default Timeline;