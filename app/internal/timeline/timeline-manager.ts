import { Timeline, TimelineBase } from "internal/timeline/timeline";
import { assert } from "base/common/assert";
import TimelineImpl from "internal/timeline/timeline_impl";
import { Postable, postable } from "worker-postable";
import { Event, Emitter } from "base/common/event";

export interface TimelineManagerTimelineEvent {
  timeline: Timeline;
}

export interface TimelineManager {

  readonly targetTimeline: Timeline;

  getTimeline(id: number): Timeline;
  createTimeline(): Timeline;
  setTargetTimeline(timeline: Timeline): void;

  onTargetTimelineChangedEvent: Event<TimelineManagerTimelineEvent>;

}

export interface TimelineManagerBase {
  timelines: Map<number, TimelineBase>;
  targetTimeline: TimelineBase;
}

@Postable
export class TimelineManagerImpl implements TimelineManager, TimelineManagerBase {

  @postable timelines: Map<number, Timeline>;
  @postable targetTimeline: Timeline;

  constructor() {
    this.timelines = new Map();
  }

  getTimeline(id: number): Timeline {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(): Timeline {
    const timeline = new TimelineImpl();
    this.timelines.set(timeline.id, timeline);
    return timeline;
  }

  setTargetTimeline(timeline: Timeline): void {
    this.targetTimeline = timeline;
  }

  private onTargetTimelineChangedEvent_: Emitter<TimelineManagerTimelineEvent> = new Emitter();
  onTargetTimelineChangedEvent: Event<TimelineManagerTimelineEvent> = this.onTargetTimelineChangedEvent_.event;

}