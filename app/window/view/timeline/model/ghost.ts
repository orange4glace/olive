import { Track } from "internal/timeline/track";

export interface TimelineWidgetGhostTrackItem {
  /*@observable*/ readonly startTime: number;
  /*@observable*/ readonly endTime: number;
  /*@observable*/ readonly snapLeft: boolean;
  /*@observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetGhostContainer {

  /*@observable*/ readonly trackOffset: number;
  /*@observable*/ readonly leftExtend: number;
  /*@observable*/ readonly rightExtend: number;
  /*@observable*/ readonly translation: number;

  addGhostTrackItem(index: number, startTime: number, endTime: number): void;
  getGhostTrackItems(index: number): TimelineWidgetGhostTrackItem[];
  setTrackOffset(offset: number): void;
  extendLeft(value: number): void;
  extendRight(value: number): void;
  translate(value: number): void;

}

export interface TimelineWidgetGhostModel {
  
  /*@observable*/ readonly currentContainer: TimelineWidgetGhostContainer | null;

  createGhostContainer(): TimelineWidgetGhostContainer;
  setCurrentContainer(container: TimelineWidgetGhostContainer): void;

}