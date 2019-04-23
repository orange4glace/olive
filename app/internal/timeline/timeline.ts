import { Track, TrackBase } from "internal/timeline/track";
import { Event } from "base/common/event";

export interface TimelineTrackEvent {
  readonly track: Track;
}

export interface TimelineBase {
  id: number;
  totalTime: number;
  currentTime: number;
  tracks: Array<TrackBase>;
}

export interface Timeline extends TimelineBase {

  /*@postable*/ readonly id: number;
  /*@postable*/ readonly totalTime: number;
  /*@postable*/ readonly currentTime: number;

  /*@postable*/ readonly tracks: Array<Track>;

  setCurrentTime(time: number): void;
  
  addTrack(): Track;
  getTrackAt(index: number): Track;
  getTrackIndex(track: Track): number;

  readonly onTrackAdded: Event<TimelineTrackEvent>;
  readonly onTrackWillRemove: Event<TimelineTrackEvent>;

}