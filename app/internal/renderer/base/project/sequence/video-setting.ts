import { Posted, posted } from "worker-postable";
import { VideoSettingBase } from "internal/project/sequence/video-setting";
import { FrameRateRenderer } from "internal/renderer/base/project/sequence/frame-rate";

@Posted('VideoSetting')
export class VideoSettingRenderer implements VideoSettingBase {

  @posted screenWidth: number;
  @posted screenHeight: number;
  @posted frameRate: FrameRateRenderer;

}