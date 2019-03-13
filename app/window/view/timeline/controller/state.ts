import { observable } from 'window/app-mobx';
import hotkeys from 'hotkeys-js'

import TrackItemHost from './track-item-host';
import TimelineViewController from './controller';

export class _TimelineState {

  @observable snap: boolean = true;
  @observable focusedTimelineViewController: TimelineViewController;
  
  NativeTrackItemView: any;

  constructor() {

  }

  setFocusedTimelineViewController(controller: TimelineViewController) {
    this.focusedTimelineViewController = controller;
  }

}

const TimelineViewState = new _TimelineState();
export default TimelineViewState;