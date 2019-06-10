// import { SequenceBase } from "internal/project/sequence/sequence";
// import { posted, Posted } from "worker-postable";
// import { VideoSettingRenderer } from "internal/renderer/base/project/sequence/video-setting";
// import { AudioSettingRenderer } from "internal/renderer/base/project/sequence/audio-setting";

// @Posted('Sequence')
// export class SequenceRenderer implements SequenceBase {

//   @posted videoSetting: VideoSettingRenderer;
//   @posted audioSetting: AudioSettingRenderer;

//   audioFrameToTime(frame: number) {
//     return this.videoSetting.frameRate.millisecondToTime(
//         Math.floor(frame / this.audioSetting.sampleRate * 1000));
//   }

//   timeToAudioFrame(time: number) {
//     return Math.floor(time * this.audioSetting.sampleRate * this.videoSetting.frameRate.den / this.videoSetting.frameRate.num);
//   }

// }