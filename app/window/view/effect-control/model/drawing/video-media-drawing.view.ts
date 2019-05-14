import { EffectControlWidgetVideoDrawingViewModel } from "window/view/effect-control/model/drawing/drawing-view-model";
import { EffectControlWidgetTransformEffectViewModel, EffectControlWidgetTransformEffectViewModelImpl } from "window/view/effect-control/model/effect/transform-effect-view-model";
import { EffectControlWidgetVideoDrawingViewModelImpl } from "window/view/effect-control/model/drawing/drawing-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { declareViewModel } from "window/view/view-model";
import { VideoMediaDrawing } from "internal/rendering/drawing/video-media-drawing";

export const EffectControlWidgetVideoMediaDrawingViewModel =
    declareViewModel<EffectControlWidgetVideoMediaDrawingViewModel>('EffectControlWidgetVideoMediaDrawingViewModel')

export interface EffectControlWidgetVideoMediaDrawingViewModel
    extends EffectControlWidgetVideoDrawingViewModel<VideoMediaDrawing> {

  readonly transformEffectViewModel: EffectControlWidgetTransformEffectViewModel;

}

@EffectControlWidgetVideoMediaDrawingViewModel
export class EffectControlWidgetVideoMediaDrawingViewModelImpl 
    extends EffectControlWidgetVideoDrawingViewModelImpl<VideoMediaDrawing>
    implements EffectControlWidgetVideoMediaDrawingViewModel {

  readonly transformEffectViewModel: EffectControlWidgetTransformEffectViewModelImpl;

  constructor(timeline: Timeline, trackItem: TrackItem, drawing: VideoMediaDrawing) {
    super(timeline, trackItem, drawing);
    this.transformEffectViewModel = 
        new EffectControlWidgetTransformEffectViewModelImpl(timeline, trackItem, this.drawing_.transformEffect);

    this._register(this.transformEffectViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.transformEffectViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this))
  }

}