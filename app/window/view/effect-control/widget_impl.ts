import * as React from 'react'
import { EffectControlWidget } from "window/view/effect-control/widget";
import { dispose, IDisposable } from "base/common/lifecycle";
import { observable } from "window/app-mobx";
import { EffectControlWidgetModelImpl } from "window/view/effect-control/model/model-impl";
import { EffectControlWidgetViewProps, EffectControlWidgetView } from "window/view/effect-control/view/widget-view";
import { IObservableValue } from 'mobx';
import { EffectControlWidgetTrackItemViewFactory } from 'window/view/effect-control/view/form/track-item/track-item-view-factory';
import { EffectControlWidgetVideoTrackItemViewModelImpl } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetVideoTrackItemView } from 'window/view/effect-control/view/form/track-item/video-track-item-view';
import { EffectControlWidgetDrawingViewFactory } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';
import { EffectControlWidgetRectangleDrawingViewModelImpl } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetRectangleDrawingView } from 'window/view/effect-control/view/form/drawing/drawing-view';
import { ITimelineWidgetService } from 'window/view/timeline/widget-service';
import { TimelineWidget } from 'window/view/timeline/widget';
import { TrackItem } from 'internal/timeline/track-item';
import { Timeline } from 'internal/timeline/timeline';

export class EffectControlWidgetImpl extends EffectControlWidget {

  private toDispose_: Array<IDisposable> = [];

  get name(): string { return 'EffectControl'; }
  
  private model_: IObservableValue<EffectControlWidgetModelImpl>;
  get model(): EffectControlWidgetModelImpl { return this.model_.get(); }
  
  private timelineWidgetDisposables_: IDisposable[] = [];

  constructor(timelineWidgetService: ITimelineWidgetService) {
    super();
    this.model_ = observable.box(null);

    this.activateTimelineWidgetChangedHandler(timelineWidgetService.activeWidget);
    this.toDispose_.push(timelineWidgetService.onActiveWidgetChanged(this.activateTimelineWidgetChangedHandler, this));
  }

  private activateTimelineWidgetChangedHandler(timelineWidget: TimelineWidget) {
    const timeline = timelineWidget.timeline;
    this.timelineWidgetDisposables_ = dispose(this.timelineWidgetDisposables_);
    this.model_.set(dispose(this.model_.get()));
    this.timelineWidgetDisposables_.push(timelineWidget.onTrackItemFocused(e => {
      const focuses = timelineWidget.getFocusedTrackItems();
      this.updateViewModel(timeline, focuses);
    }), this);
    this.timelineWidgetDisposables_.push(timelineWidget.onTrackItemBlured(e => {
      const focuses = timelineWidget.getFocusedTrackItems();
      this.updateViewModel(timeline, focuses);
    }), this);
  }

  private updateViewModel(timeline: Timeline, set: ReadonlySet<TrackItem>) {
    if (set.size != 1) 
      return this.model_.set(dispose(this.model_.get()));
    const trackItem = set.values().next().value;
    this.model_.set(new EffectControlWidgetModelImpl(timeline, trackItem));
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