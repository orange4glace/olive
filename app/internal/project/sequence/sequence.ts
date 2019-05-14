import { postable, Postable } from "worker-postable";
import { VideoSetting, VideoSettingBase, IVideoSetting } from "internal/project/sequence/video-setting";
import { AudioSetting, AudioSettingBase, IAudioSetting } from "internal/project/sequence/audio-setting";

export interface ISequence {
  videoSetting: IVideoSetting;
  audioSetting: IAudioSetting;
}

export interface SequenceBase {
  videoSetting: VideoSettingBase;
  audioSetting: AudioSettingBase;
}

@Postable
export class Sequence implements ISequence, SequenceBase {

  @postable videoSetting: VideoSetting;
  @postable audioSetting: AudioSetting;
  
  constructor() {
    this.videoSetting = new VideoSetting();
    this.audioSetting = new AudioSetting();
  }

  audioFrameToTime(frame: number) {
    return this.videoSetting.frameRate.millisecondToTime(
        Math.floor(frame / this.audioSetting.sampleRate * 1000));
  }

}