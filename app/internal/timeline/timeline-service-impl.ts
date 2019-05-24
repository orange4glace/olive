import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITimeline } from "internal/timeline/timeline";
import TimelineImpl from "internal/timeline/timeline_impl";
import { assert } from "base/common/assert";
import { Event, Emitter } from "base/common/event";
import { ref } from "worker-postable";
import { ITimelineService } from "internal/timeline/timeline-service";

export class TimelineService implements ITimelineService {

  readonly timelines: Map<number, ITimeline> = new Map();
  targetTimeline: ITimeline = null;

  createTimeline(): ITimeline {
    const timeline = new TimelineImpl();
    this.timelines.set(timeline.id, timeline);
    ref(timeline);
    return timeline;
  }

  getTimeline(id: number): ITimeline {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.');
    return timeline;
  }

  setTargetTimeline(timeline: ITimeline): void {
    this.targetTimeline = timeline;
  }

  private onTargetTimelineChanged_: Emitter<void> = new Emitter();
  onTargetTimelineChanged: Event<void> = this.onTargetTimelineChanged_.event;

}