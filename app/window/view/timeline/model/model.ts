import { TrackItem } from "internal/timeline/track-item";
import { Track } from "internal/timeline/track";
import { TimelineWidgetGhostModel } from "window/view/timeline/model/ghost";
import { Timeline } from "internal/timeline/timeline";

export abstract class TimelineWidgetScrollViewModel {
  abstract get element(): HTMLDivElement;
  abstract get /*observable*/ startTime(): number;
  abstract get /*observable*/ endTime(): number;
  abstract get /*observable*/ pxPerFrame(): number;
  abstract get /*observable*/ width(): number;
  abstract get unitFrameTime(): number;
  abstract get unitWidth(): number;

  abstract setElement(el: HTMLDivElement): void;
  abstract update(px: number, start: number, end: number): void;
}

export interface TimelineWidgetModel {
  
  readonly timeline: Timeline;

  readonly scrollViewModel: TimelineWidgetScrollViewModel;
  readonly ghostModel: TimelineWidgetGhostModel;

  setCurrentTime(time: number): void;
  /*@observable*/ currentTime: number;

  /*@observable*/ isTrackItemFocused(track: Track, trackItem: TrackItem): boolean;

  focusTrackItem(track: Track, trackItem: TrackItem): void;
  defocusTrackItem(track: Track, trackItem: TrackItem): boolean;

  /*@observable*/ getFocusedTrackItems(): ReadonlySet<TrackItem>;
  
  // setMagnetThreshold(px: number): void;
  // getClosestSnappedTime(time: number): number;
  // getSnappedTime(time: number): number;

  /*@observable*/ getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent): {x: number, y: number};

  // addEventListener(e: TimelineViewEventType.TRACK_ITEM_FOCUSED | TimelineViewEventType.TRACK_ITEM_DEFOCUSED,
  //     callback: (trackItem: TrackItem) => void): void;
  
  // removeEventListener(e: TimelineViewEventType.TRACK_ITEM_FOCUSED | TimelineViewEventType.TRACK_ITEM_DEFOCUSED,
  //     callback: (trackItem: TrackItem) => void): void;

}