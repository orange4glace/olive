import { Posted, posted } from "worker-postable";
import { FrameRateBase } from "internal/project/sequence/frame_rate";
import { systemTimeToMilliseconds } from "base/common/time";

@Posted('FrameRate')
export class FrameRateRenderer implements FrameRateBase {

  @posted num: number;
  @posted den: number;

  millisecondToTime(millisecond: number) {
    return Math.floor(millisecond * this.num / this.den / 1000);
  }

  systemTimeToTime(systemTime: number) {
    return this.millisecondToTime(systemTimeToMilliseconds(systemTime));
  }

}