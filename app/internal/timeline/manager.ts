import { Timeline } from "internal/timeline/timeline";

export interface TimelineManager {

  getTimeline(id: number): Timeline;
  createTimeline(): Timeline;

}