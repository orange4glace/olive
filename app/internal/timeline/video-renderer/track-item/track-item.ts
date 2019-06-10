import { WithTrackItemBase } from "internal/timeline/common/track-item/track-item";
import { MixinBase } from "base/olive/mixin";
import NVG from "../../../../../nanovg-webgl";
import { Posted } from "worker-postable";

@Posted
export class TrackItemVideoRenderer extends WithTrackItemBase(MixinBase) {

  async draw(nvg: NVG, timecode: number): Promise<void> {}
  afterDraw(nvg: NVG, timecode: number): void {}

}