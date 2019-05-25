import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITimeline } from "internal/timeline/timeline";
import { Event, Emitter } from "base/common/event";

export const ITimelineService = createDecorator<ITimelineService>('olive.TimelineService');

export interface ITimelineService {

  readonly timelines: Map<number, ITimeline>;

  createTimeline(): ITimeline;
  getTimeline(id: number): ITimeline;

}