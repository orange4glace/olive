import { Posted } from "worker-postable";
import { WithKeyframeValueBase } from "internal/rendering/property/common/keyframe-value";
import { KeyframeValueRenderer } from "internal/rendering/property/renderer/keyframe-value";
import { WithPolypathPropertyBase } from "internal/rendering/property/common/polypath-property";
import { PropertyRenderer } from "internal/rendering/property/renderer/property";

@Posted
export class PolypathKeyframeValueRenderer extends WithKeyframeValueBase(KeyframeValueRenderer) {

}

@Posted
export class PolypathPropertyRenderer extends WithPolypathPropertyBase(PropertyRenderer) {

}