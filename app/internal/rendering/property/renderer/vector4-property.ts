import { Posted } from "worker-postable";
import { KeyframeValueRenderer } from "internal/rendering/property/renderer/keyframe-value";
import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { WithVector4PropertyBase } from "internal/rendering/property/common/vector4-property";
import { PropertyRenderer } from "internal/rendering/property/renderer/property";

@Posted
export class Vector4KeyframeValueRenderer extends WithKeyframeValueBase(KeyframeValueRenderer) {

}

@Posted
export class Vector4PropertyRenderer extends WithVector4PropertyBase(PropertyRenderer) {

}