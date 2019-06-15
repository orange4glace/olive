import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { ITrack } from 'internal/timeline/base/track/track';
import { ITimeline } from 'internal/timeline/base/timeline';

export interface TimelineWidgetTrackItemEvent { 
  timeline: ITimeline;
  track: ITrack;
  trackItem: ITrackItem;
}

export interface TimelineWidgetTrackItemUIEvent {
  track: ITrack;
  trackItem: ITrackItem;
  e: StandardMouseEvent;
}

export interface TimelineWidgetTrackItemThumbUIEvent {
  track: ITrack;
  trackItem: ITrackItem;
  direction: 'LEFT' | 'RIGHT';
  e: StandardMouseEvent;
}

export interface TimelineWidgetTrackUIEvent {
  track: ITrack;
  e: StandardMouseEvent;
}

export interface TimelineWidgetTimelineUIEvent {
  timeline: ITimeline;
  e: StandardMouseEvent;
}