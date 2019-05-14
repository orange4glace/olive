import { PropertyTypes, PropertyBase } from "internal/rendering/property/property";
import { listenable, listen, Posted } from "worker-postable";
import { TreeMap, make_pair } from "tstl";
import { MapIterator } from "tstl/base";
import { ObservableSet } from "mobx";
import { KeyframeRenderer } from "internal/renderer/base/rendering/property/keyframe";

@Posted('Property')
export abstract class PropertyRenderer<T extends PropertyTypes>
    implements PropertyBase<T> {
  /*@postable*/ animatable: boolean;
  /*@postable*/ animated: boolean;
  /*@postable*/ @listenable keyframes: Set<KeyframeRenderer<T>>;
  /*@postable*/ defaultKeyframe: KeyframeRenderer<T>;

  protected keyframeMap: TreeMap<number, KeyframeRenderer<T>>;
  protected currentKeyframeIterator: MapIterator<number, KeyframeRenderer<T>, true, TreeMap<number, KeyframeRenderer<T>>>;
  
  constructor() {
    this.keyframeMap = new TreeMap();

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
        this.keyframeMap.insert(make_pair(keyframe.timecode, keyframe));
      }
    });
  }

  abstract interpolate(lhs: T, rhs: T, t: number): T;

  protected accessBefore(timeoffset: number): KeyframeRenderer<T> {
    let it = this.keyframeMap.lower_bound(timeoffset);
    if (it.equals(this.keyframeMap.end())) 
      if (this.keyframeMap.size() > 0) return this.keyframeMap.rbegin().value.second;
      else return null;
    if (it.value.second.timecode == timeoffset) return it.value.second;
    if (it.equals(this.keyframeMap.begin())) return null;
    return it.prev().value.second;
  }

  protected accessAfter(timeoffset: number): KeyframeRenderer<T> {
    let it = this.keyframeMap.lower_bound(timeoffset);
    if (it.equals(this.keyframeMap.end())) return null;
    return it.value.second;
  }

  getInterpolatedPropertyValue(timecode: number): T {
    if (this.keyframes.size == 0) return this.defaultKeyframe.value;
    var bef = this.accessBefore(timecode);
    var aft = this.accessAfter(timecode);
    if (bef == null) return aft.value;
    if (aft == null) return bef.value;
    var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
    return this.interpolate(bef.value, aft.value, t);
  }
}