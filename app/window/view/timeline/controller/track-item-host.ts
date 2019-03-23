import { observable } from 'window/app-mobx';
import TrackItem from 'internal/timeline/track-item';

let _nextTrackItemID = 0;

export default class TrackItemHost {

  readonly id: number;
  trackItem: TrackItem;

  @observable focused: boolean;

  constructor(trackItem: TrackItem) {
    this.id = _nextTrackItemID++;
    this.trackItem = trackItem;
    this.focused = false;
  }

}