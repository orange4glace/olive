import { TimelineManagerBase } from "internal/timeline/timeline-manager";
import { Posted } from "worker-postable";
import { TimelineRenderer } from "internal/renderer/timeline/timeline";
import { assert } from "base/common/assert";

@Posted('TimelineManagerImpl')
export class TimelineManagerRenderer implements TimelineManagerBase {

  timelines: Map<number, TimelineRenderer>;
  targetTimeline: TimelineRenderer;
  
  getTimeline(id: number): TimelineRenderer {
    const timeline = this.timelines.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }
}