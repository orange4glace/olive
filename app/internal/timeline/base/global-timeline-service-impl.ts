import { Event, Emitter } from "base/common/event";
import { IGlobalTimelineService } from "internal/timeline/base/global-timeline-service";
import { ITimeline } from "internal/timeline/base/timeline";

export class GlobalTimelineService implements IGlobalTimelineService {

  _serviceBrand: any;

  targetTimeline: ITimeline = null;

  setTargetTimeline(timeline: ITimeline): void {
    this.targetTimeline = timeline;
    this.onTargetTimelineChanged_.fire();
  }

  private onTargetTimelineChanged_: Emitter<void> = new Emitter();
  onTargetTimelineChanged: Event<void> = this.onTargetTimelineChanged_.event;

}