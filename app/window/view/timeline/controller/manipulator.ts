import { StandardMouseEvent } from "base/browser/mouseEvent";

export interface TimelineWidgetManipulationGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetManipulatorController {

}