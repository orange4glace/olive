// import * as React from 'react';

// import EmptyView from 'window/view/empty-view';
// import TimelineView from 'window/view/timeline/view';
// import ResourceView from 'window/view/resource';
// import ToolView from 'window/view/tool';
// // import RendererDevView from 'window/view/renderer-dev';

// interface ViewPropsMap {
//   'Empty': null,
//   'Timeline': TimelineViewProps,
//   'Resource': null,
//   'Tool': null,
// }

// const ViewComponentMap: any = {
//   'Empty': {
//     name: 'EMPTY_VIEW',
//     title: 'Empty',
//     component: EmptyView,
//   },
//   'Timeline': {
//     name: 'TIMELINE_VIEW',
//     title: 'Timeline',
//     component: TimelineView
//   },
//   'Resource': {
//     name: 'RESOURCE_VIEW',
//     title: 'Resource',
//     component: ResourceView
//   },
//   'Tool': {
//     name: 'TOOL_VIEW',
//     title: 'Tool',
//     component: ToolView
//   },
// }

// export class WidgetFactory {
//   static create<V extends keyof ViewPropsMap>(name: V, props?: ViewPropsMap[V]): any {
//     const component = ViewComponentMap[name].component;
//     const element = React.createElement(component, props);
//     console.log(name, props, ViewComponentMap[name], element)
//     return {...ViewComponentMap[name], component: element};
//   }
// }