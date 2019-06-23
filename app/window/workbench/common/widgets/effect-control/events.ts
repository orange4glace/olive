import { StandardMouseEvent } from "base/browser/mouseEvent";
import { ITrack } from "internal/timeline/base/track/track";
import { Property } from "internal/rendering/property/base/property";
import { Keyframe } from "internal/rendering/property/base/keyframe";

export interface EffectControKeyframeEvent {
  track: ITrack;
  property: Property<any>;
  keyframe: Keyframe<any>;
}

export interface EffectControlKeyframeUIEvent {
  property: Property<any>;
  keyframe: Keyframe<any>;
  e: StandardMouseEvent;
}