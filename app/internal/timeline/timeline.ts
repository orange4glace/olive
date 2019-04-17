import { Postable, postable } from 'worker-postable';
import { observable, action } from 'mobx'

import Track, { TrackBase } from './track'

import VideoTrackItem from './video-track-item';
import { Resource } from 'internal/resource';
import { EventEmitter2 } from 'eventemitter2';
import { Event, Emitter } from 'base/common/event';
import TrackItem from 'internal/timeline/track-item';
import { Disposable } from 'base/common/lifecycle';

export enum TimelineEvent {
  TRACK_ADDED = 'TRACK_ADDED',
  TRACK_REMOVED = 'TRACK_REMOVED',
}

export interface TimelineTrackEvent {
  readonly track: Track;
}

export interface TimelineBase {

  totalTime: number;
  currentTime: number;

  tracks: Array<TrackBase>;
}

@Postable
export default class Timeline extends Disposable implements TimelineBase {

  @postable totalTime: number;
  @postable currentTime: number;

  @postable tracks: Array<Track>;

  private ee: EventEmitter2;

  constructor() {
    super();
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
    this.onTrackAdded_.fire({
      track: track
    })
    return track;
  }


  private readonly onTrackAdded_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackAdded: Event<TimelineTrackEvent> = this.onTrackAdded_.event;

  private readonly onTrackWillRemove_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackWillRemove: Event<TimelineTrackEvent> = this.onTrackWillRemove_.event;

}