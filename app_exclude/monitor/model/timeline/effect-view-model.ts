import { Effect } from "internal/rendering/effect/effect";
import { VideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { TransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { EffectControlWidgetVector2PropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { MaskEffect } from "internal/rendering/effect/video-effect/mask-effect";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";

export interface MonitorWidgetEffectViewModel<T extends Effect> extends MonitorWidgetSelectableViewModel {

  readonly effect: T;

}

export interface MonitorWidgetVideoEffectViewModel<T extends VideoEffect> extends MonitorWidgetEffectViewModel<T> {

}

export interface MonitorWidgetMaskEffectViewModel
    extends MonitorWidgetVideoEffectViewModel<MaskEffect> {

}