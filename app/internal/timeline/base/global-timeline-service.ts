import { createDecorator } from "platform/instantiation/common/instantiation";
import { Event, Emitter } from "base/common/event";
import { ITimeline } from "internal/timeline/base/timeline";

export const IGlobalTimelineService = createDecorator<IGlobalTimelineService>('olive.GlobalTimelineService');

export interface IGlobalTimelineService {

  _serviceBrand: any;

  readonly targetTimeline: ITimeline;

  setTargetTimeline(timeline: ITimeline): void;

  onTargetTimelineChanged: Event<void>;

}