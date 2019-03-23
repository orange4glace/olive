import { Postable, postable } from 'worker-postable';
import { observable, action } from 'mobx'

import Track, { TrackBase } from './track'

import VideoTrackItem from './video-track-item';
import { Resource } from 'internal/resource';

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

  constructor() {
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
    return track;
  }

}