import { TimelineBase, TimelinePostableStatusEvent, TimelineIdentifier } from "internal/timeline/common/timeline";
import { PostedEvent, posted, Posted } from "worker-postable";
import { TrackRenderer } from "internal/renderer/base/timeline/track/track";
import { VideoSettingRenderer } from "internal/renderer/base/timeline/video-setting";
import { AudioSettingRenderer } from "internal/renderer/base/timeline/audio-setting";

@Posted('TimelineImpl')
export class TimelineRenderer
    <TrackRendererT extends TrackRenderer = TrackRenderer>
    implements TimelineBase {

  @posted id: TimelineIdentifier;

  @posted videoSetting: VideoSettingRenderer;
  @posted audioSetting: AudioSettingRenderer;
  @posted tracks: Array<TrackRendererT>;

  @posted totalTime: number;
  @posted currentTimePausing: number;

  audioFrameToTime(frame: number) {
    return this.videoSetting.frameRate.millisecondToTime(
        Math.floor(frame / this.audioSetting.sampleRate * 1000));
  }

  timeToAudioFrame(time: number) {
    return Math.floor(time * this.audioSetting.sampleRate * this.videoSetting.frameRate.den / this.videoSetting.frameRate.num);
  }
  
}