import TimelineView from './timeline-view'
import { TimelineTracksView } from './timeline-tracks-view'
import { TracksView, TrackView, TrackItemView } from './tracks-view'

import { RangeSelectorView } from './addon/range-selector'
import { ResourceDropView } from './addon/resource-drop'

TimelineTracksView.registerUserView(RangeSelectorView);
TrackView.registerUserView(ResourceDropView);

export {
  TimelineView,
  TracksView,
  TrackView,
  TrackItemView
}