import { WithScalarPropertyBase } from "internal/rendering/property/common/scalar-property";
import { PropertyRenderer } from "internal/rendering/property/renderer/property";
import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { KeyframeValueRenderer } from "internal/rendering/property/renderer/keyframe-value";
import { Posted } from "worker-postable";

@Posted
export class ScalarKeyframeValueRenderer extends WithKeyframeValueBase(KeyframeValueRenderer) {

}

@Posted
export class ScalarPropertyRenderer extends WithScalarPropertyBase(PropertyRenderer) {

}