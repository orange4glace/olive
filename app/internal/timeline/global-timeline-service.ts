import { createDecorator } from "platform/instantiation/common/instantiation";
import { ITimeline } from "internal/timeline/timeline";
import { Event, Emitter } from "base/common/event";

export const IGlobalTimelineService = createDecorator<IGlobalTimelineService>('olive.GlobalTimelineService');

export interface IGlobalTimelineService {

  _serviceBrand: any;

  readonly targetTimeline: ITimeline;

  setTargetTimeline(timeline: ITimeline): void;

  onTargetTimelineChanged: Event<void>;

}