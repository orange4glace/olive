import { observable, action } from 'mobx';

import TimelineLayer from 'internal/timeline/timeline_layer';
import TimelineItem from 'internal/timeline/timeline_item';

export default class Timeline {

  @observable totalTimecode: number;
  @observable currentTimecode: number;
  @observable timelineLayers: Array<TimelineLayer> = [];
  @observable selectedTimelineLayer: TimelineLayer = null;

  constructor() {
    this.totalTimecode = 100;
    this.currentTimecode = 0;
  }

  @action
  addTimelineLayer() {
    var timeline_layer = new TimelineLayer();
    this.timelineLayers.push(timeline_layer);
  }

  @action
  setCurrentTimecode(timecode: number) {
    this.currentTimecode = timecode;
  }

  @action
  selectTimelineLayer(timelineLayer: TimelineLayer) {
    this.selectedTimelineLayer = timelineLayer;
  }

  @action
  moveTimelineItem(timelineLayer: TimelineLayer, timelineItem: TimelineItem,
      startTimecode: number, endTimecode: number) {

  }

  getSelectedTimelineLayer() {
    return this.selectedTimelineLayer;
  }

}