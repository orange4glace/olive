import { Track, TrackBase } from "internal/timeline/track";
import { Event } from "base/common/event";
import { PostableEvent, PostableEventBase } from "worker-postable";
import { SequenceBase } from "internal/project/sequence/sequence";

export interface TimelineTrackEvent {
  readonly track: Track;
  readonly index: number;
}

export interface TimelinePostableStatusEvent {
  currentTime: number;
  currentDateTime: number;
}

export interface TimelineBase {
  
  id: number;
  totalTime: number;
  currentTimePausing: number;
  tracks: Array<TrackBase>;

  sequence: SequenceBase;
}

export interface Timeline {

  /*@postable*/ readonly id: number;
  /*@postable*/ readonly totalTime: number;
  /*@postable*/ readonly currentTime: number;

  /*@postable*/ readonly tracks: Array<Track>;

  /*@observable*/ readonly paused: boolean;

  resume(): void;

  seekTo(time: number): void;
  
  addTrack(): Track;
  getTrackAt(index: number): Track;
  getTrackIndex(track: Track): number;

  readonly onPlay: Event<void>;
  readonly onPause: Event<void>;
  readonly onSeek: Event<void>;
  readonly onTrackAdded: Event<TimelineTrackEvent>;
  readonly onTrackWillRemove: Event<TimelineTrackEvent>;

}