import { Effect } from "internal/rendering/effect/effect";
import { VideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetEffectViewModel<T extends Effect> extends ViewModel {

}

export interface EffectControlWidgetVideoEffectViewModel<T extends VideoEffect> extends EffectControlWidgetEffectViewModel<T> {

}