import { FrameRate } from "./frame_rate";
import { observable } from "mobx";

export class Project {

  @observable private frameRate_: FrameRate;
  get frameRate() { return this.frameRate_; }

  private timebase_: number;
  get timebase() { return this.timebase_; }

  constructor() {
     this.frameRate_ = new FrameRate(30, 1);
  }

}