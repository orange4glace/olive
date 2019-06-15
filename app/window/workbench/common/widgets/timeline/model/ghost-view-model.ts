// import { ViewModel } from "window/view/view-model";

// export interface TimelineGhostTrackItemView extends ViewModel {
//   /*@observable*/ readonly startTime: number;
//   /*@observable*/ readonly endTime: number;
// }

// export interface TimelineGhostContainerView extends ViewModel {

//   /*@observable*/ readonly trackOffset: number;
//   /*@observable*/ readonly maxTrackOffset: number;
//   /*@observable*/ readonly minTrackOffset: number;
//   /*@observable*/ readonly leftExtend: number;
//   /*@observable*/ readonly rightExtend: number;

//   /*@observable*/ readonly magnetTime: number;
//   /*@observable*/ readonly magnetTimePx: number;
//   /*@observable*/ readonly trackMagnetFlag: ReadonlyArray<boolean>;
//   /*@observable*/ readonly indicatorMagnetFlag: boolean;

//   addGhostTrackItem(index: number, startTime: number, endTime: number): void;
//   getGhostTrackItems(index: number): TimelineGhostTrackItemView[];
//   setTrackOffset(offset: number): void;
//   setMaxTrackOffset(offset: number): void;
//   setMinTrackOffset(offset: number): void;
//   extendLeft(value: number): void;
//   extendRight(value: number): void;
//   translate(value: number): void;

// }

// export interface TimelineWidgetGhostViewModel {
  
//   /*@observable*/ readonly currentContainer: TimelineWidgetGhostContainerViewModel | null;

//   createGhostContainer(): TimelineWidgetGhostContainerViewModel;
//   setCurrentContainer(container: TimelineWidgetGhostContainerViewModel): void;

// }