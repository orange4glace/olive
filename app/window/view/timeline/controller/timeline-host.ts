import TrackHost from './track-host'
import TrackItemHost from './track-item-host';

import Timeline from 'standard/timeline';
import Track from 'standard/track';

type resizeFunction = (dt: number) => number;

export default class TimelineHost {

  timeline: Timeline;

  trackHosts: Map<Track, TrackHost>;

  snapTimes: Array<number>;
  snapThreshold: number = 0;

  constructor(timeline: Timeline) {
    this.timeline = timeline;
    this.trackHosts = new Map<Track, TrackHost>();
    
    timeline.tracks.forEach(track => {
      const trackHost = this.addTrackHost(track);
    })

    this.timeline.ee.on('addTrack', (track: Track) => {
      this.addTrackHost(track);
    })
    this.timeline.ee.on('removeTrack', (track: Track) => {
      this.removeTrackHost(track);
    })
  }

  addTrackHost(track: Track): TrackHost {
    let trackHost = new TrackHost(track);
    this.trackHosts.set(track, trackHost);
    return trackHost;
  }

  removeTrackHost(track: Track): void {
    this.trackHosts.delete(track);
  }

  getTrackHost(track: Track): TrackHost {
    return this.trackHosts.get(track);
  }

}