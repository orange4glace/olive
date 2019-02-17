import { observable, action } from 'mobx';

var next_timeline_item_id = 0;

export enum TimelineType {
  VIDEO,
  AUDIO,
  MEDIA,
  FIGURE,
  NESTED
}

export default class TimelineItem {

  id = next_timeline_item_id++;
  type: TimelineType;

  @observable startTimecode: number;
  @observable endTimecode: number;

  constructor(type: TimelineType) {
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