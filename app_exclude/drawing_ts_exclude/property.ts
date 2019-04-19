import { Postable, postable } from 'worker-postable';
import { InterpolationType } from './interpolation-type';
import PostableVector2 from 'util/postable_vector2';
import { TreeMap, Pair } from 'tstl';
import { EventEmitter2 } from 'eventemitter2';
import { Vector4 } from 'oliveutil/vector4';
import { Vector2 } from 'oliveutil/vector2';
import { action } from 'mobx';
import { PropertyType } from './property-type';

export enum PropertyEvent {
  KEYFRAME_ADDED = 'KEYFRAME_ADDED',
  KEYFRAME_REMOVED = 'KEYFRAME_REMOVED'
}

export type PropertyTypes = number | PostableVector2 | Array<PostableVector2>;

export interface KeyframeBase<T extends PropertyTypes> {
  timecode: number;
  value: T;
  next: KeyframeBase<T>;
  prev: KeyframeBase<T>;
  interpolationType: InterpolationType;
}

@Postable
export class Keyframe<T extends PropertyTypes> implements KeyframeBase<T> {
  @postable timecode: number;
  @postable value: T;
  @postable next: Keyframe<T>;
  @postable prev: Keyframe<T>;
  @postable interpolationType: InterpolationType;

  constructor(timecode: number, value: T) {
    this.timecode = timecode;
    this.value = value;
    this.interpolationType = InterpolationType.LINEAR;
  }
}

export interface PropertyBase<T extends PropertyTypes> {
  animatable: boolean;
  animated: boolean;
  keyframes: Set<KeyframeBase<T>>;
  defaultKeyframe: KeyframeBase<T>;

  interpolate(lhs: T, rhs: T, t: number): T;
}

@Postable
export abstract class Property<T extends PropertyTypes> implements PropertyBase<T> {

  readonly type: PropertyType;

  evaluatedValue: T;
  @postable animatable: boolean;
  @postable animated: boolean;
  @postable keyframes: Set<Keyframe<T>>;
  @postable defaultKeyframe: Keyframe<T>;

  keyframeTreeMap: TreeMap<number, Keyframe<T>>;

  ee: EventEmitter2;

  constructor(type: PropertyType, defaultValue: T) {
    this.type = type;
    this.animated = false;
    this.keyframes = new Set<Keyframe<T>>();
    this.keyframeTreeMap = new TreeMap<number, Keyframe<T>>();
    this.defaultKeyframe = new Keyframe<T>(0, defaultValue);

    this.ee = new EventEmitter2();
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
      return;
    }
    let lagacy = this.keyframeTreeMap.find(timeoffset);
    if (!lagacy.equals(this.keyframeTreeMap.end())) {
      lagacy.value.second.value = value;
      return lagacy.value.second;
      return;
    }
    let keyframe = new Keyframe<T>(timeoffset, value);
    this.keyframeTreeMap.insert(new Pair(timeoffset, keyframe));
    this.keyframes.add(keyframe);
    this.ee.emit(PropertyEvent.KEYFRAME_ADDED, keyframe);
    return keyframe;
  }

  @action
  removeKeyframe(keyframe: Keyframe<T>) {
    console.assert(this.keyframes.has(keyframe), '[property] no such keyframe', keyframe);
    this.keyframeTreeMap.erase(keyframe.timecode);
    this.keyframes.delete(keyframe);
    this.ee.emit(PropertyEvent.KEYFRAME_REMOVED, keyframe);
  }

  @action
  setAnimated(value: boolean) {
    this.animated = value;
  }

  /*
  private access(timecode: number): Keyframe<T> {
    var bef = this.accessBefore(timecode);
    if (bef.timecode == timecode) return bef;
    var aft = this.accessAfter(timecode);
    var keyframe: Keyframe<T> = new Keyframe<T>(timecode, null);
    keyframe.prev = bef;
    keyframe.next = aft;
    if (bef != null) bef.next = keyframe;
    if (aft != null) aft.prev = keyframe;
    this.lastAccessedKeyframe = keyframe;
    return keyframe;
  }

  private accessBefore(timecode: number): Keyframe<T> {
    let after = this.accessAfter(timecode);
    if (after == null) return this.lastAccessedKeyframe;
    else {
      if (after.timecode == timecode) return after;
      return after.prev;
    }
  }

  private accessAfter(timecode: number): Keyframe<T> {
    if (this.lastAccessedKeyframe == null) return null;
    var lastAccessed = this.lastAccessedKeyframe;
    if (lastAccessed.timecode == timecode) return lastAccessed;

    if (lastAccessed.timecode > timecode) {
      var candidate = lastAccessed;
      while (true) {
        candidate = lastAccessed;
        lastAccessed = lastAccessed.prev;
        this.lastAccessedKeyframe = lastAccessed;
        if (lastAccessed.timecode < timecode) break;
      }
      return candidate;
    }

    else {
      while (lastAccessed != null) {
        this.lastAccessedKeyframe = lastAccessed;
        if (lastAccessed.timecode >= timecode) break;
        lastAccessed = lastAccessed.next;
      }
      return lastAccessed;
    }
  }

  setKeyframe(timecode: number, value: T) {
    if (!this.animated) {
      console.log(' set keyframe ', value);
      this.defaultValue.value = value;
      return;
    }
    var keyframe = this.access(timecode);
    keyframe.value.value = value;
  }

  getKeyframeAt(timecode: number): T {
    if (!this.animated) return this.defaultValue;
    return this.access(timecode);
  }

  getInterpolatedPropertyValue(timecode: number): PropertyValue<T> {
    if (this.keyframes.size == 0) return this.defaultValue;
    var bef = this.accessBefore(timecode);
    var aft = this.accessAfter(timecode);
    if (bef == null) return aft.value;
    if (aft == null) return bef.value;
    var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
    return bef.value.interpolate(aft.value, t);
  }
  */


  // Event Emitter
  addEventListener(type: (PropertyEvent.KEYFRAME_ADDED | PropertyEvent.KEYFRAME_REMOVED),
      callback: (keyframe: Keyframe<any>) => void): void;
  addEventListener(type: PropertyEvent, callback: (...args: any) => void) {
    this.ee.addListener(type, callback);
  }

  removeEventListener(type: (PropertyEvent.KEYFRAME_ADDED | PropertyEvent.KEYFRAME_REMOVED),
      callback: (keyframe: Keyframe<any>) => void): void;
  removeEventListener(type: PropertyEvent, callback: (...args: any) => void) {
    this.ee.removeListener(type, callback);
  }
}


export interface ScalarPropertyBase extends PropertyBase<number> {
}

@Postable
export class ScalarProperty extends Property<number> implements ScalarPropertyBase {

  constructor(defaultValue: number) {
    super(PropertyType.SCALAR, defaultValue);
  }

  createValue(val: number): number {
    return val;
  }

  cloneValue(val: number): number {
    return val;
  }

  interpolate(lhs: number, rhs: number, t: number): number {
    return lhs + (rhs - lhs) * t;
  }

}





export interface Vector2PropertyBase extends PropertyBase<PostableVector2> {
}
@Postable
export class Vector2Property extends Property<PostableVector2> implements Vector2PropertyBase {

  constructor(defaultValue: PostableVector2) {
    super(PropertyType.VECTOR2, defaultValue);
  }

  createValue(x: number, y: number): PostableVector2 {
    return new PostableVector2(x, y);
  }

  cloneValue(value: PostableVector2): PostableVector2 {
    return new PostableVector2(value.x, value.y);
  }

  interpolate(lhs: PostableVector2, rhs: PostableVector2, t: number): PostableVector2 {
    return new PostableVector2(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }

}



export interface Vector4PropertyBase extends PropertyBase<Vector4> {
}
@Postable
export class Vector4Property extends Property<Vector4> implements Vector2PropertyBase {

  constructor(defaultValue: Vector4) {
    super(PropertyType.VECTOR4, defaultValue);
  }

  createValue(x: number, y: number, z: number, w : number): Vector4 {
    return new Vector4(x, y, z, w);
  }

  cloneValue(val: Vector4): Vector4 {
    return new Vector4(val.x, val.y, val.z, val.w);
  }

  interpolate(lhs: Vector4, rhs: Vector4, t: number): Vector4 {
    return new Vector4(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }

}

export interface PolyPathPropertyBase extends PropertyBase<Vector2[]> {
}
@Postable
export class PolyPathProperty extends Property<Vector2[]> implements PolyPathPropertyBase {

  constructor(defaultValue: Vector2[]) {
    super(PropertyType.POLYPATH, defaultValue);
  }

  createValue(path: [[number, number]]): Vector2[] {
    let res: Vector2[] = [];
    for (let i = 0; i < path.length; i ++) {
      const vec = new Vector2(path[i][0], path[i][1]);
      res.push(vec);
    }
    return res;
  }

  cloneValue(path: Vector2[]): Vector2[] {
    let res: Vector2[] = [];
    for (let i = 0; i < path.length; i ++) {
      const vec = new Vector2(path[i].x, path[i].y);
      res.push(vec);
    }
    return res;
  }

  @action
  insertPoint(index: number, ratio: number) {
    console.log('insert point', index, ratio, this.animated, this.keyframes);
    (this.animated ? this.keyframes : [this.defaultKeyframe]).forEach((keyframe: Keyframe<Vector2[]>) => {
      console.log(keyframe);
      const p1 = keyframe.value[(index - 1 + keyframe.value.length) %  keyframe.value.length];
      const p2 = keyframe.value[index % keyframe.value.length];
      const x = (p1.x + (p2.x - p1.x) * ratio);
      const y = (p1.y + (p2.y - p1.y) * ratio);
      const p = new Vector2(x, y);
      keyframe.value.splice(index, 0, p);
      this.addKeyframeAt(keyframe.timecode, keyframe.value);
    })
  }

  interpolate(lhs: Vector2[], rhs: Vector2[], t: number): Vector2[] {
    console.assert(lhs.length == rhs.length);
    let res: Vector2[] = [];
    for (let i = 0; i < lhs.length; i ++) {
      const vec1 = lhs[i];
      const vec2 = rhs[i];
      const vec = new Vector2(vec1.x + (vec2.x - vec1.x) * t,
                              vec1.y + (vec2.y - vec1.y) * t);
      res.push(vec);
    }
    return res;
  }

}