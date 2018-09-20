import React from 'react';

import Timeline from 'windows/timeline';

const windows = {
  "Timeline": <Timeline/>,
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