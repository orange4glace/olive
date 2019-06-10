import * as React from 'react'

import { TimelineWidgetTrackViewModel } from "window/workbench/common/widgets/timeline/model/track-view-model";
import { TimelineWidgetTrackItemViewModel } from "window/workbench/common/widgets/timeline/model/track-item-view-model";
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { TimelineWidgetTimelineViewModel } from 'window/workbench/common/widgets/timeline/model/timeline-view-model';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { ITrack } from 'internal/timeline/base/track/track';
import { ITimeline } from 'internal/timeline/base/timeline';

export interface TimelineWidgetTrackItemEvent { 
  timeline: ITimeline;
  track: ITrack;
  trackItem: ITrackItem;
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