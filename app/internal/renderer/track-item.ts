import { ITrackItem } from './worker-postable-generated'

export default class TrackItem implements ITrackItem {

  startTime: number;
  endTime: number;
  next: TrackItem;
  prev: TrackItem;

}