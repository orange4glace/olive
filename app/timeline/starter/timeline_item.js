import { mobx } from 'starter/common';

var next_timeline_item_id = 0;

class TimelineItem {

  timelineLayer;

  id = next_timeline_item_id++;
  type;

  @mobx.observable startTimecode;
  @mobx.observable endTimecode;
  @mobx.observable objects = [];

  constructor(type) {
    this.type = type;
  }

  slice(startTimecode, endTimecode) {
    
  }

  @mobx.action
  setStartTimecode(timecode) {
    this.startTimecode = timecode;
  }

  @mobx.action
  setEndTimecode(timecode) {
    this.endTimecode = timecode;
  }

  @mobx.action
  addObject(object) {
    this.objects.push(object);
  }

}

TimelineItem.Type = {
  'VIDEO': 'video',
  'AUDIO': 'audio',
  'OBJECT': 'object'
};

export default TimelineItem;