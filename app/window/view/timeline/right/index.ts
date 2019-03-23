import TimelineView from './timeline-view'
import { TimelineTracksView } from './timeline-tracks-view'
import { TracksView, TrackView, TrackItemView } from './tracks-view'

import { RangeSelectorView } from './addon/range-selector'
import { ResourceDropView } from './addon/resource-drop'
import { TrackItemManipulationView } from './addon/track-item-manipulation';

TimelineTracksView.registerUserView(RangeSelectorView);
TrackView.registerUserView(ResourceDropView);
TrackItemView.registerUserView(TrackItemManipulationView);

export {
  TimelineView,
  TracksView,
  TrackView,
  TrackItemView
}