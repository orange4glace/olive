import { createDecorator } from "platform/instantiation/common/instantiation";
import { TimelineIdentifier, ITimeline } from "internal/timeline/base/timeline";

export const ITimelinesService = createDecorator<ITimelinesService>('olive.timeline.TimelinesService');

export interface ITimelinesService {

  _serviceBrand: any;

  // createTimeline(): ITimeline;
  getTimeline(id: TimelineIdentifier): ITimeline;

}