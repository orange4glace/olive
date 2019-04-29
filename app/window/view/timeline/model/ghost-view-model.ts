import { ViewModel } from "window/view/view-model";

export interface TimelineWidgetGhostTrackItemViewModel extends ViewModel {
  /*@observable*/ readonly startTime: number;
  /*@observable*/ readonly endTime: number;
  /*@observable*/ readonly snapLeft: boolean;
  /*@observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetGhostContainerViewModel extends ViewModel {

  /*@observable*/ readonly trackOffset: number;
  /*@observable*/ readonly leftExtend: number;
  /*@observable*/ readonly rightExtend: number;
  /*@observable*/ readonly translation: number;

  addGhostTrackItem(index: number, startTime: number, endTime: number): void;
  getGhostTrackItems(index: number): TimelineWidgetGhostTrackItemViewModel[];
  setTrackOffset(offset: number): void;
  extendLeft(value: number): void;
  extendRight(value: number): void;
  translate(value: number): void;

}

export interface TimelineWidgetGhostViewModel {
  
  /*@observable*/ readonly currentContainer: TimelineWidgetGhostContainerViewModel | null;

  createGhostContainer(): TimelineWidgetGhostContainerViewModel;
  setCurrentContainer(container: TimelineWidgetGhostContainerViewModel): void;

}