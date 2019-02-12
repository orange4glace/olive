import { observable, action } from 'mobx';

var next_timeline_item_id = 0;

class TimelineItem {

  static Type = {
    'VIDEO': 'video',
    'AUDIO': 'audio',
    'OBJECT': 'object'
  };

  id = next_timeline_item_id++;
  type: any;

  @observable startTimecode: number;
  @observable endTimecode: number;

  constructor(type: any) {
    this.type = type;
  }

  slice(startTimecode: number, endTimecode: number): TimelineItem {
    return null;
  }

  @action
  setStartTimecode(timecode: number) {
    this.startTimecode = timecode;
  }

  @action
  setEndTimecode(timecode: number) {
    this.endTimecode = timecode;
  }

}

export default TimelineItem;