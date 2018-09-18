import React from 'react';
import { observer } from 'mobx-react';

import { timeline } from 'napi';

import style from './index.scss';

@observer
class TimelineLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(_.values(timeline.layers));
    return (
      <div className={`${style.component} layers`}>
        <div className='toolbar'>
          <button onClick={()=>timeline.AddTimelineLayer()}>ADD</button>
        </div>
        <div className='layers'>
          {
            _.values(timeline.layers).map(layer => {
              console.log("layer",layer);
              return (
                <div className='layer'>
                  {layer.id}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default TimelineLeft;