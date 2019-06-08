import { Timeline, TimelineBase, ITimeline, TimelineIdentifier } from "internal/timeline/timeline";
import { assert } from "base/olive/assert";
import TimelineImpl, { SerializedTimeline } from "internal/timeline/timeline_impl";
import { Postable, postable, ref } from "worker-postable";
import { Event, Emitter } from "base/common/event";
import { VideoSetting, IVideoSetting } from "internal/timeline/video-setting";
import { AudioSetting, IAudioSetting } from "internal/timeline/audio-setting";
import { ITimelinesService } from "internal/timeline/timelines-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface TimelineManagerTimelineEvent {
  timeline: Timeline;
}

export interface TimelineManagerBase {

  timelines: Map<number, TimelineBase>;
}

export interface TimelineManagerPostableEvent extends TimelineManagerBase {
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

  @postable timelines: Map<TimelineIdentifier, TimelineImpl>;

  constructor() {
    this.timelines = new Map();
  }

  getTimeline(id: TimelineIdentifier): TimelineImpl {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(videoSetting: VideoSetting, audioSetting: AudioSetting): TimelineImpl {
    const timeline = new TimelineImpl(null, videoSetting, audioSetting);
    this.doAddTimeline(timeline);
    return timeline;
  }

  private doAddTimeline(timeline: TimelineImpl): TimelineImpl {
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
      const timeline = TimelineImpl.deserialize(instantiationService, s);
      manager.doAddTimeline(timeline);
    })
    return manager;
  }

}