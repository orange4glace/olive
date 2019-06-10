import { TimelineIdentifier } from "internal/timeline/base/timeline";
import { postable, Postabled } from "worker-postable";
import { TrackBase } from "internal/timeline/common/track/track";
import { VideoSettingBase } from "internal/timeline/common/video-setting";
import { AudioSettingBase } from "internal/timeline/common/audio-setting";
import { MixinBase, Constructor } from "base/olive/mixin";

export function WithTimelineBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class TimelineBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.timeline.Timeline';
    
    @postable protected id_: TimelineIdentifier;
    public get id() { return this.id_; }
    @postable protected totalTime_: number;
    public get totalTime() { return this.totalTime_; }

    @postable protected tracks_: TrackBase[];
    public get tracks() { return this.tracks_; }

    @postable protected videoSetting_: VideoSettingBase;
    public get videoSetting() { return this.videoSetting_; }
    @postable protected audioSetting_: AudioSettingBase;
    public get audioSetting() { return this.audioSetting_; }

  };
  return TimelineBase;
}
@Postabled
export class TimelineBase extends WithTimelineBase(MixinBase) {}