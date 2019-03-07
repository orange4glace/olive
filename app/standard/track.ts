import TrackItem from './track-item'
import { EventEmitter2 } from 'eventemitter2';

export default interface Track {

  readonly id: number;
  trackItems: Set<TrackItem>;
  ee: EventEmitter2;

  addTrackItem(trackItem: TrackItem): void;
  removeTrackItem(trackItem: TrackItem): void;
  getTrackItemAt(time: number): void;
  setTrackItemTime(trackItem: TrackItem, startTime: number, endTime: number): void;
  clearTime(startTime: number, endTime: number): void;
  link(trackItem: TrackItem): void;
  unlink(trackItem: TrackItem): void;

}