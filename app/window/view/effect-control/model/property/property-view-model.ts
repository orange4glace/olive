import { Property, PropertyTypes } from "internal/rendering/property/property";
import { ViewModel } from "window/view/view-model";
import { EffectControlKeyframeViewModel } from "window/view/effect-control/model/property/keyframe-view-model";
import { Event } from "base/common/event";

export interface EffectControlWidgetPropertyViewModelKeyframeEvent {
  propertyViewModel: EffectControlWidgetPropertyViewModel<any>;
  keyframeViewModel: EffectControlKeyframeViewModel<any>;
}

export interface EffectControlWidgetPropertyViewModel<T extends PropertyTypes>
    extends ViewModel {

  readonly onKeyframeFocused: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;
  readonly onKeyframeBlured: Event<EffectControlWidgetPropertyViewModelKeyframeEvent>;

  readonly property: Property<T>;
  readonly name: string;

  /*@observable*/ readonly currentValue: any;

  readonly keyframeViewModels: ReadonlySet<EffectControlKeyframeViewModel<T>>;

  blurAllKeyframes(): void;
  toggleAnimated(): void;

}