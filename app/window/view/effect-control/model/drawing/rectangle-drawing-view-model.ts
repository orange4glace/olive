import { EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { Vector2 } from "oliveutil/vector2";
import { EffectControlWidgetRectangleEffectViewModel, EffectControlWidgetRectangleEffectViewModelImpl } from "window/view/effect-control/model/effect/rectangle-effect-view-model";
import { EffectControlWidgetTransformEffectViewModel, EffectControlWidgetTransformEffectViewModelImpl } from "window/view/effect-control/model/effect/transform-effect-view-model";
import { EffectControlWidgetVideoDrawingViewModelImpl } from "window/view/effect-control/model/drawing/drawing-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetRectangleDrawingViewModel
    extends EffectControlWidgetVideoDrawingViewModel<RectangleDrawing> {

  readonly transformEffectViewModel: EffectControlWidgetTransformEffectViewModel;
  readonly rectagleEffectViewModel: EffectControlWidgetRectangleEffectViewModel;

  /*@observable*/ getControlPointCoordinates(): [Vector2, Vector2, Vector2, Vector2];

}

@ViewModel('EffectControlWidgetRectangleDrawingViewModel')
export class EffectControlWidgetRectangleDrawingViewModelImpl 
    extends EffectControlWidgetVideoDrawingViewModelImpl<RectangleDrawing>
    implements EffectControlWidgetRectangleDrawingViewModel {

  readonly transformEffectViewModel: EffectControlWidgetTransformEffectViewModelImpl;
  readonly rectagleEffectViewModel: EffectControlWidgetRectangleEffectViewModelImpl;

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: RectangleDrawing) {
    super(timeline, trackItem, drawing);
    this.transformEffectViewModel = 
        new EffectControlWidgetTransformEffectViewModelImpl(timeline, trackItem, this.drawing_.transformEffect);
    this.rectagleEffectViewModel = 
        new EffectControlWidgetRectangleEffectViewModelImpl(timeline, trackItem, this.drawing_.rectangleEffect);
  }

  getControlPointCoordinates(): [Vector2, Vector2, Vector2, Vector2] {
    return null;
  }

}