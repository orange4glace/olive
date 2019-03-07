import { observable } from 'mobx'
import hotkeys from 'hotkeys-js'

import { TrackItemHost } from './controller';

export class TimelineState {

  @observable snap: boolean = true;
  
  NativeTrackItemView: any;

  constructor() {
    hotkeys('s', () => this.snap = !this.snap);

    /*
    setTimeout(() => {
      this.dropTargetTrackItems = new Set();
      let trackItem = new TrackItem();
      trackItem.startTime = 0;
      trackItem.endTime = 2000;
      let hi = new TrackItemHost(trackItem);
      hi.startTime = 0;
      hi.endTime = 2000;
      this.dropTargetTrackItems.add(hi);
      trackItem = new TrackItem();
      trackItem.startTime = 2300;
      trackItem.endTime = 2700;
      hi = new TrackItemHost(trackItem);
      hi.startTime = 2300;
      hi.endTime = 2800;
      this.dropTargetTrackItems.add(hi);
    }, 3000)
    */
  }

}

const TimelineContext = new TimelineState();
export default TimelineContext;