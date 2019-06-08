import { Postable, postable, PostableEvent } from 'worker-postable';
import { action, observable, computed } from 'mobx'

import { Event, Emitter } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
import { Timeline, TimelineTrackEvent, TimelineBase, TimelinePostableStatusEvent, TimelineIdentifier } from 'internal/timeline/timeline';
import TrackImpl, { SerializedTrack } from 'internal/timeline/track/track-impl';
import { assert } from 'base/olive/assert';
import { getCurrentSystemTime } from 'base/olive/time';
import { VideoSetting, IVideoSetting, SerializedVideoSetting } from 'internal/timeline/video-setting';
import { AudioSetting, IAudioSetting, SerializedAudioSetting } from 'internal/timeline/audio-setting';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import uuid from 'uuid';

export interface SerializedTimeline {
  id: TimelineIdentifier;
  totalTime: number;
  currentTime: number;
  videoSetting: SerializedVideoSetting;
  audioSetting: SerializedAudioSetting;
  tracks: SerializedTrack[];
}

@Postable
export default class TimelineImpl extends Disposable implements Timeline, TimelineBase {

  private static __next_id = 0;

  private readonly onPlay_: Emitter<void> = this._register(new Emitter<void>());
  readonly onPlay: Event<void> = this.onPlay_.event;

  private readonly onPause_: Emitter<void> = this._register(new Emitter<void>());
  readonly onPause: Event<void> = this.onPause_.event;

  private readonly onSeek_: Emitter<void> = this._register(new Emitter<void>());
  readonly onSeek: Event<void> = this.onSeek_.event;

  private readonly onTrackAdded_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackAdded: Event<TimelineTrackEvent> = this.onTrackAdded_.event;

  private readonly onTrackWillRemove_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackWillRemove: Event<TimelineTrackEvent> = this.onTrackWillRemove_.event;

  @postable id: TimelineIdentifier;
  @postable totalTime: number;
  @postable currentTimePausing: number;

  @postable videoSetting: VideoSetting;
  @postable audioSetting: AudioSetting;

  @observable currentTimePlaying: number;
  private playingInterval_: number;
  private lastPlaySystemTime: number;

  @observable paused: boolean = true;

  get currentTime() {
    if (this.paused) return this.currentTimePausing;
    else return this.currentTimePlaying;
  }

  @postable tracks: Array<TrackImpl>;

  constructor(id: TimelineIdentifier, videoSetting: VideoSetting, audioSetting: AudioSetting) {
    super();
    this.id = id || uuid();

    this.videoSetting = videoSetting;
    this.audioSetting = audioSetting;

    this.playingCallback_ = this.playingCallback_.bind(this);
    
    this.tracks = [];

    this.totalTime = 35000;
    this.seekTo(2000);

    // setTimeout(() => {
    //   this.resume();
    // },3000)
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    const now = Date.now();
    this.currentTimePlaying = this.currentTimePausing;
    this.lastPlaySystemTime = getCurrentSystemTime();
    this.playingInterval_ = requestAnimationFrame(this.playingCallback_);
    this.onPlay_.fire();
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.currentTimePausing = this.currentTimePlaying;
    cancelAnimationFrame(this.playingInterval_);
    this.onPause_.fire();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  private playingCallback_() {
    const now = getCurrentSystemTime();
    const dt = now - this.lastPlaySystemTime;
    this.setCurrentTimePlaying(this.currentTimePausing + this.videoSetting.frameRate.systemTimeToTime(dt));
    this.playingInterval_ = requestAnimationFrame(this.playingCallback_);
  }

  private setCurrentTimePausing(time: number) {
    this.currentTimePausing = time;
  }

  private setCurrentTimePlaying(time: number) {
    this.currentTimePlaying = time;
  }

  seekTo(time: number) {
    this.pause();
    this.setCurrentTimePausing(time);
    this.onSeek_.fire();
  }

  @action
  addTrack(): TrackImpl {
    let track = new TrackImpl();
    return this.doAddTrack(track);
  }

  @action
  private doAddTrack(track: TrackImpl): TrackImpl {
    this.tracks.push(track);
    this.onTrackAdded_.fire({
      track: track,
      index: this.tracks.length - 1
    })
    return track;
  }

  getTrackAt(index: number): TrackImpl {
    assert(index < this.tracks.length, 'Out of index ' + index + '. Track length = ' + this.tracks.length);
    return this.tracks[index];
  }

  getTrackIndex(track: TrackImpl): number {
    const index = this.tracks.indexOf(track);
    assert(index != -1, 'Track ' + track.id + ' not exists in ' + this.id);
    return index;
  }

  serialize(): SerializedTimeline {
    const tracks: SerializedTrack[] = [];
    this.tracks.forEach(track => {
      tracks.push(track.serialize());
    })
    return {
      id: this.id,
      totalTime: this.totalTime,
      currentTime: this.currentTime,
      videoSetting: this.videoSetting.serialize(),
      audioSetting: this.audioSetting.serialize(),
      tracks: tracks
    }
  }

  static deserialize(instantiationService: IInstantiationService, obj: SerializedTimeline): TimelineImpl {
    const timeline = new TimelineImpl(
      obj.id,
      VideoSetting.deserialize(obj.videoSetting),
      AudioSetting.deserialize(obj.audioSetting));
    timeline.setCurrentTimePausing(obj.currentTime);
    timeline.totalTime = obj.totalTime;
    obj.tracks.forEach(trackSerial => {
      const track = TrackImpl.deserialize(instantiationService, trackSerial);
      timeline.doAddTrack(track);
    console.log('add track ok ', timeline.tracks.length);
    })
    console.log('deserailize ok ', timeline.tracks.length);
    return timeline;
  }

}