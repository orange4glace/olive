import { KeyframeBase, PropertyBase, PropertyTypes, Vector2PropertyBase } from "internal/drawing";
import { Posted, listenable, listen } from "worker-postable";
import { InterpolationType } from "internal/drawing/interpolation-type";
import { PostableVector2Renderer } from "../renderer-util";
import { observable, observe, ObservableSet } from "mobx";
import { TreeMap, Pair } from "tstl";
import { MapIterator } from "tstl/base";

@Posted('Keyframe')
export class KeyframeRenderer<T extends PropertyTypes> implements KeyframeBase<T> {
  timecode: number;
  value: T;
  next: KeyframeRenderer<T>;
  prev: KeyframeRenderer<T>;
  interpolationType: InterpolationType;

  constructor(timecode: number, value: T) {
    this.timecode = timecode;
    this.value = value;
  }
}

@Posted('Property')
export abstract class PropertyRenderer<T extends PropertyTypes> implements PropertyBase<T> {
  animatable: boolean;
  animated: boolean;
  @listenable keyframes: Set<KeyframeRenderer<T>>;
  defaultValue: T;

  keyframeMap: TreeMap<number, KeyframeRenderer<T>>;
  currentKeyframeIterator: MapIterator<number, KeyframeRenderer<T>, true, TreeMap<number, KeyframeRenderer<T>>>;
  
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
      console.log(change)
      if (change.type == 'add') {
        let keyframe = change.newValue as KeyframeRenderer<T>;
        this.keyframeMap.insert(new Pair(keyframe.timecode, keyframe));
      }
    });
  }

  private lastAccessedKeyframe: KeyframeRenderer<T>;

  abstract interpolate(lhs: T, rhs: T, t: number): T;

  private accessBefore(timeoffset: number): KeyframeRenderer<T> {
    let it = this.keyframeMap.lower_bound(timeoffset);
    if (it.equals(this.keyframeMap.end())) 
      if (this.keyframeMap.size() > 0) return this.keyframeMap.rbegin().value.second;
      else return null;
    if (it.value.second.timecode == timeoffset) return it.value.second;
    if (it.equals(this.keyframeMap.begin())) return null;
    return it.prev().value.second;
  }

  private accessAfter(timeoffset: number): KeyframeRenderer<T> {
    let it = this.keyframeMap.lower_bound(timeoffset);
    if (it.equals(this.keyframeMap.end())) return null;
    return it.value.second;
  }

  getInterpolatedPropertyValue(timecode: number): T {
    if (this.keyframes.size == 0) return this.defaultValue;
    var bef = this.accessBefore(timecode);
    var aft = this.accessAfter(timecode);
    if (bef == null) return aft.value;
    if (aft == null) return bef.value;
    var t = (timecode - bef.timecode) / (aft.timecode - bef.timecode);
    return this.interpolate(bef.value, aft.value, t);
  }
}

@Posted('Vector2Property')
export class Vector2PropertyRenderer extends PropertyRenderer<PostableVector2Renderer> implements Vector2PropertyBase {

  interpolate(lhs: PostableVector2Renderer, rhs: PostableVector2Renderer, t: number): PostableVector2Renderer {
    return new PostableVector2Renderer(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }
}