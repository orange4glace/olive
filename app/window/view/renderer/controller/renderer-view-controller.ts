import { TimelineViewController, TrackItemHost } from "window/view/timeline/controller";
import { computed, observable } from "window/app-mobx";
import app from "internal/app";
import { vec2 } from "gl-matrix";

export class RendererViewController {

  @observable viewWidth: number;
  @observable viewHeight: number;

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

  setViewSize(width: number, height: number) {
    this.viewWidth = width;
    this.viewHeight = height;
  }

  toScreenSize(x: number, y: number): [number, number] {
    let wr = app.project.sequence.screenWidth / this.viewWidth * x;
    let hr = app.project.sequence.screenHeight / this.viewHeight * y;
    return [wr, hr];
  }

  toViewSize(x: number, y: number): [number, number] {
    let wr = this.viewWidth / app.project.sequence.screenWidth * x;
    let hr = this.viewHeight / app.project.sequence.screenHeight * y;
    return [wr, hr]
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