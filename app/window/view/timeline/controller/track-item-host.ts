import { observable } from 'window/app-mobx';
import TrackItem from 'internal/timeline/track-item';
import { DrawingHost } from 'window/view/property/control/drawing-host';

let _nextTrackItemID = 0;

export default class TrackItemHost {

  readonly id: number;
  trackItem: TrackItem;
  drawingHost: DrawingHost<any>;

  @observable focused: boolean;

  constructor(trackItem: TrackItem) {
    this.id = _nextTrackItemID++;
    this.trackItem = trackItem;
    this.drawingHost = new DrawingHost(this.trackItem.drawing);
    this.focused = false;
  }

}