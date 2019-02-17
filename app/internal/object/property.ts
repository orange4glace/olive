import PropertyValue from 'internal/object/property-value';

interface Keyframe<T> {
  timecode: number;
  value: PropertyValue<T>;
  next: Keyframe<T>;
  prev: Keyframe<T>;
}

export default class Property<T extends PropertyValue<any>> {

  defaultValue: PropertyValue<T>;
  animatable: boolean;
  animated: boolean;

  lastAccessedKeyframe: Keyframe<T> = null;

  constructor() {
    this.animated = false;
  }

  private access(timecode: number): Keyframe<T> {
    var bef = this.accessBefore(timecode);
    if (bef.timecode == timecode) return bef;
    var aft = this.accessAfter(timecode);
    var keyframe: Keyframe<T> = {
      timecode: timecode,
      value: null,
      prev: bef,
      next: aft
    };
    if (bef != null) bef.next = keyframe;
    if (aft != null) aft.prev = keyframe;
    this.lastAccessedKeyframe = keyframe;
    return keyframe;
  }

  private accessBefore(timecode: number): Keyframe<T> {
    if (this.lastAccessedKeyframe == null) return null;
    var lastAccessed = this.lastAccessedKeyframe;
    if (lastAccessed.timecode == timecode) return lastAccessed;

    if (lastAccessed.timecode > timecode) {
      while (lastAccessed != null) {
        this.lastAccessedKeyframe = lastAccessed;
        if (lastAccessed.timecode <= timecode) break;
        lastAccessed = lastAccessed.prev;
      }
      return lastAccessed;
    }

    else {
      var candidate = lastAccessed;
      while (true) {
        candidate = lastAccessed;
        lastAccessed = lastAccessed.next;
        if (lastAccessed == null) break;
        this.lastAccessedKeyframe = lastAccessed;
        if (lastAccessed.timecode > timecode) break;
      }
      return candidate;
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
        if (lastAccessed == null) break;
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
    var bef = this.accessBefore(timecode);
    var aft = this.accessAfter(timecode);
    var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
    return bef.value.interpolate(aft.value, t);
  }

}