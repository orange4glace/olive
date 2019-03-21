import TrackItem from "internal/timeline/track-item";
import { DrawingHost } from "./drawing-host";

export class TrackItemHost {
  
  trackItem: TrackItem;
  drawingHosts: Set<DrawingHost>

  constructor(trackItem: TrackItem) {
    this.trackItem = trackItem;
    this.drawingHosts = new Set();
  }

  addDrawingHost(drawingHost: DrawingHost) {
    this.drawingHosts.add(drawingHost);
  }

  removeDrawingHost(drawingHost: DrawingHost) {
    console.assert(this.drawingHosts.has(drawingHost), '[PropertyView] no such drawing host', drawingHost);
    this.drawingHosts.delete(drawingHost);
  }

}