import { TransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { EffectControlWidgetVideoEffectViewModel } from "window/view/effect-control/model/effect/effect-view-model";
import { EffectControlWidgetVideoEffectViewModelImpl } from "window/view/effect-control/model/effect/effect-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { EffectControlWidgetVector2PropertyViewModel, EffectControlWidgetVector2PropertyViewModelImpl } from "window/view/effect-control/model/property/vector2-property-view-model";
import { ViewModel, declareViewModel } from "window/view/view-model";

export const EffectControlWidgetTransformEffectViewModel =
    declareViewModel<EffectControlWidgetTransformEffectViewModel>('EffectControlWidgetTransformEffectViewModel')

export interface EffectControlWidgetTransformEffectViewModel
    extends EffectControlWidgetVideoEffectViewModel<TransformEffect> {

  readonly positionPropertyViewModel: EffectControlWidgetVector2PropertyViewModel;
  readonly scalePropertyViewModel: EffectControlWidgetVector2PropertyViewModel;

}

@EffectControlWidgetTransformEffectViewModel
export class EffectControlWidgetTransformEffectViewModelImpl
    extends EffectControlWidgetVideoEffectViewModelImpl<TransformEffect>
    implements EffectControlWidgetTransformEffectViewModel {

  readonly positionPropertyViewModel: EffectControlWidgetVector2PropertyViewModel;
  readonly scalePropertyViewModel: EffectControlWidgetVector2PropertyViewModel;

  constructor(timeline: Timeline, trackItem: TrackItem, effect: TransformEffect) {
    super(timeline, trackItem, effect);
    this.positionPropertyViewModel = new EffectControlWidgetVector2PropertyViewModelImpl(
        'Position', timeline, trackItem, effect.position)
    this.scalePropertyViewModel = new EffectControlWidgetVector2PropertyViewModelImpl(
        'Scale', timeline, trackItem, effect.scale)

    this._register(this.positionPropertyViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.positionPropertyViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this));
    this._register(this.scalePropertyViewModel.onKeyframeFocused(e => this.onKeyframeFocused_.fire(e), this));
    this._register(this.scalePropertyViewModel.onKeyframeBlured(e => this.onKeyframeBlured_.fire(e), this));
  }

}