import { PropertyRenderer } from "internal/renderer/base/rendering/property/property";
import { Vector2Renderer } from "oliveutil/vector2";
import { Vector2PropertyBase, Vector2KeyframeValue } from "internal/rendering/property/base/vector2-property";
import { Posted } from "worker-postable";
import { ScalarKeyframeValue, ScalarPropertyBase } from "internal/rendering/property/base/scalar-property";

@Posted('Vector2Property')
export class ScalarPropertyRenderer extends PropertyRenderer<ScalarKeyframeValue>
    implements ScalarPropertyBase {

  interpolate(lhs: ScalarKeyframeValue, rhs: ScalarKeyframeValue, t: number): ScalarKeyframeValue {
    return new ScalarKeyframeValue(lhs.value + (rhs.value - lhs.value) * t);
  }
}