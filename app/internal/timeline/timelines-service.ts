import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITimeline, TimelineIdentifier } from "internal/timeline/timeline";
import { Event, Emitter } from "base/common/event";

export const ITimelinesService = createDecorator<ITimelinesService>('olive.timeline.TimelinesService');

export interface ITimelinesService {

  _serviceBrand: any;

  // createTimeline(): ITimeline;
  getTimeline(id: TimelineIdentifier): ITimeline;

}