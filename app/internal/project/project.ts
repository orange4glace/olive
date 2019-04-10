import { FrameRate } from "./frame_rate";
import { observable } from "mobx";
import { Sequence } from "./sequence";
import { Postable } from "worker-postable";

@Postable
export class Project {

  @observable private frameRate_: FrameRate;
  get frameRate() { return this.frameRate_; }

  private timebase_: number;
  get timebase() { return this.timebase_; }

  sequence: Sequence;

  constructor() {
    this.frameRate_ = new FrameRate(30, 1);
    this.sequence = new Sequence();
    this.sequence.setScreenSize(1080, 720);
  }

}