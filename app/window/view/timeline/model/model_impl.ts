import { action, observable, autorun } from "window/app-mobx";
import { Timeline } from 'internal/timeline/timeline';
import { Track } from "internal/timeline/track";
import { TrackItem } from "internal/timeline/track-item";
import { Disposable, IDisposable } from "base/common/lifecycle";
import { TimelineWidgetScrollViewModel, TimelineWidgetModel } from "window/view/timeline/model/model";
import { TimelineWidgetGhostModelImpl } from "window/view/timeline/model/ghost-impl";
import { IReactionDisposer } from "mobx";
import { MouseUtil } from "orangeutil";
import { TimelineWidgetEvent } from "window/view/timeline/widget-event";

class TimelineWidgetScrollViewModelImpl extends TimelineWidgetScrollViewModel implements IDisposable {
  private element_: HTMLDivElement;
  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private pxPerFrame_: number;
  @observable private width_: number;
  private unitFrameTime_: number;
  private unitWidth_: number;

  @observable private scrollStart_: number;
  @observable private scrollEnd_: number;

  private timeline_: Timeline;
  private autorunDisposer: IReactionDisposer;

  get element(): HTMLDivElement { return this.element_; }
  get startTime() { return this.startTime_; }
  get endTime() { return this.endTime_; }
  get pxPerFrame() { return this.pxPerFrame_; }
  get width() { return this.width_; }
  get unitFrameTime() { return this.unitFrameTime_; }
  get unitWidth() { return this.unitWidth_; }

  constructor(timeline: Timeline) {
    super();
    this.timeline_ = timeline;

    this.update_ = this.update_.bind(this);
    this.autorunDisposer = autorun(this.update_);
  }

  private update_() {
    let startTime: number, endTime: number,
        pxPerFrame: number, unitFrameTime: number, unitWidth: number;

    const timeline = this.timeline_;
    startTime = Math.floor(timeline.totalTime * this.scrollStart_);
    endTime = Math.ceil(timeline.totalTime * this.scrollEnd_);
    unitFrameTime = 30;
    unitWidth = this.width_ / ((endTime - startTime) / unitFrameTime);
    if (unitWidth <= 0) return;
    let multiplier = [5,2,3,2];
    let multiplierI = 0;
    if (unitWidth > 150) {
      while (true) {
        let cand = unitWidth / multiplier[multiplierI];
        if (cand < 150) break;
        unitWidth = cand;
        unitFrameTime /= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    else {
      while (unitWidth < 150) {
        unitWidth = unitWidth * multiplier[multiplierI];
        unitFrameTime *= multiplier[multiplierI];
        multiplierI = (++multiplierI % multiplier.length);
      }
    }
    pxPerFrame = unitWidth / unitFrameTime;
    unitFrameTime = unitFrameTime;
    unitWidth = unitWidth;

    this.startTime_ = startTime;
    this.endTime_ = endTime;
    this.pxPerFrame_ = pxPerFrame;
    this.unitFrameTime_ = unitFrameTime;
    this.unitWidth_ = unitWidth;
  }

  setElement(el: HTMLDivElement) {
    this.element_ = el;
  }

  @action
  update(px: number, start: number, end: number): void {
    this.width_ = px;
    this.scrollStart_ = start;
    this.scrollEnd_ = end;
  }

  dispose() {
    this.autorunDisposer();
  }
}

export class TimelineWidgetModelImpl extends Disposable implements TimelineWidgetModel {

  readonly timeline: Timeline;

  readonly scrollViewModel: TimelineWidgetScrollViewModelImpl;
  readonly ghostModel: TimelineWidgetGhostModelImpl;

  @observable private focusedTrackItems_: Set<TrackItem> = new Set();
  private trackListener_: Map<Track, IDisposable> = new Map();

  constructor(timeline: Timeline) {
    super();
    this.timeline = timeline;
    this.scrollViewModel = new TimelineWidgetScrollViewModelImpl(timeline);
    this.ghostModel = new TimelineWidgetGhostModelImpl(timeline);

    timeline.tracks.forEach(track => this.trackAddedHandler(track));
    this._register(timeline.onTrackAdded(e => this.trackAddedHandler(e.track), this));
    this._register(timeline.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track), this));
  }

  private trackAddedHandler(track: Track) {
    // this.focusedTrackItems_.set(track, new Set());
    // const listener = track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(track, e.trackItem), this);
    // this.trackListener_.set(track, listener);
  }

  private trackWillRemoveHandler(track: Track) {
    // this.focusedTrackItems_.set(track, null);
    // const listener = this.trackListener_.get(track);
    // listener.dispose();
    // this.trackListener_.set(track, null);
  }

  private trackItemWillRemoveHandler(track: Track, trackItem: TrackItem) {
    this.defocusTrackItem(track, trackItem);
  }

  setCurrentTime(time: number): void {
    this.timeline.setCurrentTime(time);
  }

  get currentTime(): number {
    return this.timeline.currentTime;
  }

  focusTrackItem(track: Track, trackItem: TrackItem): void {
    // this.focusedTrackItems_.get(track).add(trackItem);
    const added = this.focusedTrackItems_.add(trackItem);
    if (added) TimelineWidgetEvent.focusedTrackItemsChanged.fire({
      timeline: this.timeline,
      trackItems: this.focusedTrackItems_
    });
  }

  defocusTrackItem(track: Track, trackItem: TrackItem): boolean {
    // return this.focusedTrackItems_.get(track).delete(trackItem);
    const removed = this.focusedTrackItems_.delete(trackItem);
    if (removed) TimelineWidgetEvent.focusedTrackItemsChanged.fire({
      timeline: this.timeline,
      trackItems: this.focusedTrackItems_
    });
    return removed;
  }

  getFocusedTrackItems(): ReadonlySet<TrackItem> {
    return this.focusedTrackItems_;
  }

  isTrackItemFocused(track: Track, trackItem: TrackItem): boolean {
    // return this.focusedTrackItems_.get(track).has(trackItem);
    return this.focusedTrackItems_.has(trackItem);
  }

  getTimeRelativeToTimeline(px: number): number {
    return Math.round(this.scrollViewModel.startTime + px / this.scrollViewModel.pxPerFrame);
  }

  getTimeAmountRelativeToTimeline(px: number): number {
    return px / this.scrollViewModel.pxPerFrame;
  }

  getPositionRelativeToTimeline(time: number): number {
    // Touch |endTime| variable so observer can detect the change
    this.scrollViewModel.endTime;
    return Math.floor((time - this.scrollViewModel.startTime) * this.scrollViewModel.pxPerFrame);
  }

  getPixelAmountRelativeToTimeline(time: number): number {
    return time * this.scrollViewModel.pxPerFrame;
  }

  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent): {x: number, y: number} {
    return MouseUtil.mousePositionElement(e, this.scrollViewModel.element);
  }

  // getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent): number {
  //   return MouseUtil.mousePositionElement(e, this.tracksViewRef.current);
  // }

}