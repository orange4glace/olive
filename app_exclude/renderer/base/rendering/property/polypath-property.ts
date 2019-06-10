import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";
import { Vector2Renderer } from "oliveutil/vector2";
import { PolyPathPropertyBase, PolypathKeyframeValue } from "internal/rendering/property/base/polypath-property";
import { Posted } from "worker-postable";
import { Vector2KeyframeValue } from "internal/rendering/property/base/vector2-property";

@Posted('PolyPathProperty')
export class PolyPathPropertyRenderer extends PropertyRenderer<PolypathKeyframeValue>
    implements PolyPathPropertyBase {

  interpolate(lhs: PolypathKeyframeValue, rhs: PolypathKeyframeValue, t: number): PolypathKeyframeValue {
    console.assert(lhs.points.length == rhs.points.length);
    let res: PolypathKeyframeValue;
    for (let i = 0; i < lhs.points.length; i ++) {
      const vec1 = lhs.points[i];
      const vec2 = rhs.points[i];
      const vec = new Vector2KeyframeValue(vec1.x + (vec2.x - vec1.x) * t,
                                      vec1.y + (vec2.y - vec1.y) * t);
      res.points.push(vec);
    }
    return res;
  }

}