import Track from './track'
import TrackItem from './track-item'

import { EventEmitter2 } from 'eventemitter2'

export default interface Timeline {
  totalTime: number;
  currentTime: number;

  tracks: Array<Track>;
  ee: EventEmitter2;
  
  getCurrentTime(): number;
  setCurrentTime(time: number): void;
  addTrack(): Track;
}