import { StandardMouseEvent } from "base/view/mouseEvent";

export interface TimelineWidgetManipulationGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetManipulatorController {
  
  startResizeRight(e: StandardMouseEvent): void;
  startResizeLeft(e: StandardMouseEvent): void;
  startMove(e: StandardMouseEvent): void;

}