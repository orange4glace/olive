import ITimeline from 'standard/timeline'
import { Postable, postable } from 'worker-postable';
import { observable, action } from 'mobx'

import Track, { TrackBase } from './track'

import { EventEmitter2 } from 'eventemitter2'
import VideoTrackItem from './video-track-item';
import { Resource } from 'internal/resource';

export interface TimelineBase {

  totalTime: number;
  currentTime: number;

  tracks: Array<TrackBase>;
}

@Postable
export default class Timeline implements TimelineBase, ITimeline {

  @postable totalTime: number;
  @postable currentTime: number;

  @postable tracks: Array<Track>;

  ee: EventEmitter2;

  constructor() {
    this.ee = new EventEmitter2();
    this.tracks = [];

    this.currentTime = 17000;
    this.totalTime = 35000;

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
    this.ee.emit('addTrack', track);
    return track;
  }

  createVideoTrackItem(resource: Resource) {
    const result = new VideoTrackItem(resource);
    return result;
  }

}