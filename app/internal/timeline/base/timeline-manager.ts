import { assert } from "base/olive/assert";
import { Postable, postable, ref } from "worker-postable";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ITimelinesService } from "internal/timeline/base/timelines-service";
import { ITimeline, TimelineIdentifier } from "internal/timeline/base/timeline";
import Timeline, { SerializedTimeline } from "internal/timeline/base/timeline_impl";
import { AudioSetting } from "internal/timeline/base/audio-setting";
import { VideoSetting } from "internal/timeline/base/video-setting";

export interface TimelineManagerTimelineEvent {
  timeline: ITimeline;
}

export interface TimelineManagerPostableEvent {
  timelineID: number;
}

export interface ITimelineManager extends ITimelinesService {

  serialize(): object;

}

export interface SerializedTimelineManager {
  timelines: SerializedTimeline[];
}

@Postable
export class TimelineManagerImpl implements ITimelineManager {

  _serviceBrand: any;

  @postable timelines: Map<TimelineIdentifier, Timeline>;

  constructor() {
    this.timelines = new Map();
  }

  getTimeline(id: TimelineIdentifier): Timeline {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(videoSetting: VideoSetting, audioSetting: AudioSetting): Timeline {
    const timeline = new Timeline(null, videoSetting, audioSetting);
    this.doAddTimeline(timeline);
    return timeline;
  }

  private doAddTimeline(timeline: Timeline): Timeline {
    this.timelines.set(timeline.id, timeline);
    ref(timeline);
    return timeline;
  }

  serialize(): SerializedTimelineManager {
    const timelines: SerializedTimeline[] = [];
    this.timelines.forEach(timeline => {
      timelines.push(timeline.serialize());
    })
    return {
      timelines: timelines
    };
  }

  deserialize(instantiationService: IInstantiationService, obj: SerializedTimelineManager): TimelineManagerImpl {
    const manager = this;
    obj.timelines.forEach(s => {
      const timeline = Timeline.deserialize(instantiationService, s);
      manager.doAddTimeline(timeline);
    })
    return manager;
  }

}