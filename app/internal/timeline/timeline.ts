import TimelineInterface from 'standard/timeline'
import { Postable, postable } from 'worker-postable';
import { observable, action } from 'mobx'

import Track from './track'

import { EventEmitter2 } from 'eventemitter2'
import { IResource } from 'standard';
import VideoTrackItem from './video-track-item';

@Postable
export default class Timeline implements TimelineInterface {

  @postable totalTime: number;
  @postable currentTime: number;

  @postable tracks: Array<Track>;
  
  updateHandlerTick: number;

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

  createVideoTrackItem(resource: IResource) {
    const result = new VideoTrackItem(resource);
    return result;
  }

}