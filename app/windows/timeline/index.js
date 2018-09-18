import React from 'react';
import { observer } from 'mobx-react';

import TimelineLeft from 'windows/timeline/left';
import TimelineRight from 'windows/timeline/right';

import style from './index.scss';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <TimelineLeft/>
        <TimelineRight/>
      </div>
    )
  }

}

export default Timeline;