export interface TimelineViewManipulationGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineViewManipulationController {
  
  startResizeRight(): void;
  startResizeLeft(): void;
  startMove(): void;

}