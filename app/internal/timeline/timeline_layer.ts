import { observable, action } from 'mobx';

import TimelineItem from 'internal/timeline/timeline_item';

var next_timeline_layer_id = 0;

class TimelineLayer {

  id = next_timeline_layer_id++;
  @observable name = "layer";
  @observable timelineItems: Array<TimelineItem> = [];
  @observable selectedTimelineItem: TimelineItem = null;

  addTimelineItem(timelineItem: TimelineItem) {
    var index = 0;
    var invalidStart = 0;
    var invalidEnd = 0;
    for (var i = 0; i < this.timelineItems.length; i ++) {
      var item = this.timelineItems[i];
      if (item.endTimecode > timelineItem.startTimecode) break;
      // Calculate overlap
      if (item.endTimecode < timelineItem.startTimecode) continue;
      var overlapStart = Math.max(item.startTimecode, timelineItem.startTimecode);
      var overlapEnd = Math.min(item.endTimecode, timelineItem.endTimecode);

      if (overlapEnd - overlapStart == item.endTimecode - item.startTimecode) {
        // Completely overlap. Remove it.
        invalidStart = Math.min(invalidStart, i);
        invalidEnd = Math.max(invalidEnd, i);
      }
      else if (item.startTimecode == overlapStart) {
        this.timelineItems[i] = item.slice(overlapEnd, item.endTimecode);
      }
      else if (item.endTimecode == overlapEnd) {
        this.timelineItems[i] = item.slice(item.startTimecode, overlapStart);
      }
      else {
        var timelineSlice1 = item.slice(item.startTimecode, overlapStart);
        var timelineSlice2 = item.slice(overlapEnd, item.endTimecode);
        this.timelineItems.splice(i, 1, timelineSlice1, timelineSlice2);
      }
    }
    // Remove invalid timelines
    this.timelineItems.splice(invalidStart, invalidEnd - invalidStart);
    // Insert it
    for (var i = 0; i < this.timelineItems.length; i ++) {
      var item = this.timelineItems[i];
      if (timelineItem.endTimecode < item.startTimecode) break;
      index = i;
    }
    this.timelineItems.splice(index, 0, timelineItem);

    // timelineItem.timelineLayer = this;
  }

  @action
  selectTimelineItem(timelineItem: TimelineItem) {
    this.selectedTimelineItem = timelineItem;
  }

}

export default TimelineLayer;