import React from 'react';

import TimelineWindow from 'windows/timeline';
import ResourceWindow from 'windows/resource';
import RendererWindow from 'windows/renderer';

const windows = {
  "Timeline": <TimelineWindow/>,
  "Resource": <ResourceWindow/>,
  "Renderer": <RendererWindow/>,
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