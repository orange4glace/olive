import { mobx } from 'starter/common';

import TimelineLayer from 'timeline/starter/timeline_layer';
import TimelineItem from 'timeline/starter/timeline_item';

class Timeline {

  @mobx.observable totalTimecode;
  @mobx.observable currentTimecode;
  @mobx.observable timelineLayers = [];
  @mobx.observable selectedTimelineLayer = null;

  constructor() {
    this.totalTimecode = 100;
    this.currentTimecode = 0;
  }

  @mobx.action
  addTimelineLayer() {
    var timeline_layer = new TimelineLayer(this);
    this.timelineLayers.push(timeline_layer);
  }

  createTimelineItem() {
    return new TimelineItem();
  }

  @mobx.action
  setCurrentTimecode(timecode) {
    this.currentTimecode = timecode;
  }

  @mobx.action
  selectTimelineLayer(timelineLayer) {
    this.selectedTimelineLayer = timelineLayer;
  }

  getSelectedTimelineLayer() {
    return this.selectedTimelineLayer;
  }

}

const timeline = new Timeline();

export default timeline;