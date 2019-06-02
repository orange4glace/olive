import { Timeline, TimelineBase, ITimeline } from "internal/timeline/timeline";
import { assert } from "base/olive/assert";
import TimelineImpl from "internal/timeline/timeline_impl";
import { Postable, postable } from "worker-postable";
import { Event, Emitter } from "base/common/event";

export interface TimelineManagerTimelineEvent {
  timeline: Timeline;
}

export interface TimelineManagerBase {

  timelines: Map<number, TimelineBase>;
  targetTimeline: TimelineBase;
}

export interface TimelineManagerPostableEvent extends TimelineManagerBase {
  timelineID: number;
}

export interface TimelineManager {

  readonly timelines: Map<number, ITimeline>;
  readonly targetTimeline: Timeline;

  getTimeline(id: number): Timeline;
  setTargetTimeline(timeline: Timeline): void;

  onTargetTimelineChanged: Event<TimelineManagerTimelineEvent>;

}

export interface ITimelineManager extends TimelineManager {}

@Postable
export class TimelineManagerImpl implements TimelineManager {

  @postable timelines: Map<number, TimelineImpl>;
  @postable targetTimeline: TimelineImpl;

  constructor() {
    this.timelines = new Map();

    this.setTargetTimeline(this.createTimeline());
    
  }

  getTimeline(id: number): TimelineImpl {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(): TimelineImpl {
    const timeline = new TimelineImpl();
    this.timelines.set(timeline.id, timeline);
    return timeline;
  }

  setTargetTimeline(timeline: TimelineImpl): void {
    this.targetTimeline = timeline;
  }

  private onTargetTimelineChanged_: Emitter<TimelineManagerTimelineEvent> = new Emitter();
  onTargetTimelineChanged: Event<TimelineManagerTimelineEvent> = this.onTargetTimelineChanged_.event;

}