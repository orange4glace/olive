import { observable } from "mobx";

export class Sequence {
  @observable private screenWidth_: number;
  @observable private screenHeight_: number;

  public get screenWidth() { return this.screenWidth_; }
  public get screenHeight() { return this.screenHeight_; }

  setScreenSize(width: number, height: number) {
    this.screenWidth_ = width;
    this.screenHeight_ = height;
  }
}