// import { TimelineRenderer } from "internal/renderer/base/timeline/timeline";
// import { TimelineManagerBase, TimelineManagerPostableEvent } from "internal/timeline/timeline-manager";
// import { assert } from "base/olive/assert";
// import { Posted, PostedEvent, posted } from "worker-postable";

// @Posted('TimelineManagerImpl')
// export class TimelineManagerRenderer
//     <TimelineRendererT extends TimelineRenderer = TimelineRenderer>
//     implements TimelineManagerBase {

//   @posted timelines: Map<number, TimelineRendererT>;
//   @posted targetTimeline: TimelineRendererT;
  
//   getTimeline(id: number): TimelineRendererT {
//     const timeline = this.timelines.get(id);
//     assert(timeline, 'Timeline ' + id + ' not found.')
//     return timeline;
//   }

// }