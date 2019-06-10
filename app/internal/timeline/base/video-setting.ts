import { postable, Postable } from "worker-postable";
import { VideoSettingBase } from "internal/timeline/common/video-setting";
import { SerializedFrameRate, FrameRate } from "internal/timeline/base/frame_rate";

export interface SerializedVideoSetting {
  screenWidth: number;
  screenHeight: number;
  frameRate: SerializedFrameRate;
}

@Postable
export class VideoSetting extends VideoSettingBase {
  
  protected frameRate_: FrameRate;
  public get frameRate() { return this.frameRate_; }

  constructor(screenWidth: number, screenHeight: number, frameRate: FrameRate) {
    super();
    this.frameRate_ = new FrameRate(30, 1);
    this.setScreenSize(screenWidth, screenHeight);
  }

  setScreenSize(width: number, height: number) {
    this.screenWidth_ = width;
    this.screenHeight_ = height;
  }

  serialize(): SerializedVideoSetting {
    return {
      screenWidth: this.screenWidth,
      screenHeight: this.screenHeight,
      frameRate: this.frameRate.serialize()
    };
  }

  static deserialize(obj: SerializedVideoSetting): VideoSetting {
    const frameRate = FrameRate.deserialize(obj.frameRate);
    return new VideoSetting(obj.screenWidth, obj.screenHeight, frameRate);
  }

}