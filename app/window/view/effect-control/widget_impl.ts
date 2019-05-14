import * as React from 'react'
import { EffectControlWidget } from "window/view/effect-control/widget";
import { dispose, IDisposable } from "base/common/lifecycle";
import { observable } from "window/app-mobx";
import { EffectControlWidgetModelImpl } from "window/view/effect-control/model/model-impl";
import { EffectControlWidgetViewProps, EffectControlWidgetView } from "window/view/effect-control/view/widget-view";
import { IObservableValue } from 'mobx';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { TimelineWidget } from 'window/view/timeline/widget';
import { TrackItem } from 'internal/timeline/track-item';
import { Timeline } from 'internal/timeline/timeline';
import { Event, Emitter } from 'base/common/event';
import { EffectControlWidgetKeyframeEvent, EffectControlWidgetKeyframeUIEvent } from 'window/view/effect-control/event';
import { Widget } from 'window/view/widget';
import { EffectControlViewOutgoingEvents } from 'window/view/effect-control/view-outgoing-events';
import { EffectControlManipulatorController } from 'window/view/effect-control/controller/manipulator';

export class EffectControlWidgetImpl extends Widget implements EffectControlWidget {

  private toDispose_: Array<IDisposable> = [];

  private onKeyframeMouseDown_: Emitter<EffectControlWidgetKeyframeUIEvent> = new Emitter();
  readonly onKeyframeMouseDown: Event<EffectControlWidgetKeyframeUIEvent> = this.onKeyframeMouseDown_.event;
  private onKeyframeMouseMoveStart_: Emitter<EffectControlWidgetKeyframeUIEvent> = new Emitter();
  readonly onKeyframeMouseMoveStart: Event<EffectControlWidgetKeyframeUIEvent> = this.onKeyframeMouseMoveStart_.event;

  private onKeyframeFocused_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeFocused_.event;
  private onKeyframeBlured_: Emitter<EffectControlWidgetKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetKeyframeEvent> = this.onKeyframeBlured_.event;

  get name(): string { return 'EffectControl'; }
  
  private model_: IObservableValue<EffectControlWidgetModelImpl>;
  get model(): EffectControlWidgetModelImpl { return this.model_.get(); }
  
  private timelineWidgetDisposables_: IDisposable[] = [];
  private modelDisposables_: IDisposable[] = [];

  constructor(timelineWidgetService: ITimelineWidgetService) {
    super('EffectControl');
    this.model_ = observable.box(null);

    this.activateTimelineWidgetChangedHandler(timelineWidgetService.activeWidget);
    this.toDispose_.push(timelineWidgetService.onActiveWidgetChanged(this.activateTimelineWidgetChangedHandler, this));

    this.toDispose_.push(new EffectControlManipulatorController(this));
  }

  private activateTimelineWidgetChangedHandler(timelineWidget: TimelineWidget) {
    const timeline = timelineWidget.timeline;
    this.timelineWidgetDisposables_ = dispose(this.timelineWidgetDisposables_);
    this.model_.set(dispose(this.model_.get()));

    // TimelineWidget Event Listener
    timelineWidget.onTrackItemFocused(e => {
      const focuses = timelineWidget.getFocusedTrackItems();
      this.updateViewModel(timeline, focuses);
    }, this, this.timelineWidgetDisposables_);
    timelineWidget.onTrackItemBlured(e => {
      const focuses = timelineWidget.getFocusedTrackItems();
      this.updateViewModel(timeline, focuses);
    }, this, this.timelineWidgetDisposables_);
  }

  private updateViewModel(timeline: Timeline, set: ReadonlySet<TrackItem>) {
    dispose(this.model_.get());
    dispose(this.modelDisposables_);
    if (set.size != 1) return;
    const trackItem = set.values().next().value;
    const model = new EffectControlWidgetModelImpl(timeline, trackItem);
    model.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this, this.modelDisposables_);
    model.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this, this.modelDisposables_);
    this.model_.set(model);
  }

  registerViewOutgoingEvents(outgoingEvents: EffectControlViewOutgoingEvents) {
    outgoingEvents.onKeyframeMouseDown = e => this.onKeyframeMouseDown_.fire(e);
    outgoingEvents.onKeyframeMouseMoveStart = e => this.onKeyframeMouseMoveStart_.fire(e);
  }

  render(): JSX.Element {
    const props: EffectControlWidgetViewProps = {
      widget: this
    }
    return React.createElement(EffectControlWidgetView, props);
  }

  serialize(): Object {
    return null;
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}