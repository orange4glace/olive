import { observable } from 'window/app-mobx';

import TrackItem from 'standard/track-item'

let _nextTrackItemID = 0;

export default class TrackItemHost {

  readonly id: number;
  trackItem: TrackItem;

  @observable startTime: number;
  @observable endTime: number;

  @observable startTimeActive: number;
  @observable endTimeActive: number;

  startBoundaryTime: number = -Infinity;
  endBoundaryTime: number = Infinity;

  @observable private focused_: boolean;
  get focused() { return this.focused_; }
  @observable active: boolean;

  @observable snapped: string;

  constructor(trackItem: TrackItem) {
    this.id = _nextTrackItemID++;
    this.trackItem = trackItem;
    if (trackItem) this.startTime = trackItem.startTime;
    if (trackItem) this.endTime = trackItem.endTime;
    this.focused_ = false;
    this.snapped = 'none';
  }

  activate() {
    this.startTimeActive = this.startTime;
    this.endTimeActive = this.endTime;
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  setFocus(value: boolean) {
    this.focused_ = value;
  }

}