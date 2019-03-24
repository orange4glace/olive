import { Postable, postable } from 'worker-postable';
import { observable, action } from 'mobx'

import Track, { TrackBase } from './track'

import VideoTrackItem from './video-track-item';
import { Resource } from 'internal/resource';
import { EventEmitter2 } from 'eventemitter2';

export enum TimelineEvent {
  TRACK_ADDED = 'TRACK_ADDED',
  TRACK_REMOVED = 'TRACK_REMOVED',
}

export interface TimelineBase {

  totalTime: number;
  currentTime: number;

  tracks: Array<TrackBase>;
}

@Postable
export default class Timeline implements TimelineBase {

  @postable totalTime: number;
  @postable currentTime: number;

  @postable tracks: Array<Track>;

  private ee: EventEmitter2;

  constructor() {
    this.ee = new EventEmitter2();
    this.tracks = [];

    this.currentTime = 17000;
    this.totalTime = 35000;

    this.addTrack();
    this.addTrack();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }

  @action
  addTrack(): Track {
    let track = new Track();
    this.tracks.push(track);
    this.emitEvent(TimelineEvent.TRACK_ADDED, track);
    return track;
  }

  
  // Event Emitter
  addEventListener(type: (TimelineEvent.TRACK_ADDED | TimelineEvent.TRACK_REMOVED),
      callback: (track: Track) => void): void;
  addEventListener(type: TimelineEvent, callback: (...args: any) => void) {
    this.ee.addListener(type, callback);
  }
  
  removeEventListener(type: (TimelineEvent.TRACK_ADDED | TimelineEvent.TRACK_REMOVED),
      callback: (track: Track) => void): void;
      removeEventListener(type: TimelineEvent, callback: (...args: any) => void) {
    this.ee.removeListener(type, callback);
  }
  
  emitEvent(type: (TimelineEvent.TRACK_ADDED | TimelineEvent.TRACK_REMOVED), track: Track): void;
  emitEvent(type: TimelineEvent, ...args: any) {
    this.ee.emit.bind(this.ee, event).apply(this.ee, args);
  }
  
}