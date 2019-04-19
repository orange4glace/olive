export interface TimelineWidgetManipulationGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetManipulatorController {
  
  startResizeRight(): void;
  startResizeLeft(): void;
  startMove(): void;

}