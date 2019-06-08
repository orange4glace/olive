import { Postable, postable } from 'worker-postable';
import { TreeMap, Pair, make_pair } from 'tstl';
import { EventEmitter2 } from 'eventemitter2';
import { action } from 'mobx';
import { KeyframeBase, Keyframe, SerializedKeyframe, IKeyframeValue } from './keyframe';
import { Cloneable, clone } from 'base/olive/cloneable';
import { Event, Emitter } from 'base/common/event';
import { IConstructorSignature1, IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';

export enum PropertyEvent {
  KEYFRAME_ADDED = 'KEYFRAME_ADDED',
  KEYFRAME_REMOVED = 'KEYFRAME_REMOVED'
}

export interface PropertyBase<T extends IKeyframeValue> {
  animatable: boolean;
  animated: boolean;
  keyframes: Set<KeyframeBase<T>>;
  defaultKeyframe: KeyframeBase<T>;

  interpolate(lhs: T, rhs: T, t: number): T;
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
export abstract class Property<T extends IKeyframeValue> implements PropertyBase<T>, Cloneable {
  
  readonly id: number;
  readonly type: string;

  onKeyframeAdded_: Emitter<Keyframe<T>> = new Emitter();
  onKeyframeAdded: Event<Keyframe<T>> = this.onKeyframeAdded_.event;
  onKeyframeWillRemove_: Emitter<Keyframe<T>> = new Emitter();
  onKeyframeWillRemove: Event<Keyframe<T>> = this.onKeyframeWillRemove_.event;

  @postable animatable: boolean;
  @postable animated: boolean;
  @postable keyframes: Set<Keyframe<T>>;
  @postable defaultKeyframe: Keyframe<T>;

  keyframeTreeMap: TreeMap<number, Keyframe<T>>;

  constructor(type: string, defaultValue: T) {
    this.id = __next_id++;
    this.type = type;
    this.animated = false;
    this.keyframes = new Set<Keyframe<T>>();
    this.keyframeTreeMap = new TreeMap<number, Keyframe<T>>();
    this.defaultKeyframe = new Keyframe<T>(0, defaultValue);
  }

  abstract createValue(...args: any): T;
  abstract cloneValue(value: T): T;
  abstract interpolate(lhs: T, rhs: T, t: number): T;

  getInterpolatedPropertyValue(timeoffset: number): T {
    if (!this.animated) return this.defaultKeyframe.value;
    // touch getter to observe change
    this.keyframes.values();
    let next = this.keyframeTreeMap.lower_bound(timeoffset);
    if (next.equals(this.keyframeTreeMap.end())) {
      if (this.keyframeTreeMap.size() == 0)
        return this.defaultKeyframe.value;
      return next.prev().value.second.value;
    }
    if (next.equals(this.keyframeTreeMap.begin()))
      return next.value.second.value;
    let prevKeyframe = next.prev().value.second;
    let nextKeyframe = next.value.second;
    let t = (timeoffset - prevKeyframe.timecode) / (nextKeyframe.timecode - prevKeyframe.timecode);
    return this.interpolate(prevKeyframe.value, nextKeyframe.value, t);
  }

  getKeyframeAt(timeoffset: number): Keyframe<T> {
    let lagacy = this.keyframeTreeMap.find(timeoffset);
    if (!lagacy.equals(this.keyframeTreeMap.end())) return lagacy.value.second;
    return null;
  }

  @action
  addKeyframeAt(timeoffset: number, value: T): Keyframe<T> {
    if (!this.animated) {
      this.defaultKeyframe.value = value;
      return this.defaultKeyframe;
    }
    let lagacy = this.keyframeTreeMap.find(timeoffset);
    if (!lagacy.equals(this.keyframeTreeMap.end())) {
      lagacy.value.second.value = value;
      return lagacy.value.second;
    }
    let keyframe = new Keyframe<T>(timeoffset, value);
    this.doAddKeyframe(keyframe);
    return keyframe;
  }

  protected doAddKeyframe(keyframe: Keyframe<T>): Keyframe<T> {
    this.keyframeTreeMap.insert(new Pair(keyframe.timecode, keyframe));
    this.keyframes.add(keyframe);
    this.onKeyframeAdded_.fire(keyframe);
    return keyframe;
  }

  @action
  removeKeyframe(keyframe: Keyframe<T>) {
    console.assert(this.keyframes.has(keyframe), '[property] no such keyframe', keyframe);
    this.onKeyframeWillRemove_.fire(keyframe);
    this.keyframeTreeMap.erase(keyframe.timecode);
    this.keyframes.delete(keyframe);
  }

  @action
  setAnimated(value: boolean) {
    this.animated = value;
  }

  clone(obj: Property<T>): Object {
    (obj as any).id = __next_id++;
    (obj as any).type = this.type;
    obj.animatable = this.animatable;
    obj.animated = this.animated;
    obj.keyframes = new Set();
    obj.keyframeTreeMap = new TreeMap();
    this.keyframes.forEach(keyframe => {
      const clonedValue = (typeof keyframe.value == 'object' ? clone(keyframe.value as any) : keyframe.value);
      obj.addKeyframeAt(keyframe.timecode, clonedValue);
    });
    obj.defaultKeyframe = clone<Keyframe<T>>(this.defaultKeyframe);
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

  static deserialize<T extends IKeyframeValue>(instantiationService: IInstantiationService, obj: SerializedProperty): Property<T> | null {
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








