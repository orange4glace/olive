import { PropertyTypes, Property } from "internal/rendering/property/property";
import { EffectControlWidgetPropertyViewModel } from "window/view/effect-control/model/property/property-view-model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { ViewModelImpl } from "window/view/view-model";

export abstract class EffectControlWidgetPropertyViewModelImpl<T extends Property<PropertyTypes>>
    extends ViewModelImpl
    implements EffectControlWidgetPropertyViewModel<T> {

  readonly name: string;

  abstract get currentValue(): any;
  
  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;
  protected readonly property_: T;

  constructor(name: string, timeline: Timeline, trackItem: TrackItem, property: T) {
    super();
    this.name = name;
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;
    this.property_ = property;
  }

}
