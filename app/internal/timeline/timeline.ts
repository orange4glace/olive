import { Track, TrackBase } from "internal/timeline/track/track";
import { Event } from "base/common/event";
import { PostableEvent, PostableEventBase } from "worker-postable";
import { IAudioSetting, AudioSettingBase } from "internal/timeline/audio-setting";
import { IVideoSetting, VideoSettingBase } from "internal/timeline/video-setting";

export type TimelineIdentifier = string;

export interface TimelineTrackEvent {
  readonly track: Track;
  readonly index: number;
}

export interface TimelinePostableStatusEvent {
  currentTime: number;
  currentDateTime: number;
}

export interface TimelineBase {
  
  id: TimelineIdentifier;
  totalTime: number;
  currentTimePausing: number;
  tracks: Array<TrackBase>;

  videoSetting: VideoSettingBase;
  audioSetting: AudioSettingBase;

}

export interface Timeline extends TimelineBase {

  readonly onPlay: Event<void>;
  readonly onPause: Event<void>;
  readonly onSeek: Event<void>;
  readonly onTrackAdded: Event<TimelineTrackEvent>;
  readonly onTrackWillRemove: Event<TimelineTrackEvent>;

  /*@postable*/ readonly id: TimelineIdentifier;
  /*@postable*/ readonly totalTime: number;
  /*@postable*/ readonly currentTime: number;
  
  /*@postable*/ readonly videoSetting: IVideoSetting;
  /*@postable*/ readonly audioSetting: IAudioSetting;

  /*@postable*/ readonly tracks: Array<Track>;

  /*@observable*/ readonly paused: boolean;

  resume(): void;
  pause(): void;

  seekTo(time: number): void;
  
  addTrack(): Track;
  getTrackAt(index: number): Track;
  getTrackIndex(track: Track): number;

  serialize(): object;

}

export interface ITimeline extends Timeline {}