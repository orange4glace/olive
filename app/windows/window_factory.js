import React from 'react';

import EmptyWindow from 'windows/empty_window';
import TimelineWindow from 'windows/timeline';
import ResourceWindow from 'windows/resource';
import RendererWindow from 'windows/renderer';

const windows = {
  "Empty": {
    name: "WINDOW_EMPTY",
    component: <EmptyWindow/>,
  },
  "Timeline": {
    name: "WINDOW_TIMELINE",
    component: <TimelineWindow/>,
  },
  "Resource": {
    name: "WINDOW_RESOURCE",
    component: <ResourceWindow/>,
  },
  "Renderer": {
    name: "WINDOW_RENDERER",
    component: <RendererWindow/>,
  },
}

const factory = {
  create: str => {
    if (!(str in windows)) return console.error("[WindowFactory] No such window ", str);
    return windows[str];
  }
}

export default factory;