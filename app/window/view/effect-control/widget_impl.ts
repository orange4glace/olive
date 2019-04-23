import * as React from 'react'
import { EffectControlWidget } from "window/view/effect-control/widget";
import { dispose, IDisposable } from "base/common/lifecycle";
import { observable } from "window/app-mobx";
import { TimelineWidgetEvent, TimelineWidgetFocusedTrackItemsChangedEvent } from "window/view/timeline/widget-event";
import { EffectControlWidgetModelImpl } from "window/view/effect-control/model/model-impl";
import { EffectControlWidgetViewProps, EffectControlWidgetView } from "window/view/effect-control/view/widget-view";
import { IObservableValue } from 'mobx';
import { EffectControlWidgetTrackItemViewFactory } from 'window/view/effect-control/view/form/track-item/track-item-view-factory';
import { EffectControlWidgetVideoTrackItemViewModelImpl } from 'window/view/effect-control/model/track-item/video-track-item-model';
import { EffectControlWidgetVideoTrackItemView } from 'window/view/effect-control/view/form/track-item/video-track-item-view';
import { EffectControlWidgetDrawingViewFactory } from 'window/view/effect-control/view/form/drawing/drawing-view-factory';
import { EffectControlWidgetRectangleDrawingViewModelImpl } from 'window/view/effect-control/model/drawing/rectangle-drawing-view-model';
import { EffectControlWidgetRectangleDrawingView } from 'window/view/effect-control/view/form/drawing/drawing-view';

EffectControlWidgetTrackItemViewFactory.register(
    EffectControlWidgetVideoTrackItemViewModelImpl.viewModelName, EffectControlWidgetVideoTrackItemView);
EffectControlWidgetDrawingViewFactory.register(
    EffectControlWidgetRectangleDrawingViewModelImpl.viewModelName, EffectControlWidgetRectangleDrawingView);

export class EffectControlWidgetImpl extends EffectControlWidget {

  get name(): string { return 'EffectControl'; }
  
  private model_: IObservableValue<EffectControlWidgetModelImpl>;
  get model(): EffectControlWidgetModelImpl { return this.model_.get(); }
  
  private toDispose_: Array<IDisposable> = [];

  constructor() {
    super();
    this.model_ = observable.box(null);
    this.toDispose_.push(TimelineWidgetEvent.onFocusedTrackItemsChanged(this.timelineWidgetFocusedTrackItemsChanged, this));
  }

  private timelineWidgetFocusedTrackItemsChanged(e: TimelineWidgetFocusedTrackItemsChangedEvent) {
    if (this.model_.get()) dispose(this.model_.get());
    if (e.timeline == null || e.trackItems.size == 0) return;
    
    this.model_.set(new EffectControlWidgetModelImpl(e.timeline, e.trackItems.values().next().value));
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
    dispose(this.toDispose_);
  }

}