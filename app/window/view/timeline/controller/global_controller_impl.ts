import { TimelineViewGlobalController as ITimelineViewGlobalController } from "./global_controller";
import Timeline from "internal/timeline/timeline";
import { TimelineViewController } from "./controller";
import { TimelineViewControllerImpl } from "./controller_impl";

class TimelineViewGlobalControllerImpl implements ITimelineViewGlobalController {

  private controllers_: Map<Timeline, TimelineViewControllerImpl> = new Map();
  private focusedController_: TimelineViewControllerImpl;

  constructor() {
    
  }

  getTimelineViewController(timeline: Timeline): TimelineViewController {
    let controller = this.controllers_.get(timeline);
    if (controller) return controller as TimelineViewController;
    controller = new TimelineViewControllerImpl();
    this.controllers_.set(timeline, controller);
    return controller;
  }

  getFocusedTimelineViewController() {
    return this.focusedController_ as TimelineViewController;
  }

  focusTimelineViewController(timelineViewController: TimelineViewController) {
    this.focusedController_ = timelineViewController;
  }

}

export const TimelineViewGlobalController = new TimelineViewGlobalControllerImpl();