import * as React from 'react'
import { Widget } from "window/view/widget";
import { MonitorWidgetViewProps, MonitorWidgetView } from "window/view/monitor/view/widget-view";
import { observable } from 'window/app-mobx';
import { TimelineManager } from 'internal/timeline/timeline-manager';
import { MonitorWidgetTimelineViewModel, MonitorWidgetTimelineViewModelImpl } from 'window/view/monitor/model/timeline-view-model';
import { Timeline } from 'internal/timeline/timeline';
import { dispose, IDisposable } from 'base/common/lifecycle';
import { IObservableValue } from 'mobx';

export abstract class MonitorWidget extends Widget {

  /*@observbale*/ abstract get model(): MonitorWidgetTimelineViewModel;

}

export class MonitorWidgetImpl extends MonitorWidget {

  private currentTimeline_: Timeline;

  @observable private model_: IObservableValue<MonitorWidgetTimelineViewModelImpl>;
  get model(): MonitorWidgetTimelineViewModel { return this.model_.get(); };

  private toDispose_: IDisposable[] = [];

  constructor(timelineManager: TimelineManager) {
    super('Monitor');

    this.model_ = observable.box(null);
    
    this.timelineManagerTargetTimelineChangedHandler(timelineManager.targetTimeline);
    this.toDispose_.push(timelineManager.onTargetTimelineChanged(
        e => this.timelineManagerTargetTimelineChangedHandler(e.timeline), this));
  }

  private timelineManagerTargetTimelineChangedHandler(timeline: Timeline) {
    if (this.currentTimeline_ == timeline) return;
    if (this.model_.get()) dispose(this.model_.get());
    this.currentTimeline_ = timeline;
    if (timeline == null) this.model_.set(null);
    else this.model_.set(new MonitorWidgetTimelineViewModelImpl(timeline));
  }

  render(): JSX.Element {
    const props: MonitorWidgetViewProps = {
      widget: this
    }
    return React.createElement(MonitorWidgetView, props);
  }

  serialize(): Object {
    return null;
  }

  dispose(): void {
    dispose(this.toDispose_);
  }

}