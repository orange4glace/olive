import React from 'react';

import Timeline from 'timeline';

import TimelineLayer from "windows/timeline/left/timeline_layer";

import style from './index.scss';

@observer
class TimelineLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${style.component} layers`}>
        <div className='toolbar'>
          <div className='btn-add-layer' onClick={()=>Timeline.addTimelineLayer()}/>
        </div>
        <div className='layers'>
          {
            Timeline.timelineLayers.map(layer => {
              return (
                <TimelineLayer key={layer.id} layer={layer}/>
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default TimelineLeft;