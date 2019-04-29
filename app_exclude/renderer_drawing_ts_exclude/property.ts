import { KeyframeBase, PropertyBase, PropertyTypes, Vector2PropertyBase, Vector4PropertyBase, PolyPathPropertyBase } from "internal/drawing";
import { Posted, listenable, listen } from "worker-postable";
import { InterpolationType } from "internal/drawing/interpolation-type";
import { PostableVector2Renderer } from "../renderer-util";
import { observable, observe, ObservableSet } from "mobx";
import { TreeMap, Pair } from "tstl";
import { MapIterator } from "tstl/base";
import { Vector4Renderer } from "oliveutil/vector4";
import { Vector2Renderer } from "oliveutil/vector2";

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
  defaultKeyframe: KeyframeRenderer<T>;

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
    if (this.keyframes.size == 0) return this.defaultKeyframe.value;
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

@Posted('Vector4Property')
export class Vector4PropertyRenderer extends PropertyRenderer<Vector4Renderer> implements Vector4PropertyBase {
  
  interpolate(lhs: Vector4Renderer, rhs: Vector4Renderer, t: number): Vector4Renderer {
    return new Vector4Renderer(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t,
      lhs.z + (rhs.z - lhs.z) * t,
      lhs.w + (rhs.w - lhs.w) * t);
  }
}

@Posted('PolyPathProperty')
export class PolyPathPropertyRenderer extends PropertyRenderer<Vector2Renderer[]> implements PolyPathPropertyBase {

  interpolate(lhs: Vector2Renderer[], rhs: Vector2Renderer[], t: number): Vector2Renderer[] {
    console.assert(lhs.length == rhs.length);
    let res: Vector2Renderer[] = [];
    for (let i = 0; i < lhs.length; i ++) {
      const vec1 = lhs[i];
      const vec2 = rhs[i];
      const vec = new Vector2Renderer(vec1.x + (vec2.x - vec1.x) * t,
                                      vec1.y + (vec2.y - vec1.y) * t);
      res.push(vec);
    }
    return res;
  }

}