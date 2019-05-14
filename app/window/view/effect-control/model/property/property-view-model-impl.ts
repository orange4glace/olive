import { PropertyTypes, Property } from "internal/rendering/property/property";
import { EffectControlWidgetPropertyViewModel, EffectControlWidgetPropertyViewModelKeyframeEvent } from "window/view/effect-control/model/property/property-view-model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { ViewModelImpl } from "window/view/view-model";
import { Keyframe } from "internal/rendering/property/keyframe";
import { EffectControlKeyframeViewModel, EffectControlKeyframeViewModelImpl } from "window/view/effect-control/model/property/keyframe-view-model";
import { observable } from "window/app-mobx";
import { Emitter, Event } from "base/common/event";
import { IDisposable, dispose } from "base/common/lifecycle";

export abstract class EffectControlWidgetPropertyViewModelImpl<T extends PropertyTypes>
    extends ViewModelImpl
    implements EffectControlWidgetPropertyViewModel<T> {

  private onKeyframeFocused_: Emitter<EffectControlWidgetPropertyViewModelKeyframeEvent> = new Emitter();
  readonly onKeyframeFocused: Event<EffectControlWidgetPropertyViewModelKeyframeEvent> = this.onKeyframeFocused_.event;
  private onKeyframeBlured_: Emitter<EffectControlWidgetPropertyViewModelKeyframeEvent> = new Emitter();
  readonly onKeyframeBlured: Event<EffectControlWidgetPropertyViewModelKeyframeEvent> = this.onKeyframeBlured_.event;
    
  readonly property: Property<T>;
  readonly name: string;

  abstract get currentValue(): any;

  @observable readonly keyframeViewModels: Set<EffectControlKeyframeViewModel<T>>;
  private keyframeViewModelMap_: Map<Keyframe<T>, EffectControlKeyframeViewModel<T>>;
  private keyframeViewModelDisposables_: Map<EffectControlKeyframeViewModel<T>, IDisposable[]>;
  
  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;


  constructor(name: string, timeline: Timeline, trackItem: TrackItem, property: Property<T>) {
    super();
    this.property = property;
    this.name = name;
    this.timeline_ = timeline;
    this.trackItem_ = trackItem;

    this.keyframeViewModels = new Set();
    this.keyframeViewModelMap_ = new Map();
    this.keyframeViewModelDisposables_ = new Map();

    property.keyframes.forEach(keyframe => this.onKeyframeAddedHandler(keyframe));
    this._register(property.onKeyframeAdded(this.onKeyframeAddedHandler, this));
    this._register(property.onKeyframeWillRemove(this.onKeyframeWillRemoveHandler, this));
  }

  private onKeyframeAddedHandler(keyframe: Keyframe<T>) {
    const keyframeVM = new EffectControlKeyframeViewModelImpl(this.timeline_, this.trackItem_, this.property, keyframe);
    let disposables: IDisposable[] = [];
    keyframeVM.onFocused(e => this.onKeyframeFocused_.fire({
      propertyViewModel: this,
      keyframeViewModel: keyframeVM
    }), this, disposables);
    keyframeVM.onBlured(e => this.onKeyframeBlured_.fire({
      propertyViewModel: this,
      keyframeViewModel: keyframeVM
    }), this, disposables);
    this.keyframeViewModels.add(keyframeVM);
    this.keyframeViewModelMap_.set(keyframe, keyframeVM);
    this.keyframeViewModelDisposables_.set(keyframeVM, disposables);
  }

  private onKeyframeWillRemoveHandler(keyframe: Keyframe<T>) {
    const vm = this.keyframeViewModelMap_.get(keyframe);
    this.keyframeViewModels.delete(vm);
    this.keyframeViewModelMap_.delete(keyframe);
    dispose(this.keyframeViewModelDisposables_.get(vm));
    this.keyframeViewModelDisposables_.delete(vm);
    dispose(vm);
  }

  toggleAnimated() {
    const property = this.property;
    const time = this.timeline_.currentTime - this.trackItem_.time.start + this.trackItem_.time.base;
    property.setAnimated(!property.animated);
    property.addKeyframeAt(time, property.cloneValue(property.defaultKeyframe.value));
  }

}
