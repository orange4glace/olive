import { PropertyValue, PropertyValueBase } from './property-value';
import { Postable, postable } from 'worker-postable';
import { InterpolationType } from './interpolation-type';
import PostableVector2 from 'util/postable_vector2';

export type PropertyTypes = number | PostableVector2;

export interface KeyframeBase<T extends PropertyTypes> {
  timecode: number;
  value: PropertyValueBase<T>;
  next: KeyframeBase<T>;
  prev: KeyframeBase<T>;
  interpolationType: InterpolationType;
}

class Keyframe<T extends PropertyTypes> implements KeyframeBase<T> {
  @postable timecode: number;
  @postable value: PropertyValue<T>;
  @postable next: Keyframe<T>;
  @postable prev: Keyframe<T>;
  @postable interpolationType: InterpolationType;

  constructor(timecode: number, value: PropertyValue<T>) {
    this.timecode = timecode;
    this.value = value;
    this.interpolationType = InterpolationType.LINEAR;
  }
}

export interface PropertyBase<T extends PropertyTypes> {
  animatable: boolean;
  animated: boolean;
  keyframes: Set<KeyframeBase<T>>;
  defaultValue: PropertyValueBase<T>;
}

@Postable
export default class Property<T extends PropertyTypes> implements PropertyBase<T> {

  evaluatedValue: T;
  @postable animatable: boolean;
  @postable animated: boolean;
  @postable keyframes: Set<Keyframe<T>>;
  @postable defaultValue: PropertyValue<T>;


  lastAccessedKeyframe: Keyframe<T> = null;

  constructor(defaultValue: PropertyValue<T>) {
    this.animated = false;
    this.keyframes = new Set<Keyframe<T>>();
    this.defaultValue = defaultValue;
  }

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

  setKeyframe(timecode: number, value: PropertyValue<T>) {
    var keyframe = this.access(timecode);
    keyframe.value = value;
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

}