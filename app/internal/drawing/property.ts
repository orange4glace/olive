import { Postable, postable } from 'worker-postable';
import { InterpolationType } from './interpolation-type';
import PostableVector2 from 'util/postable_vector2';
import { TreeMap, Pair } from 'tstl';
import { EventEmitter2 } from 'eventemitter2';

export enum PropertyEvent {
  KEYFRAME_ADDED = 'KEYFRAME_ADDED',
  KEYFRAME_REMOVED = 'KEYFRAME_REMOVED'
}

export type PropertyTypes = number | PostableVector2;

export interface KeyframeBase<T extends PropertyTypes> {
  timecode: number;
  value: T;
  next: KeyframeBase<T>;
  prev: KeyframeBase<T>;
  interpolationType: InterpolationType;
}

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
  defaultValue: T;

  interpolate(lhs: T, rhs: T, t: number): T;
}

@Postable
export abstract class Property<T extends PropertyTypes> implements PropertyBase<T> {

  evaluatedValue: T;
  @postable animatable: boolean;
  @postable animated: boolean;
  @postable keyframes: Set<Keyframe<T>>;
  @postable defaultValue: T;

  keyframeTreeMap: TreeMap<number, Keyframe<T>>;

  ee: EventEmitter2;

  constructor(defaultValue: T) {
    this.animated = false;
    this.keyframes = new Set<Keyframe<T>>();
    this.keyframeTreeMap = new TreeMap<number, Keyframe<T>>();
    this.defaultValue = defaultValue;

    this.ee = new EventEmitter2();
  }

  abstract createValue(...args: any): T;
  abstract cloneValue(value: T): T;
  abstract interpolate(lhs: T, rhs: T, t: number): T;

  getInterpolatedPropertyValue(timeoffset: number): T {
    if (!this.animated) return this.defaultValue;
    // touch getter to observe change
    this.keyframes.values();
    let next = this.keyframeTreeMap.lower_bound(timeoffset);
    if (next.equals(this.keyframeTreeMap.end())) {
      if (this.keyframeTreeMap.size() == 0)
        return this.defaultValue;
      return next.prev().value.second.value;
    }
    if (next.equals(this.keyframeTreeMap.begin()))
      return next.value.second.value;
    let prevKeyframe = next.prev().value.second;
    let nextKeyframe = next.value.second;
    let t = (timeoffset - prevKeyframe.timecode) / (nextKeyframe.timecode - prevKeyframe.timecode);
    return this.interpolate(prevKeyframe.value, nextKeyframe.value, t);
  }

  addKeyframeAt(timeoffset: number, value: T) {
    if (!this.animated) {
      this.defaultValue = value;
      return;
    }
    let lagacy = this.keyframeTreeMap.find(timeoffset);
    if (!lagacy.equals(this.keyframeTreeMap.end())) {
      lagacy.value.second.value = value;
      return;
    }
    let keyframe = new Keyframe<T>(timeoffset, value);
    this.keyframeTreeMap.insert(new Pair(timeoffset, keyframe));
    this.keyframes.add(keyframe);
    this.ee.emit(PropertyEvent.KEYFRAME_ADDED, keyframe);
  }

  removeKeyframe(keyframe: Keyframe<T>) {
    console.assert(this.keyframes.has(keyframe), '[property] no such keyframe', keyframe);
    this.keyframeTreeMap.erase(keyframe.timecode);
    this.keyframes.delete(keyframe);
    this.ee.emit(PropertyEvent.KEYFRAME_REMOVED, keyframe);
  }

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

export interface Vector2PropertyBase extends PropertyBase<PostableVector2> {
}

@Postable
export class Vector2Property extends Property<PostableVector2> implements Vector2PropertyBase {

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