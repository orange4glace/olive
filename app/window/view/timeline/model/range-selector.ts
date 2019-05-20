import { observable, action } from "window/app-mobx";

export interface ITimelineWidgetRangeSelector {

  /*@observable*/ readonly active: boolean;

  /*@observable*/ readonly top: number;
  /*@observable*/ readonly left: number;
  /*@observable*/ readonly width: number;
  /*@observable*/ readonly height: number;

  setSize(top: number, left: number, width: number, height: number): void;
  setActive(value: boolean): void;

}

export class TimelineWidgetRangeSelector implements ITimelineWidgetRangeSelector {

  @observable active: boolean;

  @observable top: number;
  @observable left: number;
  @observable width: number;
  @observable height: number;

  @action
  setSize(top: number, left: number, width: number, height: number): void {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  @action
  setActive(value: boolean) {
    this.active = value;
  }

}