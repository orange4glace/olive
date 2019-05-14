import { EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { RectangleDrawing } from "internal/rendering/drawing/rectangle-drawing";
import { Vector2 } from "oliveutil/vector2";
import { EffectControlWidgetRectangleEffectViewModel, EffectControlWidgetRectangleEffectViewModelImpl } from "window/view/effect-control/model/effect/rectangle-effect-view-model";
import { EffectControlWidgetTransformEffectViewModel, EffectControlWidgetTransformEffectViewModelImpl } from "window/view/effect-control/model/effect/transform-effect-view-model";
import { EffectControlWidgetVideoDrawingViewModelImpl } from "window/view/effect-control/model/drawing/drawing-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { declareViewModel } from "window/view/view-model";

export const EffectControlWidgetRectangleDrawingViewModel =
    declareViewModel<EffectControlWidgetRectangleDrawingViewModel>('EffectControlWidgetRectangleDrawingViewModel')

export interface EffectControlWidgetRectangleDrawingViewModel
    extends EffectControlWidgetVideoDrawingViewModel<RectangleDrawing> {

  readonly transformEffectViewModel: EffectControlWidgetTransformEffectViewModel;
  readonly rectagleEffectViewModel: EffectControlWidgetRectangleEffectViewModel;

}

@EffectControlWidgetRectangleDrawingViewModel
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

    this._register(this.transformEffectViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.transformEffectViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this));
    this._register(this.rectagleEffectViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.rectagleEffectViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this));
  }

}