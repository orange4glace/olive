import { Postable, postable, PostableEvent } from 'worker-postable';
import { action, observable, computed } from 'mobx'

import { Event, Emitter } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
import { assert } from 'base/olive/assert';
import { getCurrentSystemTime } from 'base/olive/time';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import uuid from 'uuid';
import { SerializedTrack, Track } from 'internal/timeline/base/track/track-impl';
import { SerializedVideoSetting, VideoSetting } from 'internal/timeline/base/video-setting';
import { TimelineIdentifier, TimelineTrackEvent } from 'internal/timeline/base/timeline';
import { WithDisposable } from 'base/olive/lifecycle';
import { MixinBase } from 'base/olive/mixin';
import { WithTimelineBase } from 'internal/timeline/common/timeline';
import { SerializedAudioSetting, AudioSetting } from 'internal/timeline/base/audio-setting';

export interface SerializedTimeline {
  id: TimelineIdentifier;
  totalTime: number;
  currentTime: number;
  videoSetting: SerializedVideoSetting;
  audioSetting: SerializedAudioSetting;
  tracks: SerializedTrack[];
}

@Postable
export default class Timeline extends WithDisposable(WithTimelineBase(MixinBase)) {

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

  public get id() { return this.id_; }
  public get totalTime() { return this.totalTime_; }
  
  protected tracks_: Track[];
  public get tracks() { return this.tracks_; }

  protected videoSetting_: VideoSetting;
  public get videoSetting() { return this.videoSetting_; }
  protected audioSetting_: AudioSetting;
  public get audioSetting() { return this.audioSetting_; }

  @observable currentTimePausing: number;
  @observable currentTimePlaying: number;
  private playingInterval_: number;
  private lastPlaySystemTime: number;

  @observable paused: boolean = true;

  get currentTime() {
    if (this.paused) return this.currentTimePausing;
    else return this.currentTimePlaying;
  }

  constructor(id: TimelineIdentifier, videoSetting: VideoSetting, audioSetting: AudioSetting) {
    super();
    console.log(this);
    this.id_ = id || uuid();

    this.videoSetting_ = videoSetting;
    this.audioSetting_ = audioSetting;

    this.playingCallback_ = this.playingCallback_.bind(this);
    
    this.tracks_ = [];

    this.totalTime_ = 35000;
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
  addTrack(): Track {
    let track = new Track();
    return this.doAddTrack(track);
  }

  @action
  private doAddTrack(track: Track): Track {
    this.tracks.push(track);
    this.onTrackAdded_.fire({
      track: track,
      index: this.tracks.length - 1
    })
    return track;
  }

  getTrackAt(index: number): Track {
    assert(index < this.tracks.length, 'Out of index ' + index + '. Track length = ' + this.tracks.length);
    return this.tracks[index];
  }

  getTrackIndex(track: Track): number {
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

  static deserialize(instantiationService: IInstantiationService, obj: SerializedTimeline): Timeline {
    const timeline = new Timeline(
      obj.id,
      VideoSetting.deserialize(obj.videoSetting),
      AudioSetting.deserialize(obj.audioSetting));
    timeline.setCurrentTimePausing(obj.currentTime);
    timeline.totalTime_ = obj.totalTime;
    obj.tracks.forEach(trackSerial => {
      const track = Track.deserialize(instantiationService, trackSerial);
      timeline.doAddTrack(track);
    console.log('add track ok ', timeline.tracks.length);
    })
    console.log('deserailize ok ', timeline.tracks.length);
    return timeline;
  }

}