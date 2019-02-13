import * as React from 'react';
import app from 'internal/app';

import TimelineLeftView from 'window/view/timeline/left';
import TimelineRightView from 'window/view/timeline/right';

const style = require('./index.scss');

@app.mobx.observer
class TimelineWindow extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <TimelineLeftView/>
        <TimelineRightView/>
      </div>
    )
  }

}

export default TimelineWindow;