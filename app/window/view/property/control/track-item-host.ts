import TrackItem from "internal/timeline/track-item";
import { DrawingHost } from "./drawing-host";
import { Drawing } from "internal/drawing";

export class TrackItemHost {
  
  trackItem: TrackItem;
  drawingHosts: Map<Drawing, DrawingHost>

  constructor(trackItem: TrackItem) {
    this.trackItem = trackItem;
    this.drawingHosts = new Map();

    if (this.trackItem.drawing)
      this.addDrawingHost(this.trackItem.drawing);
  }

  private addDrawingHost(drawing: Drawing) {
    let drawingHost = new DrawingHost(drawing);
    this.drawingHosts.set(drawing, drawingHost);
  }

  private removeDrawingHost(drawing: Drawing) {
    console.assert(this.drawingHosts.has(drawing), '[PropertyView] no such drawing host', drawing);
    this.drawingHosts.delete(drawing);
  }

  getDrawingHost(drawing: Drawing) {
    return this.drawingHosts.get(drawing);
  }

}