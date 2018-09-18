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
    return (
      <div className={`${style.component} layers`}>
        <div className='toolbar'>
        </div>
        <div className='layers'>
          {
            _.mapValues(timeline.layers, layer => {
              console.log(layer.id);
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