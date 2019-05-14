import { Effect } from "internal/rendering/effect/effect";
import { VideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { ViewModel } from "window/view/view-model";
import { EffectControlWidgetPropertyViewModelKeyframeEvent } from "window/view/effect-control/model/property/property-view-model";
import { Event } from "base/common/event";

export interface EffectControlWidgetEffectViewModel<T extends Effect> extends ViewModel {

  readonly onKeyframeFocused: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;

}

export interface EffectControlWidgetVideoEffectViewModel<T extends VideoEffect> extends EffectControlWidgetEffectViewModel<T> {

}