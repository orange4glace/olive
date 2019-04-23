import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { Vector2Property } from "internal/rendering/property/vector2-property";
import PostableVector2 from "util/postable_vector2";
import { EffectControlWidgetPropertyViewModelImpl } from "window/view/effect-control/model/property/property-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { computed } from "window/app-mobx";
import { ViewModel } from "window/view/view-model";

export interface EffectControlWidgetVector2PropertyViewModel
    extends EffectControlWidgetPropertyViewModel<Vector2Property> {

  /*@observable*/ readonly currentValue: PostableVector2;

  xValueChangeHandler(val: number): void;
  yValueChangeHandler(val: number): void;

}

@ViewModel('EffectControlWidgetVector2PropertyViewModel')
export class EffectControlWidgetVector2PropertyViewModelImpl
    extends EffectControlWidgetPropertyViewModelImpl<Vector2Property>
    implements EffectControlWidgetVector2PropertyViewModel {

  @computed get currentValue(): PostableVector2 {
    const property = this.property_;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    return property.getInterpolatedPropertyValue(timeOffset);
  }

  constructor(name: string, timeline: Timeline, trackItem: TrackItem, property: Vector2Property) {
    super(name, timeline, trackItem, property);
  }

  xValueChangeHandler(val: number): void {
    const property = this.property_;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const currentValue = property.getInterpolatedPropertyValue(timeOffset);
    const value = property.createValue(val, currentValue.y);
    property.addKeyframeAt(timeOffset, value);
  }

  yValueChangeHandler(val: number): void {
    const property = this.property_;
    const timeOffset = this.trackItem_.getTimeoffset(this.timeline_.currentTime);
    const currentValue = property.getInterpolatedPropertyValue(timeOffset);
    const value = property.createValue(currentValue.x, val);
    property.addKeyframeAt(timeOffset, value);
  }

  dispose(): void {}

}