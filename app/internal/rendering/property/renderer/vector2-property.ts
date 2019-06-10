import { Posted } from "worker-postable";
import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { KeyframeValueRenderer } from "internal/rendering/property/renderer/keyframe-value";
import { PropertyRenderer } from "internal/rendering/property/renderer/property";
import { WithVector2PropertyBase } from "internal/rendering/property/common/vector2-property";

@Posted
export class Vector2KeyframeValueRenderer extends WithKeyframeValueBase(KeyframeValueRenderer) {

}

@Posted
export class Vector2PropertyRenderer extends WithVector2PropertyBase(PropertyRenderer) {

}