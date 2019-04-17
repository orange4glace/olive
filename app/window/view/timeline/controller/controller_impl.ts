import { TimelineViewController } from "window/view/timeline/controller/controller";
import { TimelineViewCoreController } from "window/view/timeline/controller/core";
import { TimelineViewGhostController } from "window/view/timeline/controller/ghost";
import Timeline from "internal/timeline/timeline";
import { TimelineViewCoreControllerImpl } from "window/view/timeline/controller/core_impl";
import { TimelineViewGhostControllerImpl } from "window/view/timeline/controller/ghost_impl";

export class TimelineViewControllerImpl implements TimelineViewController {

  private readonly timeline_: Timeline;

  readonly core: TimelineViewCoreController;
  readonly ghost: TimelineViewGhostController;

  constructor(timeline: Timeline) {
    this.timeline_ = timeline;
    this.core = new TimelineViewCoreControllerImpl(timeline);
    this.ghost = new TimelineViewGhostControllerImpl(timeline);
  }

}