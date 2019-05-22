import { Posted, posted } from "worker-postable";
import { VideoSettingBase } from "internal/timeline/video-setting";
import { FrameRateRenderer } from "internal/renderer/base/timeline/frame-rate";

@Posted('VideoSetting')
export class VideoSettingRenderer implements VideoSettingBase {

  @posted screenWidth: number;
  @posted screenHeight: number;
  @posted frameRate: FrameRateRenderer;

}