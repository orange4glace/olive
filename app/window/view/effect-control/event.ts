import { EffectControlWidgetTrackItemViewModel } from "window/view/effect-control/model/track-item/track-item-view-model";
import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { EffectControlKeyframeViewModel } from "window/view/effect-control/model/property/keyframe-view-model";
import { StandardMouseEvent } from "base/view/mouseEvent";

export interface EffectControlWidgetKeyframeEvent {
  trackViewModel: EffectControlWidgetTrackItemViewModel<any>;
  propertyViewModel: EffectControlWidgetPropertyViewModel<any>;
  keyframeViewModel: EffectControlKeyframeViewModel<any>;
}

export interface EffectControlWidgetKeyframeUIEvent {
  propertyViewModel: EffectControlWidgetPropertyViewModel<any>;
  keyframeViewModel: EffectControlKeyframeViewModel<any>;
  e: StandardMouseEvent;
}