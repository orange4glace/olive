import { observable } from 'mobx'
import hotkeys from 'hotkeys-js'

import TrackItemHost from './track-item-host';

export class _TimelineState {

  @observable snap: boolean = true;
  
  NativeTrackItemView: any;

  constructor() {

  }

}

const TimelineState = new _TimelineState();
export default TimelineState;