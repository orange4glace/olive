import { Timeline, TimelineBase } from "internal/timeline/timeline";
import { assert } from "base/common/assert";
import TimelineImpl from "internal/timeline/timeline_impl";
import { Postable, postable, PostableEvent, PostableEventBase } from "worker-postable";
import { Event, Emitter } from "base/common/event";
import { ISequence } from "internal/project/sequence/sequence";

export interface TimelineManagerTimelineEvent {
  timeline: Timeline;
}

export interface TimelineManagerPostableEvent {
  timelineID: number;
}

export interface TimelineManager {

  readonly targetTimeline: Timeline;

  getTimeline(id: number): Timeline;
  createTimeline(sequence: ISequence): Timeline;
  setTargetTimeline(timeline: Timeline): void;

  onTargetTimelineChanged: Event<TimelineManagerTimelineEvent>;

}

export interface TimelineManagerBase {

  timelines: Map<number, TimelineBase>;
  targetTimeline: TimelineBase;
}

@Postable
export class TimelineManagerImpl implements TimelineManager, TimelineManagerBase {

  @postable timelines: Map<number, TimelineImpl>;
  @postable targetTimeline: TimelineImpl;

  constructor() {
    this.timelines = new Map();
  }

  getTimeline(id: number): Timeline {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(sequence: ISequence): Timeline {
    const timeline = new TimelineImpl(sequence);
    this.timelines.set(timeline.id, timeline);
    return timeline;
  }

  setTargetTimeline(timeline: TimelineImpl): void {
    this.targetTimeline = timeline;
  }

  private onTargetTimelineChanged_: Emitter<TimelineManagerTimelineEvent> = new Emitter();
  onTargetTimelineChanged: Event<TimelineManagerTimelineEvent> = this.onTargetTimelineChanged_.event;

}