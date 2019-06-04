import { EffectControlWidgetDrawingViewModel, EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { Drawing } from "internal/rendering/drawing/drawing";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { ViewModelImpl, ViewModelIdentifier } from "window/view/view-model";
import { EffectControlWidgetPropertyViewModelKeyframeEvent } from "window/view/effect-control/model/property/property-view-model";
import { Emitter, Event } from "base/common/event";

export abstract class EffectControlWidgetDrawingViewModelImpl<T extends Drawing>
    extends ViewModelImpl
    implements EffectControlWidgetDrawingViewModel<T> {

  protected onKeyframeFocused_: Emitter<EffectControlWidgetPropertyViewModelKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetPropertyViewModelKeyframeEvent> = this.onKeyframeFocused_.event;
  protected onKeyframeBlured_: Emitter<EffectControlWidgetPropertyViewModelKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetPropertyViewModelKeyframeEvent> = this.onKeyframeBlured_.event;

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;
  protected readonly drawing_: T;

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: T) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
    this.drawing_ = drawing;
  }

  abstract blurAllKeyframes(): void;

  dispose(): void {}

}

export abstract class EffectControlWidgetVideoDrawingViewModelImpl<T extends VideoDrawing>
    extends EffectControlWidgetDrawingViewModelImpl<T>
    implements EffectControlWidgetVideoDrawingViewModel<T> {

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: T) {
    super(timeline, trackItem, drawing);
  }

}