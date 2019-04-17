import { TimelineViewCoreController } from "window/view/timeline/controller/core";
import { TimelineViewGhostController } from "window/view/timeline/controller/ghost";

export interface TimelineViewController {

  readonly core: TimelineViewCoreController;
  readonly ghost: TimelineViewGhostController;

}