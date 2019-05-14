import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";
import { Vector2Renderer } from "oliveutil/vector2";
import { PolyPathPropertyBase } from "internal/rendering/property/polypath-property";
import { Posted } from "worker-postable";

@Posted('PolyPathProperty')
export class PolyPathPropertyRenderer extends PropertyRenderer<Vector2Renderer[]>
    implements PolyPathPropertyBase {

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