import { IFrameRate, FrameRateBase, FrameRate } from "internal/project/sequence/frame_rate";
import { postable, Postable } from "worker-postable";

export interface IVideoSetting {
  /*@observable*/ readonly screenWidth: number;
  /*@observable*/ readonly screenHeight: number;
  readonly frameRate: IFrameRate;
}

export interface VideoSettingBase {
  screenWidth: number;
  screenHeight: number;
  frameRate: FrameRateBase;
}

@Postable
export class VideoSetting implements IVideoSetting, VideoSettingBase {
  
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