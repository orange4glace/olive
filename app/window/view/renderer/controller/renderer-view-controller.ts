import { TimelineViewController, TrackItemHost } from "window/view/timeline/controller";
import { computed } from "window/app-mobx";

export class RendererViewController {

  timelineViewController: TimelineViewController;

  @computed get trackItemHost(): TrackItemHost {
    let controller = this.timelineViewController;
    if (!controller) return null;
    let focusedTrackItemHost: TrackItemHost = null;
    let count = 0;
    controller.timelineHost.trackHosts.forEach(trackHost => {
      if (trackHost.focusedTrackItemHosts.size)
        focusedTrackItemHost = trackHost.focusedTrackItemHosts.values().next().value;
      count += trackHost.focusedTrackItemHosts.size;
    })
    if (count > 1) return null;
    return focusedTrackItemHost;
  }

  constructor(timelineViewController: TimelineViewController) {
    this.timelineViewController = timelineViewController;
  }

  toScreenSize(px: number) {
    return px;
  }

  // getDrawingAt(x: number, y: number): Drawing {
  //   const currentTime = this.timeline.currentTime;
  //   let ret: Drawing = null;
  //   this.timelineViewController.timelineHost.trackHosts.forEach(trackHost => {
      
  //   })
  //   this.timeline.tracks.forEach(track => {
  //     if (ret) return;
  //     const trackItem = track.getTrackItemAt(currentTime);
  //     if (!trackItem) return;
  //     const drawing = trackItem.drawing;
  //     if (!drawing) return;
  //     if (drawing.testPoint(x, y))
  //       ret = drawing;
  //   })
  //   return ret;
  // }

}