// import { postable, Postable } from "worker-postable";
// import { VideoSetting, VideoSettingBase, IVideoSetting } from "internal/project/sequence/video-setting";
// import { AudioSetting, AudioSettingBase, IAudioSetting } from "internal/project/sequence/audio-setting";
// import { ITimeline } from "internal/timeline/timeline";

// export interface SequenceBase {
//   videoSetting: VideoSettingBase;
//   audioSetting: AudioSettingBase;
// }

// export interface ISequence extends SequenceBase {

//   readonly timeline: ITimeline;

//   readonly videoSetting: IVideoSetting;
//   readonly audioSetting: IAudioSetting;

//   audioFrameToTime(frame: number): number;
//   timeToAudioFrame(time: number): number;
// }

// @Postable
// export class Sequence implements ISequence {

//   @postable timeline: ITimeline;

//   @postable videoSetting: IVideoSetting;
//   @postable audioSetting: IAudioSetting;
  
//   constructor() {
//     this.videoSetting = new VideoSetting();
//     this.audioSetting = new AudioSetting();
//   }

//   audioFrameToTime(frame: number) {
//     return this.videoSetting.frameRate.millisecondToTime(
//         Math.floor(frame / this.audioSetting.sampleRate * 1000));
//   }

//   timeToAudioFrame(time: number) {
//     return Math.floor(time * this.audioSetting.sampleRate * this.videoSetting.frameRate.den / this.videoSetting.frameRate.num);
//   }

// }