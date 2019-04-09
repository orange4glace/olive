import { observable } from 'window/app-mobx';
import TrackItem from 'internal/timeline/track-item';
import { Drawing } from 'internal/drawing';
import { DrawingHost } from './drawing-host';

let _nextTrackItemID = 0;

export default class TrackItemHost {

  readonly id: number;
  trackItem: TrackItem;
  drawingHost: DrawingHost<Drawing>;

  @observable focused: boolean;

  constructor(trackItem: TrackItem) {
    this.id = _nextTrackItemID++;
    this.trackItem = trackItem;
    this.drawingHost = new DrawingHost(this.trackItem.drawing);
    this.focused = false;
  }

}