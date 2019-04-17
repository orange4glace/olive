import Timeline from "internal/timeline/timeline";
import { TimelineViewController } from "./controller";

export interface TimelineViewGlobalController {

  getTimelineViewController(timeline: Timeline): TimelineViewController;
  getFocusedTimelineViewController(): TimelineViewController;
  focusTimelineView(timeline: Timeline): void;

}