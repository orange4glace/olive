import * as React from 'react'

import { Timeline } from "internal/timeline/timeline";
import { TimelineWidgetTimelineViewModelImpl, TimelineWidgetTimelineViewModel } from 'window/view/timeline/model/timeline-view-model';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { Widget } from 'window/view/widget';
import { Event, Emitter } from 'base/common/event';
import { IDisposable, dispose } from 'base/common/lifecycle';
import TimelineWidgetView, { TimelineWidgetViewProps } from 'window/view/timeline/widget-view';
import { TrackItem } from 'internal/timeline/track-item';
import { TimelineWidgetTrackItemUIEvent, TimelineWidgetTrackUIEvent, TimelineWidgetTrackItemEvent, TimelineWidgetTrackItemThumbUIEvent } from 'window/view/timeline/event';
import { TimelineWidget } from 'window/view/timeline/widget';
import { TimelineWidgetViewOutgoingEvents } from 'window/view/timeline/view-outgoing-events';
import { TimelineWidgetCoreControllerImpl } from 'window/view/timeline/controller/core-controller_impl';
import { TimelineWidgetManipulatorControllerImpl } from 'window/view/timeline/controller/manipulator_impl';

export class TimelineWidgetImpl extends Widget implements TimelineWidget {

  private readonly onTrackItemMouseDown_: Emitter<TimelineWidgetTrackItemUIEvent> = new Emitter();
  readonly onTrackItemMouseDown: Event<TimelineWidgetTrackItemUIEvent> = this.onTrackItemMouseDown_.event;
  private readonly onTrackItemMouseMoveStart_: Emitter<TimelineWidgetTrackItemUIEvent> = new Emitter();
  readonly onTrackItemMouseMoveStart: Event<TimelineWidgetTrackItemUIEvent> = this.onTrackItemMouseMoveStart_.event;
  private readonly onTrackItemThumbMouseMoveStart_: Emitter<TimelineWidgetTrackItemThumbUIEvent> = new Emitter();
  readonly onTrackItemThumbMouseMoveStart: Event<TimelineWidgetTrackItemThumbUIEvent> = this.onTrackItemThumbMouseMoveStart_.event;
  private readonly onTrackMouseMove_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackMouseMove: Event<TimelineWidgetTrackUIEvent> = this.onTrackMouseMove_.event;
  private readonly onTrackDragOver_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDragOver: Event<TimelineWidgetTrackUIEvent> = this.onTrackDragOver_.event;
  private readonly onTrackDragLeave_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDragLeave: Event<TimelineWidgetTrackUIEvent> = this.onTrackDragLeave_.event;
  private readonly onTrackDrop_: Emitter<TimelineWidgetTrackUIEvent> = new Emitter();
  readonly onTrackDrop: Event<TimelineWidgetTrackUIEvent> = this.onTrackDrop_.event;

  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemBlured_.event;

  private toDispose_: IDisposable[] = [];

  readonly model: TimelineWidgetTimelineViewModel;

  private onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;

  private active_: boolean;

  constructor(
    private readonly timelineWidgetService_: ITimelineWidgetService,
    readonly timeline: Timeline) {
    super();

    this.active_ = false;

    this.model = new TimelineWidgetTimelineViewModelImpl(timeline);

    this.toDispose_.push(this.model.onTrackItemFocused(e => {
      this.onTrackItemFocused_.fire({
        timeline: this.timeline,
        track: e.trackViewModel.track,
        trackItem: e.trackItemViewModel.trackItem
      })
    }))
    this.toDispose_.push(this.model.onTrackItemBlured(e => {
      this.onTrackItemBlured_.fire({
        timeline: this.timeline,
        track: e.trackViewModel.track,
        trackItem: e.trackItemViewModel.trackItem
      })
    }))

    this.toDispose_.push(new TimelineWidgetCoreControllerImpl(this));
    this.toDispose_.push(new TimelineWidgetManipulatorControllerImpl(this));

    timelineWidgetService_.addWidget(this);
  }

  registerViewOutgoingEvents(outgoingEvents: TimelineWidgetViewOutgoingEvents): void {
    outgoingEvents.onTrackItemMouseDown = e => this.onTrackItemMouseDown_.fire(e);
    outgoingEvents.onTrackItemMouseMoveStart = e => this.onTrackItemMouseMoveStart_.fire(e);
    outgoingEvents.onTrackItemThumbMouseMoveStart = e => this.onTrackItemThumbMouseMoveStart_.fire(e);
    outgoingEvents.onTrackMouseMove = e => this.onTrackMouseMove_.fire(e);
    outgoingEvents.onTrackDragOver = e => this.onTrackDragOver_.fire(e);
    outgoingEvents.onTrackDragLeave = e => this.onTrackDragLeave_.fire(e);
    outgoingEvents.onTrackDrop = e => this.onTrackDrop_.fire(e);
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

  serialize(): Object { 
    return null;
  }


  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}