import { Postable, postable } from 'worker-postable';
import { TreeMap, Pair, make_pair } from 'tstl';
import { EventEmitter2 } from 'eventemitter2';
import { action } from 'mobx';
import { Keyframe, SerializedKeyframe } from './keyframe';
import { Cloneable, clone } from 'base/olive/cloneable';
import { Event, Emitter } from 'base/common/event';
import { IConstructorSignature1, IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';
import { Constructor, MixinBase } from 'base/olive/mixin';
import { IKeyframeValue, KeyframeValue } from 'internal/rendering/property/base/keyframe-value';
import { WithPropertyBase } from 'internal/rendering/property/common/property';
import { WithDisposable, DisposableMap, newDisposableMap } from 'base/olive/lifecycle';
import { IDisposable, dispose } from 'base/common/lifecycle';

export enum PropertyEvent {
  KEYFRAME_ADDED = 'KEYFRAME_ADDED',
  KEYFRAME_REMOVED = 'KEYFRAME_REMOVED'
}


let __next_id = 0;

export interface SerializedProperty {
  type: string;
  keyframes: SerializedKeyframe[];
  animatable: boolean;
  animated: boolean;
  defaultKeyframe: SerializedKeyframe;
}

@Postable
export abstract class Property<T extends IKeyframeValue> extends WithDisposable(WithPropertyBase(MixinBase)) implements Cloneable {
  
  readonly id: number;
  readonly type: string;

  private readonly onKeyframeAdded_: Emitter<Keyframe<T>> = new Emitter();
  public readonly onKeyframeAdded: Event<Keyframe<T>> = this.onKeyframeAdded_.event;
  private readonly onKeyframeWillRemove_: Emitter<Keyframe<T>> = new Emitter();
  public readonly onKeyframeWillRemove: Event<Keyframe<T>> = this.onKeyframeWillRemove_.event;
  private readonly onDidRemoveKeyframe_: Emitter<Keyframe<T>> = new Emitter();
  public readonly onDidRemoveKeyframe: Event<Keyframe<T>> = this.onDidRemoveKeyframe_.event;
  private readonly onDidChangeKeyframeValue_: Emitter<Keyframe<T>> = new Emitter();
  public readonly onDidChangeKeyframeValue = this.onDidChangeKeyframeValue_.event;

  private readonly onDidChangeAnimated_: Emitter<boolean> = new Emitter();
  public readonly onDidChangeAnimated: Event<boolean> = this.onDidChangeAnimated_.event;

  //#region PropertyBase

  protected keyframes_: Set<Keyframe<T>>;
  public get keyframes(): ReadonlySet<Keyframe<T>> { return this.keyframes_; }
  protected defaultKeyframe_: Keyframe<T>;
  public get defaultKeyframe() { return this.defaultKeyframe_; }
  protected keyframeTreeMap_: TreeMap<number, Keyframe<T>>;
  private keyframeDisposables_: DisposableMap<Keyframe<T>, IDisposable[]>;

  //#endregion

  protected animatable_: boolean;
  public get animatable() { return this.animatable_; }

  constructor(type: string, defaultValue: T) {
    super();
    this.id = __next_id++;
    this.type = type;
    this.animated_ = false;
    this.keyframes_ = new Set<Keyframe<T>>();
    // this.keyframeTreeMap = new TreeMap<number, Keyframe<T>>();

    this.defaultKeyframe_ = new Keyframe<T>(0, defaultValue);
    this._register(this.defaultKeyframe_.onDidChangeValue(() => {
      this.onDidChangeKeyframeValue_.fire(this.defaultKeyframe_);
    }));

    this.keyframeDisposables_ = this._register(newDisposableMap<any, any>());
  }

  public getInterpolatedPropertyValue(timeoffset: number): T {
    return super.getInterpolatedPropertyValue(timeoffset);
  }

  @action
  addKeyframeAt(timeoffset: number, value: T): Keyframe<T> {
    if (!this.animated) {
      this.defaultKeyframe.setValue(value);
      return this.defaultKeyframe;
    }
    let lagacy = this.keyframeTreeMap_.find(timeoffset);
    if (!lagacy.equals(this.keyframeTreeMap_.end())) {
      lagacy.value.second.setValue(value);
      return lagacy.value.second;
    }
    let keyframe = new Keyframe<T>(timeoffset, value);
    this.doAddKeyframe(keyframe);
    return keyframe;
  }

  protected doAddKeyframe(keyframe: Keyframe<T>): Keyframe<T> {
    if (this.keyframes.has(keyframe)) return;
    this.keyframeTreeMap_.insert(new Pair(keyframe.timecode, keyframe));
    this.keyframes_.add(keyframe);
    this.registerKeyframeListeners(keyframe);
    this.onKeyframeAdded_.fire(keyframe);
    return keyframe;
  }

  private registerKeyframeListeners(keyframe: Keyframe<T>) {
    const disposables: IDisposable[] = [];
    disposables.push(keyframe.onDidChangeValue(() => {
      this.onDidChangeKeyframeValue_.fire(keyframe);
    }));
    this.keyframeDisposables_.set(keyframe, disposables);
  }

  @action
  removeKeyframe(keyframe: Keyframe<T>) {
    this.doRemoveKeyframe(keyframe);
  }

  private doRemoveKeyframe(keyframe: Keyframe<T>) {
    if (!this.keyframes.has(keyframe)) return;
    this.onKeyframeWillRemove_.fire(keyframe);
    this.keyframeTreeMap_.erase(keyframe.timecode);
    const disposables = this.keyframeDisposables_.get(keyframe);
    this.keyframeDisposables_.delete(keyframe);
    dispose(disposables);
    this.keyframes_.delete(keyframe);
    this.onDidRemoveKeyframe_.fire(keyframe);
  }

  @action
  setAnimated(value: boolean) {
    this.animated_ = value;
    this.onDidChangeAnimated_.fire(value);
  }

  abstract createValue(...args: any): T;
  abstract cloneValue(value: T): T;
  interpolate(lhs: T, rhs: T, t: number): T {
    return lhs.interpolate(lhs, rhs, t) as T;
  }

  clone(obj: Property<T>): Object {
    (obj as any).id = __next_id++;
    (obj as any).type = this.type;
    obj.animatable_ = this.animatable;
    obj.animated_ = this.animated;
    obj.keyframes_ = new Set();
    obj.keyframeTreeMap_ = new TreeMap();
    this.keyframes.forEach(keyframe => {
      const clonedValue = (typeof keyframe.value == 'object' ? clone(keyframe.value as any) : keyframe.value);
      obj.addKeyframeAt(keyframe.timecode, clonedValue);
    });
    obj.defaultKeyframe_ = clone<Keyframe<T>>(this.defaultKeyframe);
    return obj;
  }

  serialize(): SerializedProperty {
    let keyframes: SerializedKeyframe[] = [];
    this.keyframes.forEach(kf => {
      keyframes.push(kf.serialize());
    })
    return {
      type: this.type,
      keyframes: keyframes,
      animatable: this.animatable,
      animated: this.animated,
      defaultKeyframe: this.defaultKeyframe && this.defaultKeyframe.serialize()
    }
  }

  static deserialize<T extends KeyframeValue>(instantiationService: IInstantiationService, obj: SerializedProperty): Property<T> | null {
    let keyframes: Keyframe<T>[] = [];
    obj.keyframes.forEach(kf => {
      const keyframe = Keyframe.deserialize<T>(instantiationService, kf);
      if (keyframe) keyframes.push(keyframe);
    })
    let defaultKeyframe = Keyframe.deserialize<T>(instantiationService, obj.defaultKeyframe);
    if (!defaultKeyframe) {
      console.warn('Deserialize Property failed. (Default keyframe deserialize failed) ' + obj);
      return null;
    }
    const factory = Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).getFactory(obj.type);
    if (!factory) {
      console.warn('Deserialize Property failed. (Property factory not found) ' + obj);
      return null;
    }
    let property: Property<any>;
    try {
      property = new factory(defaultKeyframe.value);
    } catch (e) {
      console.warn('Deserialize Property failed. ' + e);
      return null;
    }
    keyframes.forEach(kf => property.doAddKeyframe(kf));
    return property;
  }
}

export class PropertyFactoryRegistry {

  static readonly ID = 'olive.property.PropertyFactoryRegistry'

  private factoryInstances: {
    [type: string]: IConstructorSignature1<IKeyframeValue, Property<any>>
  } = Object.create(null);

  registerFactory(type: string, ctor: IConstructorSignature1<IKeyframeValue, Property<any>>): void {
    const instance = ctor;
    this.factoryInstances[type] = instance;
  }

  getFactory(type: string): IConstructorSignature1<IKeyframeValue, Property<any>> | null {
    const factory = this.factoryInstances[type];
    if (!factory) console.warn('No Effect Factory found. ' + type);
    return factory;
  }

}
Registry.add(PropertyFactoryRegistry.ID, new PropertyFactoryRegistry());


// import { FactoryRegistry, IFactory, IFactoryRegistry } from "internal/common/factory-registry";
// import { Registry } from "platform/registry/common/platform";

// export interface IPropertyFactory extends IFactory<Property<any>, SerializedProperty> {}
// export class PropertyFactoryRegistry extends FactoryRegistry<IPropertyFactory> {
//   static readonly ID = 'olive.property.keyframe.PropertyFactoryRegistry'
// }








