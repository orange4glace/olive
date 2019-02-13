import * as React from 'react';
import app from 'internal/app';

import TimelineLayerView from 'window/view/timeline/left/timeline_layer';

const style = require('./index.scss');

@app.mobx.observer
class TimelineLeftView extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={`${style.component} layers`}>
        <div className='toolbar'>
          <div className='btn-add-layer' onClick={()=>app.timeline.addTimelineLayer()}/>
        </div>
        <div className='layers'>
          {
            app.timeline.timelineLayers.map(layer => {
              return (
                <TimelineLayerView key={layer.id} layer={layer}/>
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default TimelineLeftView;