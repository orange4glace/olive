import { EffectControlViewController } from "./controller";
import Timeline from "internal/timeline/timeline";
import { TrackItemHost } from "../timeline/controller";
import { DrawingHost } from "../timeline/controller/drawing-host";
import { PropertyHost } from "../timeline/controller/property-host";
import { PropertyTypes, Property, Drawing } from "internal/drawing";
import { KeyframeHost } from "../timeline/controller/keyframe-host";

export interface EffectControlViewProps {
  controller: EffectControlViewController;
}

export interface EffectControlDrawingViewProps<T extends Drawing> extends EffectControlViewProps {
  trackItemHost: TrackItemHost;
  drawingHost: DrawingHost<T>;
}

export interface EffectControlPropertyViewProps<T extends Property<PropertyTypes>> extends EffectControlDrawingViewProps<Drawing> {
  propertyHost: PropertyHost<T>;
}

export interface EffectControlKeyframeViewProps extends EffectControlPropertyViewProps<Property<PropertyTypes>> {
  keyframeHost: KeyframeHost;
}