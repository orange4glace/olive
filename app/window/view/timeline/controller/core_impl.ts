import { action, observable } from "window/app-mobx";
import { TimelineViewCoreController, TimelineScrollViewState } from "window/view/timeline/controller/core";
import Timeline from 'internal/timeline/timeline';
import Track, { TrackTrackItemEvent } from "internal/timeline/track";
import TrackItem from "internal/timeline/track-item";
import { Disposable } from "base/common/lifecycle";

class TimelineScrollViewStateImpl extends TimelineScrollViewState {
  @observable startTime_: number;
  @observable endTime_: number;
  @observable pxPerFrame_: number;
  @observable width_: number;
  unitFrameTime_: number;
  unitWidth_: number;

  get startTime() { return this.startTime_; }
  get endTime() { return this.endTime_; }
  get pxPerFrame() { return this.pxPerFrame_; }
  get width() { return this.width_; }
  get unitFrameTime() { return this.unitFrameTime_; }
  get unitWidth() { return this.unitWidth_; }
}

export class TimelineViewCoreControllerImpl extends Disposable implements TimelineViewCoreController {

  private readonly timeline_: Timeline;

  private scrollViewState_: TimelineScrollViewStateImpl;

  private focusedTrackItems_: Map<Track, Set<TrackItem>> = new Map();

  constructor(timeline: Timeline) {
    super();
    this.scrollViewState_ = new TimelineScrollViewStateImpl();

    timeline.tracks.forEach(track => {
      this.focusedTrackItems_.set(track, new Set());
    })
    this._register(timeline.onTrackAdded(e => {
      const track = e.track;
      this.focusedTrackItems_.set(track, new Set());
      track.onTrackItemWillRemove(this.trackItemWillRemoveHandler, this);
    }, this));
    this._register(timeline.onTrackWillRemove(e => {
      this.focusedTrackItems_.delete(e.track);
    }, this));
  }

  private trackItemWillRemoveHandler(e: TrackTrackItemEvent) {

  }

  @action
  updateScrollViewState(
    startTime: number, endTime: number, pxPerFrame: number,
    width: number, unitFrameTime: number, unitWidth: number): void {
    this.scrollViewState_.startTime_ = startTime;
    this.scrollViewState_.endTime_ = endTime;
    this.scrollViewState_.pxPerFrame_ = pxPerFrame;
    this.scrollViewState_.width_ = width;
    this.scrollViewState_.unitFrameTime_ = unitFrameTime;
    this.scrollViewState_.unitWidth_ = unitWidth;
  }

  getScrollViewState(): TimelineScrollViewState {
    return this.scrollViewState_;
  }

  focusTrackItem(track: Track, trackItem: TrackItem): void {
    this.focusedTrackItems_.get(track).add(trackItem);
  }

  isTrackItemFocused(track: Track, trackItem: TrackItem): boolean {

  }

  getTimeRelativeToTimeline(px: number): number {
    return Math.round(this.scrollViewState_.startTime + px / this.scrollViewState_.pxPerFrame);
  }

  getTimeAmountRelativeToTimeline(px: number): number {
    return px / this.scrollViewState_.pxPerFrame;
  }

  getPositionRelativeToTimeline(time: number): number {
    // Touch |endTime| variable so observer can detect the change
    this.scrollViewState_.endTime;
    return Math.floor((time - this.scrollViewState_.startTime) * this.scrollViewState_.pxPerFrame);
  }

  getPixelAmountRelativeToTimeline(time: number): number {
    return time * this.scrollViewState_.pxPerFrame;
  }

  // getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent): number {
  //   return MouseUtil.mousePositionElement(e, this.tracksViewRef.current);
  // }

}