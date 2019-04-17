import TrackItem from "internal/timeline/track-item";
import Track from "internal/timeline/track";
import { StandardMouseEvent } from "base/view/mouseEvent";
import { IDisposable } from "base/common/lifecycle";

export enum TimelineViewEventType {
  TRACK_ITEM_FOCUSED = 'TRACK_ITEM_FOCUSED',
  TRACK_ITEM_DEFOCUSED = 'TRACK_ITEM_DEFOCUSED',
}

export abstract class TimelineScrollViewState {
  abstract get /*observable*/ startTime(): number;
  abstract get /*observable*/ endTime(): number;
  abstract get /*observable*/ pxPerFrame(): number;
  abstract get /*observable*/ width(): number;
  abstract get unitFrameTime(): number;
  abstract get unitWidth(): number;
}

export interface TimelineViewCoreController {

  updateScrollViewState(
    startTime: number, endTime: number, pxPerFrame: number,
    width: number, unitFrameTime: number, unitWidth: number): void;

  getScrollViewState(): TimelineScrollViewState;

  isTrackItemFocused(track: Track, trackItem: TrackItem): boolean;

  focusTrackItem(track: Track, trackItem: TrackItem): void;
  defocusTrackItem(track: Track, trackItem: TrackItem): void;

  getFocusedTrackItems(): Set<TrackItem>;
  getFocusedTrackItems(track: Track): Set<TrackItem>;
  
  // setMagnetThreshold(px: number): void;
  // getClosestSnappedTime(time: number): number;
  // getSnappedTime(time: number): number;

  getTimeRelativeToTimeline(px: number): number;
  getTimeAmountRelativeToTimeline(px: number): number;
  getPositionRelativeToTimeline(time: number): number;
  getPixelAmountRelativeToTimeline(time: number): number;
  // getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent): number;

  // addEventListener(e: TimelineViewEventType.TRACK_ITEM_FOCUSED | TimelineViewEventType.TRACK_ITEM_DEFOCUSED,
  //     callback: (trackItem: TrackItem) => void): void;
  
  // removeEventListener(e: TimelineViewEventType.TRACK_ITEM_FOCUSED | TimelineViewEventType.TRACK_ITEM_DEFOCUSED,
  //     callback: (trackItem: TrackItem) => void): void;

}