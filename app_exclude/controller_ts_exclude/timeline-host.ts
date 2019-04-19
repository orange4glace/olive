import TrackHost from './track-host'
import { TrackItemHost } from './track-item-host';
import Timeline, { TimelineEvent } from 'internal/timeline/timeline';
import Track from 'internal/timeline/track';
import { observable } from 'window/app-mobx';

type resizeFunction = (dt: number) => number;

export default class TimelineHost {

  timeline: Timeline;

  @observable trackHosts: Array<TrackHost>;
  trackHostMap: Map<Track, TrackHost>;

  snapTimes: Array<number>;
  snapThreshold: number = 0;

  constructor(timeline: Timeline) {
    this.timeline = timeline;
    this.trackHosts = new Array();
    this.trackHostMap = new Map();

    this.addTrackHost = this.addTrackHost.bind(this);
    this.removeTrackHost = this.removeTrackHost.bind(this);

    timeline.tracks.forEach(this.addTrackHost);
    timeline.addEventListener(TimelineEvent.TRACK_ADDED, this.addTrackHost);
    timeline.addEventListener(TimelineEvent.TRACK_REMOVED, this.removeTrackHost);
  }
  
  destructor() {
    this.timeline.removeEventListener(TimelineEvent.TRACK_ADDED, this.addTrackHost);
    this.timeline.removeEventListener(TimelineEvent.TRACK_REMOVED, this.removeTrackHost);
  }

  private addTrackHost(track: Track): TrackHost {
    let trackHost = new TrackHost(track);
    this.trackHosts.push(trackHost);
    this.trackHostMap.set(trackHost.track, trackHost);
    return trackHost;
  }

  private removeTrackHost(track: Track): void {
    let trackHost = this.getTrackHost(track);
    let idx = this.trackHosts.indexOf(trackHost);
    console.assert(idx != -1);
    this.trackHosts.splice(idx, 1);
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