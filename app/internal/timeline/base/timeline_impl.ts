import { Postable } from 'worker-postable';
import { action, observable } from 'mobx'

import { Event, Emitter } from 'base/common/event';
import { IDisposable, dispose } from 'base/common/lifecycle';
import { assert } from 'base/olive/assert';
import { getCurrentSystemTime } from 'base/olive/time';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import uuid from 'uuid';
import { SerializedTrack, Track } from 'internal/timeline/base/track/track-impl';
import { SerializedVideoSetting, VideoSetting } from 'internal/timeline/base/video-setting';
import { TimelineIdentifier, TimelineTrackEvent, ITimeline } from 'internal/timeline/base/timeline';
import { WithDisposable, DisposableMap, newDisposableMap } from 'base/olive/lifecycle';
import { MixinBase } from 'base/olive/mixin';
import { WithTimelineBase } from 'internal/timeline/common/timeline';
import { SerializedAudioSetting, AudioSetting } from 'internal/timeline/base/audio-setting';
import { Timebase } from 'internal/timeline/base/timebase';
import { TrackItem } from 'internal/timeline/base/track-item/track-item-impl';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';

export interface SerializedTimeline {
  id: TimelineIdentifier;
  totalTime: number;
  currentTime: number;
  videoSetting: SerializedVideoSetting;
  audioSetting: SerializedAudioSetting;
  tracks: SerializedTrack[];
}

@Postable
export default class Timeline extends WithDisposable(WithTimelineBase(MixinBase)) implements ITimeline {

  private static __next_id = 0;

  private readonly onPlay_: Emitter<void> = this._register(new Emitter<void>());
  readonly onPlay: Event<void> = this.onPlay_.event;
  private readonly onPause_: Emitter<void> = this._register(new Emitter<void>());
  readonly onPause: Event<void> = this.onPause_.event;
  private readonly onSeek_: Emitter<void> = this._register(new Emitter<void>());
  readonly onSeek: Event<void> = this.onSeek_.event;
  private readonly onDidChangeDuration_: Emitter<void> = this._register(new Emitter<void>());
  public readonly onDidChangeDuration = this.onDidChangeDuration_.event;
  private readonly onDidChangeCurrentTime_: Emitter<void> = this._register(new Emitter<void>());
  public readonly onDidChangeCurrentTime = this.onDidChangeCurrentTime_.event;
  private readonly onTrackAdded_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackAdded: Event<TimelineTrackEvent> = this.onTrackAdded_.event;
  private readonly onTrackWillRemove_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackWillRemove: Event<TimelineTrackEvent> = this.onTrackWillRemove_.event;

  public get id() { return this.id_; }
  public get totalTime() { return this.totalTime_; }
  
  protected tracks_: Track[];
  public get tracks() { return this.tracks_; }

  private trackDisposables_: DisposableMap<Track, IDisposable[]>;

  protected videoSetting_: VideoSetting;
  public get videoSetting() { return this.videoSetting_; }
  protected audioSetting_: AudioSetting;
  public get audioSetting() { return this.audioSetting_; }

  private resumedTime_: number;
  private currentTime_: number;
  private playingInterval_: number;
  private lastPlaySystemTime: number;

  @observable paused: boolean = true;

  get currentTime() {
    return this.currentTime_;
  }

  constructor(id: TimelineIdentifier, videoSetting: VideoSetting, audioSetting: AudioSetting) {
    super();
    this.id_ = id || uuid();

    this.trackDisposables_ = this._register(newDisposableMap<any, any>());

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
    // this.currentTimePlaying = this.currentTimePausing;
    this.resumedTime_ = this.currentTime;
    this.lastPlaySystemTime = getCurrentSystemTime();
    this.playingInterval_ = requestAnimationFrame(this.playingCallback_);
    this.onPlay_.fire();
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    // this.currentTimePausing = this.currentTimePlaying;
    cancelAnimationFrame(this.playingInterval_);
    this.onPause_.fire();
  }

  private setCurrentTime(time: number) {
    this.currentTime_ = time;
    this.onDidChangeCurrentTime_.fire();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  private playingCallback_() {
    const now = getCurrentSystemTime();
    const dt = now - this.lastPlaySystemTime;
    this.setCurrentTime(this.resumedTime_ + this.videoSetting.frameRate.systemTimeToTime(dt));
    this.playingInterval_ = requestAnimationFrame(this.playingCallback_);
  }

  // private setCurrentTimePausing(time: number) {
  //   this.currentTimePausing = time;
  // }

  // private setCurrentTimePlaying(time: number) {
  //   this.currentTimePlaying = time;
  // }

  seekTo(time: number) {
    this.pause();
    this.setCurrentTime(time);
    this.onSeek_.fire();
  }

  @action
  addTrack(): Track {
    let track = new Track(new Timebase(this.videoSetting.frameRate.num, this.videoSetting.frameRate.den));
    return this.doAddTrack(track);
  }

  @action
  private doAddTrack(track: Track): Track {
    this.tracks.push(track);
    this.registerTrackListeners(track);
    this.onTrackAdded_.fire({
      track: track,
      index: this.tracks.length - 1
    })
    return track;
  }

  removeTrack(track: Track): boolean {
    return this.doRemoveTrack(track);
  }

  private doRemoveTrack(track: Track): boolean {
    const trackIndex = this.getTrackIndex(track);
    if (trackIndex == -1) {
      console.warn('Track not found! ' + track.id);
      return false;
    }
    const disposables = this.trackDisposables_.get(track);
    this.trackDisposables_.delete(track);
    dispose(disposables);
    this.tracks_.splice(trackIndex, 1);
    return true;
  }

  private registerTrackListeners(track: Track) {
    const disposables: IDisposable[] = [];
    disposables.push(track.onTrackItemTimeChanged(e => this.updateDuration(e.trackItem)));
    disposables.push(track.onTrackItemAdded(e => this.updateDuration(e.trackItem)));
  }

  private updateDuration(trackItem: ITrackItem) {
    if (this.totalTime_ < trackItem.time.end) {
      this.setDuration(trackItem.time.end + 300);
    }
  }

  setDuration(duration: number) {
    this.totalTime_ = duration;
    this.onDidChangeDuration_.fire();
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
    timeline.setCurrentTime(obj.currentTime);
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