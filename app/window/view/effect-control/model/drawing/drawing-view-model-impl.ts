import { EffectControlWidgetDrawingViewModel, EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { Drawing } from "internal/rendering/drawing/drawing";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { VideoDrawing } from "internal/rendering/drawing/video-drawing";
import { ViewModelImpl } from "window/view/view-model";

export class EffectControlWidgetDrawingViewModelImpl<T extends Drawing>
    extends ViewModelImpl
    implements EffectControlWidgetDrawingViewModel<T> {

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;
  protected readonly drawing_: T;

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: T) {
    super();
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
    this.drawing_ = drawing;
  }

  dispose(): void {}

}

export abstract class EffectControlWidgetVideoDrawingViewModelImpl<T extends VideoDrawing>
    extends EffectControlWidgetDrawingViewModelImpl<T>
    implements EffectControlWidgetVideoDrawingViewModel<T> {

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: T) {
    super(timeline, trackItem, drawing);
  }

}