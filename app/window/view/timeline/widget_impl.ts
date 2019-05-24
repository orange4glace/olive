import * as React from 'react'

import { Timeline, ITimeline } from "internal/timeline/timeline";
import { TimelineWidgetTimelineViewModelImpl } from 'window/view/timeline/model/timeline-view-model-impl';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { Widget } from 'window/view/widget';
import { Event, Emitter } from 'base/common/event';
import { IDisposable, dispose } from 'base/common/lifecycle';
import TimelineWidgetView, { TimelineWidgetViewProps } from 'window/view/timeline/widget-view';
import { TrackItem } from 'internal/timeline/track-item/track-item';
import { TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent, TimelineWidgetTimelineUIEvent } from 'window/view/timeline/event';
import { TimelineWidget } from 'window/view/timeline/widget';
import { TimelineWidgetViewOutgoingEvents } from 'window/view/timeline/view-outgoing-events';
import { TimelineWidgetCoreControllerImpl } from 'window/view/timeline/controller/core-controller_impl';
import { TimelineWidgetManipulatorControllerImpl } from 'window/view/timeline/controller/manipulator_impl';
import { TimelineWidgetTimelineViewModel } from 'window/view/timeline/model/timeline-view-model';
import { ITimelineWidgetRangeSelector, TimelineWidgetRangeSelector } from 'window/view/timeline/model/range-selector';
import { TimelineWidgetRangeSelectorController } from 'window/view/timeline/controller/range-selector-controller';
import { ServicesAccessor } from 'platform/instantiation/common/instantiation';
import { IHistoryService } from 'internal/history/history';
import { IProjectService } from 'internal/project/project-service';
import { IObservableValue } from 'mobx';
import { observable } from 'window/app-mobx';
import { IWidgetProvider } from 'window/view/widget-service';
import { WidgetRegistry } from 'window/view/widget-registry';
import { IResourceService } from 'internal/resource/resource-service';

interface Serial {
  timelineID: number;
}

export class TimelineWidgetImpl extends Widget implements TimelineWidget {

  private readonly onTrackItemMouseDown_: Emitter<TimelineWidgetTrackItemUIEvent> = new Emitter();
  readonly onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent> = this.onTrackItemMouseDown_.event;
  private readonly onTrackItemMouseMoveStart_: Emitter<TimelineWidgetTrackItemUIEvent> = new Emitter();
  readonly onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent> = this.onTrackItemMouseMoveStart_.event;
  private readonly onTrackItemThumbMouseMoveStart_: Emitter<TimelineWidgetTrackItemThumbUIEvent> = new Emitter();
  readonly onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent> = this.onTrackItemThumbMouseMoveStart_.event;
  private readonly onTrackItemThumbMouseDown_: Emitter<TimelineWidgetTrackItemThumbUIEvent> = new Emitter();
  readonly onTrackItemThumbMouseDown: Event<TimelineWidgetTrackItemThumbUIEvent> = this.onTrackItemThumbMouseDown_.event;
  private readonly onTrackMouseMove_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackMouseMove: Event<TimelineWidgetTrackUIEvent> = this.onTrackMouseMove_.event;
  private readonly onTrackDragOver_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDragOver: Event<TimelineWidgetTrackUIEvent> = this.onTrackDragOver_.event;
  private readonly onTrackDragLeave_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDragLeave: Event<TimelineWidgetTrackUIEvent> = this.onTrackDragLeave_.event;
  private readonly onTrackDrop_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDrop: Event<TimelineWidgetTrackUIEvent> = this.onTrackDrop_.event;
  private readonly onTimelineMouseDown_: Emitter<TimelineWidgetTimelineUIEvent> = new Emitter();
  readonly onTimelineMouseDown: Event<TimelineWidgetTimelineUIEvent> = this.onTimelineMouseDown_.event;

  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemBlured_.event;

  private onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;

  private timelineDisposables_: IDisposable[] = [];
  private toDispose_: IDisposable[] = [];

  private model_: IObservableValue<TimelineWidgetTimelineViewModel> = observable.box(null);
  public get model(): TimelineWidgetTimelineViewModel { return this.model_.get(); }

  readonly rangeSelector: ITimelineWidgetRangeSelector;

  private active_: boolean;

  constructor(
    public readonly timeline: Timeline,
    private readonly timelineWidgetService_: ITimelineWidgetService,
    @IHistoryService private readonly historyService_: IHistoryService,
    @IResourceService private readonly resourceService_: IResourceService) {
    super('TimelineWidget');
    
    this.active_ = false;

    this.rangeSelector = new TimelineWidgetRangeSelector();
    this.toDispose_.push(new TimelineWidgetCoreControllerImpl(this,
        historyService_, resourceService_));
    this.toDispose_.push(new TimelineWidgetManipulatorControllerImpl(this));
    this.toDispose_.push(new TimelineWidgetRangeSelectorController(this));

    this.setTimeline(timeline);
    timelineWidgetService_.addWidget(this);
  }

  setTimeline(timeline: ITimeline): void {
    this.timelineDisposables_ = dispose(this.timelineDisposables_);
    if (timeline == null) {
      this.model_.set(null);
      return;
    }
    this.model_.set(new TimelineWidgetTimelineViewModelImpl(timeline));
    this.timelineDisposables_.push(this.model.onTrackItemFocused(e => {
      this.onTrackItemFocused_.fire({
        timeline: this.timeline,
        track: e.trackViewModel.track,
        trackItem: e.trackItemViewModel.trackItem
      })
    }))
    this.timelineDisposables_.push(this.model.onTrackItemBlured(e => {
      this.onTrackItemBlured_.fire({
        timeline: this.timeline,
        track: e.trackViewModel.track,
        trackItem: e.trackItemViewModel.trackItem
      })
    }))
  }

  registerViewOutgoingEvents(outgoingEvents: TimelineWidgetViewOutgoingEvents): void {
    outgoingEvents.onTrackItemMouseDown = e => this.onTrackItemMouseDown_.fire(e);
    outgoingEvents.onTrackItemMouseMoveStart = e => this.onTrackItemMouseMoveStart_.fire(e);
    outgoingEvents.onTrackItemThumbMouseDown = e => this.onTrackItemThumbMouseDown_.fire(e);
    outgoingEvents.onTrackItemThumbMouseMoveStart = e => this.onTrackItemThumbMouseMoveStart_.fire(e);
    outgoingEvents.onTrackMouseMove = e => this.onTrackMouseMove_.fire(e);
    outgoingEvents.onTrackDragOver = e => this.onTrackDragOver_.fire(e);
    outgoingEvents.onTrackDragLeave = e => this.onTrackDragLeave_.fire(e);
    outgoingEvents.onTrackDrop = e => this.onTrackDrop_.fire(e);
    outgoingEvents.onTimelineMouseDown = e => this.onTimelineMouseDown_.fire(e);
  }

  getFocusedTrackItems(): ReadonlySet<TrackItem> {
    return this.model.getFocusedTrackItems();
  }

  focus() {
    this.onFocused_.fire();
  }

  blur() {

  }

  setActive(value: boolean) {
    this.active_ = value;
  }

  get name(): string {
    return 'Timeline';
  }

  render(): JSX.Element {
    const props: TimelineWidgetViewProps = {
      widget: this
    }
    return React.createElement(TimelineWidgetView, props);
  }

  serialize(): Serial {
    return {
      timelineID: this.timeline.id
    }
  }

  dispose(): void {
    this.timelineDisposables_ = dispose(this.timelineDisposables_);
    this.toDispose_ = dispose(this.toDispose_);
  }

}

interface InitializationData {
  timeline: Timeline;
}

class TimelineWidgetProvider implements IWidgetProvider<TimelineWidget> {

  create(initializationData: InitializationData,
      services: ServicesAccessor): TimelineWidget {
    const project = (<IProjectService>services.get(IProjectService)).getCurrentProject();;
    return new TimelineWidgetImpl(
        initializationData.timeline,
        services.get(ITimelineWidgetService),
        services.get(IHistoryService),
        project.resourceService);
  }

  serialize(widget: TimelineWidgetImpl) {
    return widget.serialize();
  }

  deserialize(obj: Serial, services: ServicesAccessor) {
    return this.create({
      timeline: (<IProjectService>services.get(IProjectService)).getCurrentProject().timelineService.getTimeline(obj.timelineID)
    }, services);
  }

}

WidgetRegistry.registerWidget('olive.TimelineWidget', new TimelineWidgetProvider());