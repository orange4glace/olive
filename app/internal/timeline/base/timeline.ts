import { Event } from "base/common/event";
import { ITrack } from "internal/timeline/base/track/track";
import { VideoSetting } from "internal/timeline/base/video-setting";
import { AudioSetting } from "internal/timeline/base/audio-setting";

export type TimelineIdentifier = string;

export interface TimelineTrackEvent {
  readonly track: ITrack;
  readonly index: number;
}

export interface TimelinePostableStatusEvent {
  currentTime: number;
  currentDateTime: number;
}

export interface ITimeline {

  readonly onPlay: Event<void>;
  readonly onPause: Event<void>;
  readonly onSeek: Event<void>;
  readonly onTrackAdded: Event<TimelineTrackEvent>;
  readonly onTrackWillRemove: Event<TimelineTrackEvent>;

  /*@postable*/ readonly id: TimelineIdentifier;
  /*@postable*/ readonly totalTime: number;
  /*@postable*/ readonly currentTime: number;
  
  /*@postable*/ readonly videoSetting: VideoSetting;
  /*@postable*/ readonly audioSetting: AudioSetting;

  /*@postable*/ readonly tracks: Array<ITrack>;

  /*@observable*/ readonly paused: boolean;

  resume(): void;
  pause(): void;

  seekTo(time: number): void;
  
  addTrack(): ITrack;
  getTrackAt(index: number): ITrack;
  getTrackIndex(track: ITrack): number;

  serialize(): object;

}