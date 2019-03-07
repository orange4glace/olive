import * as React from 'react';
import app from 'internal/app';

import { TimelineView as TimelineRightView } from 'window/view/timeline/right';

const style = require('./index.scss');

@app.mobx.observer
class TimelineWindow extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        { /* <TimelineLeftView/> */ }
        <TimelineRightView timeline={app.timeline}/>
      </div>
    )
  }

}

export default TimelineWindow;