import { KeyframeBase, PropertyBase, PropertyTypes } from "internal/drawing";
import { PropertyValueRenderer } from "./property-value";
import { Posted } from "worker-postable";
import { InterpolationType } from "internal/drawing/interpolation-type";
import { PostableVector2Renderer } from "../renderer-util";
import PostableVector2 from "util/postable_vector2";

@Posted('Keyframe')
export class KeyframeRenderer<T extends PropertyTypes> implements KeyframeBase<T> {
  timecode: number;
  value: PropertyValueRenderer<T>;
  next: KeyframeRenderer<T>;
  prev: KeyframeRenderer<T>;
  interpolationType: InterpolationType;

  constructor(timecode: number, value: PropertyValueRenderer<T>) {
    this.timecode = timecode;
    this.value = value;
  }
}

@Posted('Property')
export class PropertyRenderer<T extends PropertyTypes> implements PropertyBase<T> {
  animatable: boolean;
  animated: boolean;
  keyframes: Set<KeyframeRenderer<T>>;
  defaultValue: PropertyValueRenderer<T>;

  private lastAccessedKeyframe: KeyframeRenderer<T>;

  private accessBefore(timecode: number): KeyframeRenderer<T> {
    let after = this.accessAfter(timecode);
    if (after == null) return this.lastAccessedKeyframe;
    else {
      if (after.timecode == timecode) return after;
      return after.prev;
    }
  }

  private accessAfter(timecode: number): KeyframeRenderer<T> {
    if (this.keyframes.size == 0) return null;
    if (!this.keyframes.has(this.lastAccessedKeyframe))
      this.lastAccessedKeyframe = this.keyframes.values().next().value;
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

  getInterpolatedPropertyValue(timecode: number): PropertyValueRenderer<T> {
    if (this.keyframes.size == 0) return this.defaultValue;
    var bef = this.accessBefore(timecode);
    var aft = this.accessAfter(timecode);
    if (bef == null) return aft.value;
    if (aft == null) return bef.value;
    var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
    return bef.value.interpolate(aft.value, t);
  }
} 