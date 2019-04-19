import * as React from 'react'

import { TimelineWidget, TimelineWidgetFocusedWidgetChangedEvent } from "window/view/timeline/widget";
import { Emitter } from "base/common/event";
import { Timeline } from "internal/timeline/timeline";
import TimelineWidgetView, { TimelineWidgetViewProps } from "window/view/timeline/view";
import { TimelineWidgetModelImpl } from 'window/view/timeline/model/model_impl';
import { TimelineWidgetController } from 'window/view/timeline/controller/controller';
import { TimelineWidgetControllerImpl } from 'window/view/timeline/controller/controller_impl';

const TimelineWidgetStaticImpl = (TimelineWidget as any);
TimelineWidgetStaticImpl.onFocusedViewChanged_ = new Emitter<TimelineWidgetFocusedWidgetChangedEvent>();
TimelineWidgetStaticImpl.onFocusedViewChanged = TimelineWidgetStaticImpl.onFocusedViewChanged_.event;
TimelineWidgetStaticImpl.setFocusedTimelineView = function(widget: TimelineWidget) {
  TimelineWidgetStaticImpl.focusedWidget = widget;
  TimelineWidgetStaticImpl.onFocusedViewChanged_.fire({
    widget: widget
  })
}

export class TimelineWidgetImpl extends TimelineWidget {
  
  private timeline_: Timeline;
  private component_: JSX.Element;

  constructor(timeline: Timeline) {
    super();
    this.timeline_ = timeline;

    const props: TimelineWidgetViewProps = {
      widget: this
    };
    this.model = new TimelineWidgetModelImpl(timeline);
    this.controller = new TimelineWidgetControllerImpl(this.model);
    this.component_ = React.createElement(TimelineWidgetView, props);
  }

  get name(): string {
    return 'Timeline';
  }

  render(): JSX.Element {
    return this.component_;
  }

  serialize(): Object { 
    return null;
  }


  dispose(): void {

  }

}