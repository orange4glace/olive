import { Keyframe } from "internal/rendering/property/keyframe";
import { PropertyTypes, Property } from "internal/rendering/property/property";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { Event, Emitter } from "base/common/event";
import { observable } from "window/app-mobx";

export interface EffectControlKeyframeViewModel<T extends PropertyTypes> extends ViewModel {

  readonly onFocused: Event<void>;
  readonly onBlured: Event<void>;

  readonly keyframe: Keyframe<T>;

  /*@observable*/ readonly focused: boolean;

  /*@observable*/ getTimeRelativeToTimeline(): number;
  focus(): void;
  blur(): void;

}

export class EffectControlKeyframeViewModelImpl<T extends PropertyTypes>
    extends ViewModelImpl
    implements EffectControlKeyframeViewModel<T> {

  private onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;
  private onBlured_: Emitter<void> = new Emitter();
  readonly onBlured: Event<void> = this.onBlured_.event;

  @observable focused: boolean;

  constructor(
      private readonly timeline_: Timeline,
      private readonly trackItem_: TrackItem,
      private readonly property_: Property<T>,
      readonly keyframe: Keyframe<T>) {
    super();
  }

  getTimeRelativeToTimeline(): number {
    return this.trackItem_.time.base + this.keyframe.timecode;
  }

  focus() {
    this.focused = true;
    this.onFocused_.fire();
  }

  blur() {
    this.focused = false;
    this.onBlured_.fire();
  }

}