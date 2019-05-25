import { ITimeline } from "internal/timeline/timeline";
import { Event, Emitter } from "base/common/event";
import { IGlobalTimelineService } from "internal/timeline/global-timeline-service";

export class GlobalTimelineService implements IGlobalTimelineService {

  targetTimeline: ITimeline = null;

  setTargetTimeline(timeline: ITimeline): void {
    this.targetTimeline = timeline;
    this.onTargetTimelineChanged_.fire();
  }

  private onTargetTimelineChanged_: Emitter<void> = new Emitter();
  onTargetTimelineChanged: Event<void> = this.onTargetTimelineChanged_.event;

}