import { Vector2, Vector2Base } from "oliveutil/vector2";
import { PropertyBase, Property } from "./property";
import { action } from "mobx";
import { Postable } from "worker-postable";
import { Keyframe } from "./keyframe";


export interface PolyPathPropertyBase extends PropertyBase<Vector2Base[]> {
}

@Postable
export class PolyPathProperty extends Property<Vector2[]> implements PolyPathPropertyBase {

  constructor(defaultValue: Vector2[]) {
    super('POLYPATH', defaultValue);
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