import React from 'react';

import TimelineWindow from 'windows/timeline';
import ResourceWindow from 'windows/resource';

const windows = {
  "Timeline": <TimelineWindow/>,
  "Resource": <ResourceWindow/>,
}

const factory = {
  create: str => {
    if (!(str in windows)) return console.error("[WindowFactory] No such window ", str);
    return React.cloneElement(windows[str], {
      key: str + Math.random()
    });
  }
}

export default factory;