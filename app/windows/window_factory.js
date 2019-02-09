import React from 'react';

import EmptyWindow from 'windows/empty_window';
import TimelineWindow from 'windows/timeline';
import ResourceWindow from 'windows/resource';
import RendererWindow from 'windows/renderer';
import RendererDevWindow from 'windows/renderer-dev';
import PropertyWindow from 'windows/property';
import ToolWindow from 'windows/tool';

const windows = {
  'Empty': {
    name: 'WINDOW_EMPTY',
    title: 'Empty',
    component: <EmptyWindow/>,
  },
  'Timeline': {
    name: 'WINDOW_TIMELINE',
    title: 'Timeline',
    component: <TimelineWindow/>,
  },
  'Resource': {
    name: 'WINDOW_RESOURCE',
    title: 'Resource',
    component: <ResourceWindow/>,
  },
  'Renderer': {
    name: 'WINDOW_RENDERER',
    title: 'Renderer',
    component: <RendererWindow/>,
  },
  'RendererDev': {
    name: 'WINDOW_RENDERER_DEV',
    title: 'Renderer-dev',
    component: <RendererDevWindow/>
  },
  'Property': {
    name: 'WINDOW_PROPERTY',
    title: 'Property',
    component: <PropertyWindow/>
  },
  'Tool': {
    name: 'WINDOW_TOOL',
    title: 'Tool',
    component: <ToolWindow/>
  },
}

const factory = {
  create: str => {
    if (!(str in windows)) return console.error('[WindowFactory] No such window ', str);
    return windows[str];
  }
}

export default factory;