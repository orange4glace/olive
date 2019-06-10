import { PropertyBase } from "internal/rendering/property/property";
import { listenable, listen, Posted } from "worker-postable";
import { TreeMap, make_pair } from "tstl";
import { MapIterator } from "tstl/base";
import { ObservableSet } from "mobx";
import { KeyframeRenderer } from "internal/renderer/base/rendering/property/keyframe";
import { KeyframeValue } from "internal/rendering/property/keyframe";

@Posted('Property')
export abstract class PropertyRenderer<T extends KeyframeValue>
    implements PropertyBase<T> {
  /*@postable*/ animatable: boolean;
  /*@postable*/ animated: boolean;
  /*@postable*/ @listenable keyframes: Set<KeyframeRenderer<T>>;
  /*@postable*/ defaultKeyframe: KeyframeRenderer<T>;

  protected keyframeTreeMap: TreeMap<number, KeyframeRenderer<T>>;
  protected currentKeyframeIterator: MapIterator<number, KeyframeRenderer<T>, true, TreeMap<number, KeyframeRenderer<T>>>;
  
  constructor() {
    this.keyframeTreeMap = new TreeMap();

    this.observeKeyframes = this.observeKeyframes.bind(this);
    listen(this, (change: any) => {
      if ((change.type=='add' || change.type == 'update') && change.name == 'keyframes')
        this.observeKeyframes(change.newValue);
    })
  }

  observeKeyframes(keyframes: ObservableSet<KeyframeRenderer<T>>) {
    listen(keyframes, change => {
      if (change.type == 'add') {
        let keyframe = change.newValue as KeyframeRenderer<T>;
        this.keyframeTreeMap.insert(make_pair(keyframe.timecode, keyframe));
      }
    });
  }

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
  
}