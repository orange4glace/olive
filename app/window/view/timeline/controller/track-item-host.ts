import { observable } from 'window/app-mobx';
import TrackItem from 'internal/timeline/track-item';
import { Drawing } from 'internal/drawing';
import { DrawingHost } from './drawing-host';

let _nextTrackItemID = 0;

export class TrackItemHost {

  readonly id: number;
  trackItem: TrackItem;
  videoDrawingHost: DrawingHost<Drawing>;
  audioDrawingHost: DrawingHost<Drawing>;

  @observable focused: boolean;
  @observable focusedDrawingHost: DrawingHost<Drawing> = null;

  constructor(trackItem: TrackItem) {
    this.id = _nextTrackItemID++;
    this.trackItem = trackItem;
    if (trackItem.videoDrawing)
      this.videoDrawingHost = new DrawingHost(this.trackItem.videoDrawing);
    if (trackItem.audioDrawing)
      this.audioDrawingHost = new DrawingHost(this.trackItem.audioDrawing);
    this.focused = false;
  }

  focusDrawingHost(drawingHost: DrawingHost<Drawing>) {
    console.log('focus',this,drawingHost)
    this.focusedDrawingHost = drawingHost;
  }

}