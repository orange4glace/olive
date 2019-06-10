import { Constructor, MixinBase } from "base/olive/mixin";
import { KeyframeBase } from "internal/rendering/property/common/keyframe";
import { TreeMap } from "tstl";
import { postable, Postabled } from "worker-postable";

export type PropertyBaseConstructor = new (...args: any[]) => PropertyBase;
export function WithPropertyBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  abstract class PropertyBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.property.Property';
    @postable protected animated_: boolean;
    public get animated() { return this.animated_; }
    @postable protected keyframes_: Set<KeyframeBase>;
    public get keyframes(): ReadonlySet<KeyframeBase> { return this.keyframes_; }
    @postable protected defaultKeyframe_: KeyframeBase;
    public get defaultKeyframe() { return this.defaultKeyframe_; }

    protected keyframeTreeMap_: TreeMap<number, KeyframeBase>;

    getInterpolatedPropertyValue(timeoffset: number): any {
      if (!this.animated) return this.defaultKeyframe.value;
      // touch getter to observe change
      this.keyframes.values();
      let next = this.keyframeTreeMap_.lower_bound(timeoffset);
      if (next.equals(this.keyframeTreeMap_.end())) {
        if (this.keyframeTreeMap_.size() == 0)
          return this.defaultKeyframe.value;
        return next.prev().value.second.value;
      }
      if (next.equals(this.keyframeTreeMap_.begin()))
        return next.value.second.value;
      let prevKeyframe = next.prev().value.second;
      let nextKeyframe = next.value.second;
      let t = (timeoffset - prevKeyframe.timecode) / (nextKeyframe.timecode - prevKeyframe.timecode);
      return this.interpolate(prevKeyframe.value, nextKeyframe.value, t);
    }

    getKeyframeAt(timeoffset: number): KeyframeBase {
      let lagacy = this.keyframeTreeMap_.find(timeoffset);
      if (!lagacy.equals(this.keyframeTreeMap_.end())) return lagacy.value.second;
      return null;
    }

    abstract interpolate(lhs: any, rhs: any, t: number): any;
  };
  return PropertyBase;
}

@Postabled
export class PropertyBase extends WithPropertyBase(MixinBase) {
  interpolate(lhs: any, rhs: any, t: number): any {}
}