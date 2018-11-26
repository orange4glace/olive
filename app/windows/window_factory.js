import React from 'react';

import EmptyWindow from 'windows/empty_window';
import TimelineWindow from 'windows/timeline';
import ResourceWindow from 'windows/resource';
import RendererWindow from 'windows/renderer';

const windows = {
  "Empty": <EmptyWindow/>,
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