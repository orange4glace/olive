import Track from "internal/timeline/track";

export interface TimelineViewGhostTrackItem {
  /*observable*/ readonly startTime: number;
  /*observable*/ readonly endTime: number;
  /*observable*/ readonly snapLeft: boolean;
  /*observable*/ readonly snapRight: boolean;
}

export interface TimelineViewGhostContainer {

  /*observable*/ readonly leftExtend: number;
  /*observable*/ readonly rightExtend: number;
  /*observable*/ readonly translation: number;

  addGhostTrackItem(track: Track, startTime: number, endTime: number): void;
  getGhostTrackItems(track: Track): TimelineViewGhostTrackItem[];
  extendLeft(value: number): void;
  extendRight(value: number): void;
  translate(value: number): void;

}

export interface TimelineViewGhostController {
  
  createGhostContainer(): TimelineViewGhostContainer;
  removeGhostContainer(container: TimelineViewGhostContainer): void;

}