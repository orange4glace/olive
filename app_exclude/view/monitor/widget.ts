import * as React from 'react'
import { Widget } from "window/view/widget";
import { MonitorWidgetViewProps, MonitorWidgetView } from "window/view/monitor/view/widget-view";
import { observable } from 'window/app-mobx';
import { MonitorWidgetTimelineViewModel, MonitorWidgetTimelineViewModelImpl } from 'window/view/monitor/model/timeline-view-model';
import { Timeline } from 'internal/timeline/timeline';
import { dispose, IDisposable } from 'base/common/lifecycle';
import { IObservableValue } from 'mobx';
import { IGlobalTimelineService } from 'internal/timeline/global-timeline-service';
import { IWidgetProvider } from 'window/view/widget-service';
import { ServicesAccessor } from 'platform/instantiation/common/instantiation';
import { WidgetRegistry } from 'window/view/widget-registry';

export abstract class MonitorWidget extends Widget {

  /*@observbale*/ abstract get model(): MonitorWidgetTimelineViewModel;

}

export class MonitorWidgetImpl extends MonitorWidget {

  private currentTimeline_: Timeline;

  @observable private model_: IObservableValue<MonitorWidgetTimelineViewModelImpl>;
  get model(): MonitorWidgetTimelineViewModel { return this.model_.get(); };

  private toDispose_: IDisposable[] = [];

  constructor(
    @IGlobalTimelineService private readonly globalTimelineService_: IGlobalTimelineService) {
    super('Monitor');

    this.model_ = observable.box(null);
    
    this.timelineManagerTargetTimelineChangedHandler(globalTimelineService_.targetTimeline);
    this.toDispose_.push(globalTimelineService_.onTargetTimelineChanged(
        e => this.timelineManagerTargetTimelineChangedHandler(globalTimelineService_.targetTimeline), this));
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

interface InitializationData {
}

class WidgetProvider implements IWidgetProvider<MonitorWidget> {

  create(initializationData: InitializationData,
      services: ServicesAccessor): MonitorWidget {
    return new MonitorWidgetImpl(
        services.get(IGlobalTimelineService));
  }

  serialize(widget: MonitorWidgetImpl) {
    return widget.serialize();
  }

  deserialize(obj: any, services: ServicesAccessor): any {
    return null;
  }

}

WidgetRegistry.registerWidget('olive.MonitorWidget', new WidgetProvider());