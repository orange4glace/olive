import { Posted } from "worker-postable";
import NVG from "../../../../../nanovg-webgl";
import { TrackItemRenderer } from "internal/renderer/base/all";

@Posted('TrackItemImpl')
export abstract class TrackItemVideoRenderer extends TrackItemRenderer {
  abstract async draw(nvg: NVG, timecode: number): Promise<void>;
  abstract afterDraw(nvg: NVG, timecode: number): void;
}