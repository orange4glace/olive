import { IFrameRate, FrameRateBase, FrameRate } from "internal/timeline/frame_rate";
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
}

@Postable
export class VideoSetting implements IVideoSetting {
  
  @postable screenWidth: number;
  @postable screenHeight: number;
  @postable frameRate: FrameRate;

  constructor() {
    this.frameRate = new FrameRate(30, 1);
    this.setScreenSize(1080, 720);
  }

  setScreenSize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
  }

}