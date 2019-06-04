// import * as ReactDOM from 'react-dom'
// import * as React from 'react'
// import { MenuRegistry, MenuId } from "platform/actions/common/actions";
// import { IWidgetView } from "window/workbench/browser/parts/editor/widget-view";
// import { Event, Emitter } from "base/common/event";
// import { Orientation } from "base/browser/ui/sash/sash";

// export class TimelineWidgetView implements IWidgetView {

//   element: HTMLElement;

//   readonly onDidChange_: Emitter<{width: number, height: number}> = new Emitter();
//   readonly onDidChange: Event<{width: number, height: number}> = this.onDidChange_.event;

//   readonly minimumWidth = 10;
//   readonly minimumHeight = 10;
//   readonly maximumWidth = Infinity;
//   readonly maximumHeight = Infinity;

//   constructor() {
//     this.element = document.createElement('div');

//     ReactDOM.render(<TimelineWidgetViewComponent/>, this.element);
//   }

//   toJSON() {
//     return {
//       name: 'olive.TimelineWidget'
//     }
//   }

// 	layout(size: number, orientation: Orientation): void {
// 	}

// }

// class TimelineWidgetViewComponent extends React.Component {
//   render() {
//     return <div>TIMELINE WIDGET</div>
//   }
// }

// MenuRegistry.appendMenuItem(MenuId.MenubarViewMenu, {
//   group: '3_views',
//   command: {
//     id: 'olive.widget.timeline',
//     title: 'Timeline'
//   }
// })