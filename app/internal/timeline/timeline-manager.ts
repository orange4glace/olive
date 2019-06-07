import { Timeline, TimelineBase, ITimeline } from "internal/timeline/timeline";
import { assert } from "base/olive/assert";
import TimelineImpl from "internal/timeline/timeline_impl";
import { Postable, postable, ref } from "worker-postable";
import { Event, Emitter } from "base/common/event";

export interface TimelineManagerTimelineEvent {
  timeline: Timeline;
}

export interface TimelineManagerBase {

  timelines: Map<number, TimelineBase>;
}

export interface TimelineManagerPostableEvent extends TimelineManagerBase {
  timelineID: number;
}

export interface TimelineManager {

  readonly timelines: Map<number, ITimeline>;

  createTimeline(): ITimeline;
  getTimeline(id: number): ITimeline;

}

export interface ITimelineManager extends TimelineManager {}

@Postable
export class TimelineManagerImpl implements TimelineManager {

  @postable timelines: Map<number, TimelineImpl>;

  constructor() {
    this.timelines = new Map();
  }

  getTimeline(id: number): TimelineImpl {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(): TimelineImpl {
    const timeline = new TimelineImpl();
    this.timelines.set(timeline.id, timeline);
    ref(timeline);
    return timeline;
  }

}