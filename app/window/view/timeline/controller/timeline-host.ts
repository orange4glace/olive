import TrackHost from './track-host'
import TrackItemHost from './track-item-host';
import Timeline from 'internal/timeline/timeline';
import Track from 'internal/timeline/track';
import { observable } from 'window/app-mobx';

type resizeFunction = (dt: number) => number;

export default class TimelineHost {

  timeline: Timeline;

  @observable trackHosts: Set<TrackHost>;
  trackHostMap: Map<Track, TrackHost>;

  snapTimes: Array<number>;
  snapThreshold: number = 0;

  constructor(timeline: Timeline) {
    this.timeline = timeline;
    this.trackHosts = new Set();
    this.trackHostMap = new Map();
  }

  addTrackHost(trackHost: TrackHost): TrackHost {
    this.trackHosts.add(trackHost);
    this.trackHostMap.set(trackHost.track, trackHost);
    return trackHost;
  }

  removeTrackHost(trackHost: TrackHost): void {
    this.trackHosts.delete(trackHost);
    this.trackHostMap.delete(trackHost.track);
  }

  getTrackHost(track: Track): TrackHost {
    return this.trackHostMap.get(track);
  }

  defocusAllTrackItemHosts(): void {
    this.trackHosts.forEach(trackHost => {
      trackHost.defocusAllTrackItemHosts();
    })
  }

}