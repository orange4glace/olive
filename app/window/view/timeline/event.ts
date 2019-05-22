import * as React from 'react'

import { Timeline } from "internal/timeline/timeline";
import { Track } from "internal/timeline/track/track";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { TimelineWidgetTrackViewModel } from "window/view/timeline/model/track-view-model";
import { TimelineWidgetTrackItemViewModel } from "window/view/timeline/model/track-item-view-model";
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { TimelineWidgetTimelineViewModel } from 'window/view/timeline/model/timeline-view-model';

export interface TimelineWidgetTrackItemEvent { 
  timeline: Timeline;
  track: Track;
  trackItem: TrackItem;
}

export interface TimelineWidgetTrackItemUIEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
  e: StandardMouseEvent;
}

export interface TimelineWidgetTrackItemThumbUIEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
  direction: 'LEFT' | 'RIGHT';
  e: StandardMouseEvent;
}

export interface TimelineWidgetTrackUIEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  e: StandardMouseEvent;
}

export interface TimelineWidgetTimelineUIEvent {
  timelineViewModel: TimelineWidgetTimelineViewModel;
  e: StandardMouseEvent;
}