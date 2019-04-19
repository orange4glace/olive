import { Postable, postable } from 'worker-postable';
import { action } from 'mobx'

import { EventEmitter2 } from 'eventemitter2';
import { Event, Emitter } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
import { Timeline, TimelineTrackEvent } from 'internal/timeline/timeline';
import TrackImpl from 'internal/timeline/track-impl';

@Postable
export default class TimelineImpl extends Disposable implements Timeline {

  private static __next_id = 0;

  @postable id: number;
  @postable totalTime: number;
  @postable currentTime: number;

  @postable tracks: Array<TrackImpl>;

  constructor() {
    super();
    this.id = TimelineImpl.__next_id++;
    
    this.tracks = [];

    this.currentTime = 17000;
    this.totalTime = 35000;

    this.addTrack();
    this.addTrack();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }

  @action
  addTrack(): TrackImpl {
    let track = new TrackImpl();
    this.tracks.push(track);
    this.onTrackAdded_.fire({
      track: track
    })
    return track;
  }


  private readonly onTrackAdded_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackAdded: Event<TimelineTrackEvent> = this.onTrackAdded_.event;

  private readonly onTrackWillRemove_: Emitter<TimelineTrackEvent> = this._register(new Emitter<TimelineTrackEvent>());
  readonly onTrackWillRemove: Event<TimelineTrackEvent> = this.onTrackWillRemove_.event;

}