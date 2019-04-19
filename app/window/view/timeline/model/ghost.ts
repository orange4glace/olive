import { Track } from "internal/timeline/track";

export interface TimelineWidgetGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineWidgetGhostContainer {

  /*observable*/ readonly leftExtend: number;
  /*observable*/ readonly rightExtend: number;
  /*observable*/ readonly translation: number;

  addGhostTrackItem(track: Track, startTime: number, endTime: number): void;
  getGhostTrackItems(track: Track): TimelineWidgetGhostTrackItem[];
  extendLeft(value: number): void;
  extendRight(value: number): void;
  translate(value: number): void;

}

export interface TimelineWidgetGhostModel {
  
  createGhostContainer(): TimelineWidgetGhostContainer;
  removeGhostContainer(container: TimelineWidgetGhostContainer): void;

}