import { TimelineManager } from "internal/timeline/manager";
import { Timeline } from "internal/timeline/timeline";
import { assert } from "base/common/assert";
import TimelineImpl from "internal/timeline/timeline_impl";

export class TimelineManagerImpl implements TimelineManager {

  private timelines_: Map<number, Timeline>;

  constructor() {
    this.timelines_ = new Map();
  }

  getTimeline(id: number): Timeline {
    const timeline = this.timelines_.get(id);
    assert(timeline, 'Timeline ' + id + ' not found.')
    return timeline;
  }

  createTimeline(): Timeline {
    const timeline = new TimelineImpl();
    this.timelines_.set(timeline.id, timeline);
    return timeline;
  }

}