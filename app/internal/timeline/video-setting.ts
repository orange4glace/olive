import { IFrameRate, FrameRateBase, FrameRate, SerializedFrameRate } from "internal/timeline/frame_rate";
import { postable, Postable } from "worker-postable";

export interface VideoSettingBase {
  screenWidth: number;
  screenHeight: number;
  frameRate: FrameRateBase;
}

export interface IVideoSetting extends VideoSettingBase {
  /*@observable*/ readonly screenWidth: number;
  /*@observable*/ readonly screenHeight: number;
  readonly frameRate: IFrameRate;

  serialize(): object;
}

export interface SerializedVideoSetting {
  screenWidth: number;
  screenHeight: number;
  frameRate: SerializedFrameRate;
}

@Postable
export class VideoSetting implements IVideoSetting {
  
  @postable screenWidth: number;
  @postable screenHeight: number;
  @postable frameRate: FrameRate;

  constructor(screenWidth: number, screenHeight: number, frameRate: FrameRate) {
    this.frameRate = new FrameRate(30, 1);
    this.setScreenSize(screenWidth, screenHeight);
  }

  setScreenSize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
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