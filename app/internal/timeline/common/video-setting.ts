import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";
import { FrameRateBase } from "internal/timeline/common/frame-rate";

export function WithVideoSettingBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class VideoSettingBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.VideoSetting';
    @postable protected screenWidth_: number;
    public get screenWidth() { return this.screenWidth_; }
    @postable protected screenHeight_: number;
    public get screenHeight() { return this.screenHeight_; }
    @postable protected frameRate_: FrameRateBase;
    public get frameRate() { return this.frameRate_; }
  };
  return VideoSettingBase;
}
@Postabled
export class VideoSettingBase extends WithVideoSettingBase(MixinBase) {}