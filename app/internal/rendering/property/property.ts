import { Postable, postable } from 'worker-postable';
import { TreeMap, Pair, make_pair } from 'tstl';
import { EventEmitter2 } from 'eventemitter2';
import { action } from 'mobx';
import { KeyframeBase, Keyframe } from './keyframe';
import { Cloneable, clone } from 'base/common/cloneable';
import { Event, Emitter } from 'base/common/event';

export enum PropertyType {
  SCALAR,
  VECTOR2,
  VECTOR4,
  POLYPATH,
}

export enum PropertyEvent {
  KEYFRAME_ADDED = 'KEYFRAME_ADDED',
  KEYFRAME_REMOVED = 'KEYFRAME_REMOVED'
}

export type PropertyTypes = any;

export interface PropertyBase<T extends PropertyTypes> {
  animatable: boolean;
  animated: boolean;
  keyframes: Set<KeyframeBase<T>>;
  defaultKeyframe: KeyframeBase<T>;

  interpolate(lhs: T, rhs: T, t: number): T;
}

let __next_id = 0;

@Postable
export abstract class Property<T extends PropertyTypes> implements PropertyBase<T>, Cloneable {
  
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
    this.keyframeTreeMap.insert(new Pair(timeoffset, keyframe));
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
}











