import { EffectControlWidgetVideoEffectViewModel } from "window/view/effect-control/model/effect/effect-view-model";
import { RectangleEffect } from "internal/rendering/effect/video-effect/rectangle-effect";
import { EffectControlWidgetVector4PropertyViewModel, EffectControlWidgetVector4PropertyViewModelImpl } from "window/view/effect-control/model/property/vector4-property-view-model";
import { EffectControlWidgetVideoEffectViewModelImpl } from "window/view/effect-control/model/effect/effect-view-model-impl";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetRectangleEffectViewModel
    extends EffectControlWidgetVideoEffectViewModel<RectangleEffect> {

  readonly sizePropertyViewModel: EffectControlWidgetVector4PropertyViewModel;

}

@ViewModel('EffectControlWidgetRectangleEffectViewModel')
export class EffectControlWidgetRectangleEffectViewModelImpl 
    extends EffectControlWidgetVideoEffectViewModelImpl<RectangleEffect> 
    implements EffectControlWidgetRectangleEffectViewModel{

  readonly sizePropertyViewModel: EffectControlWidgetVector4PropertyViewModelImpl;

  constructor(timeline: Timeline, trackItem: TrackItem, effect: RectangleEffect) {
    super(timeline, trackItem, effect);
    this.sizePropertyViewModel =
        new EffectControlWidgetVector4PropertyViewModelImpl('Size', timeline, trackItem, this.effect_.size);
  }

}