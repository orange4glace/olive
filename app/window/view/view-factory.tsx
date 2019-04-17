import * as React from 'react';

import EmptyView from 'window/view/empty-view';
import TimelineView from 'window/view/timeline';
import ResourceView from 'window/view/resource';
import ToolView from 'window/view/tool';
import RendererView from 'window/view/renderer';
// import RendererDevView from 'window/view/renderer-dev';

import app from 'internal/app'

const views: { [index: string] : any } = {
  'Empty': {
    name: 'WINDOW_EMPTY',
    title: 'Empty',
    component: <EmptyView/>,
  },
  'Timeline': {
    name: 'WINDOW_TIMELINE',
    title: 'Timeline',
    component: <TimelineView/>,
  },
  'Resource': {
    name: 'WINDOW_RESOURCE',
    title: 'Resource',
    component: <ResourceView resourceManager={app.resource}/>,
  },
  'Renderer': {
    name: 'WINDOW_RENDERER',
    title: 'Renderer',
    component: <RendererView/>,
  },
  /*
  'RendererDev': {
    name: 'WINDOW_RENDERER_DEV',
    title: 'Renderer-dev',
    component: <RendererDevView/>
  },
  */
  'Property': {
    name: 'WINDOW_PROPERTY',
    title: 'Property',
    component: <PropertyView/>
  },
  'Tool': {
    name: 'WINDOW_TOOL',
    title: 'Tool',
    component: <ToolView/>
  },
}

const factory = {
  create: (str: string) => {
    if (!(str in views)) return console.error('[ViewFactory] No such View ', str);
    return views[str];
  }
}

export default factory;