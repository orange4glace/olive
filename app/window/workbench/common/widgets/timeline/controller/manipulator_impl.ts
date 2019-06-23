import { TimelineWidgetManipulatorController } from "window/workbench/common/widgets/timeline/controller/manipulator";
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { InterruptableMouseMoveMonitor } from "window/view/common/interruptable-mouse-move-monitor";
import { TimelineWidgetTrackItemViewModel, TimelineTrackItemView } from "window/workbench/common/widgets/timeline/model/track/track-item-view";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { GhostTrackItemView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-item-view";
import { TimelineWidget } from "window/workbench/common/widgets/timeline/widget-impl";
import { ITrack } from "internal/timeline/base/track/track";

export class TimelineWidgetManipulatorControllerImpl extends Disposable 
    implements TimelineWidgetManipulatorController {

  private mouseMoveMonitor_: InterruptableMouseMoveMonitor;

  private baseTime_: number;
  private baseTrack_: number;

  private ghostTrackItemViews_: GhostTrackItemView[] = [];
  
  constructor(private readonly widget_: TimelineWidget) {
    super();
    this.mouseMoveMonitor_ = new InterruptableMouseMoveMonitor();
    this._register(this.mouseMoveMonitor_);

    this.startMove = this.startMove.bind(this);
    this.handleMove_ = this.handleMove_.bind(this);
    this.endMove_ = this.endMove_.bind(this);
    this.startResizeLeft = this.startResizeLeft.bind(this);
    this.endResizeLeft_ = this.endResizeLeft_.bind(this);
    this.startResizeRight = this.startResizeRight.bind(this);
    this.endResizeRight_ = this.endResizeRight_.bind(this);

    this._register(widget_.onTrackItemMouseMoveStart(e => {
      this.startMove(e.track, e.e);
    }));
    this._register(widget_.onTrackItemMouseDown(e => {
      this.trackItemMouseDownHandler(e.track, e.trackItem, e.e);
    }));
    this._register(widget_.onTrackItemThumbMouseMoveStart(e => {
      if (e.direction == 'LEFT') this.startResizeLeft(e.track, e.trackItem, e.e);
      else this.startResizeRight(e.track, e.trackItem, e.e);
    }));
    this._register(widget_.onTrackItemThumbMouseDown(e => {
      e.e.stopPropagation();
    }));
  }

  private createGhostTrackItems(trackOffset: number): void {
    this.ghostTrackItemViews_ = dispose(this.ghostTrackItemViews_);
    for (let i = 0; i < this.widget_.view.timelineView.trackViews.length; i ++) {
      if (i + trackOffset >= this.widget_.view.timelineView.trackViews.length) continue;
      if (i + trackOffset < 0) continue;
      const trackVM = this.widget_.view.timelineView.trackViews[i];
      const targetTrackVM = this.widget_.view.timelineView.trackViews[i + trackOffset];
      const focusedTrackItemViews = trackVM.trackTimelineView.getFocusedTrackItemViewModels();
      focusedTrackItemViews.forEach(tiv => {
        const ghostTrackItemView = targetTrackVM.trackTimelineView.addGhostTrackItem(tiv.trackItem.time.start, tiv.trackItem.time.end);
        console.warn('start', tiv.trackItem.time.start, tiv.trackItem.time.end);
        this.ghostTrackItemViews_.push(ghostTrackItemView);
      })
    }
  }

  private trackItemMouseDownHandler(track: ITrack, trackItem: ITrackItem, e: StandardMouseEvent) {
    e.stopPropagation();
    this.trackItemFocusHandler(track, trackItem, e.ctrlKey);
  }

  private trackItemFocusHandler(track: ITrack, trackItem: ITrackItem,
      ctrlKey: boolean) {
    const trackItemView = this.widget_.view.timelineView.getTrackView(track).trackTimelineView.getTrackItemView(trackItem);
    if (ctrlKey) {
      if (trackItemView.focused) trackItemView.blur();
      else trackItemView.focus();
    }
    else {
      if (trackItemView.focused) return;
      this.widget_.view.timelineView.blurAllTrackItems();
      trackItemView.focus();
    }
  }

  private startResizeLeft(track: ITrack, trackItem: ITrackItem, e: StandardMouseEvent): void {
    e.stopPropagation();
    this.widget_.view.timelineView.ghostTimelineState.reset();
    this.widget_.view.timelineView.ghostTimelineState.magnetRight = false;
    this.baseTime_ = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    this.baseTrack_ = this.widget_.timeline.getTrackIndex(track);
    const handler = this.handleResizeLeft_.bind(this);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeLeft_);
    this.createGhostTrackItems(0);
  }

  private handleResizeLeft_(e: StandardMouseEvent) {
    const time = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    const dt = time - this.baseTime_;
    console.log('left', dt);
    this.widget_.view.timelineView.ghostTimelineState.leftExtent = dt;
  }

  private endResizeLeft_() {
    const dt = this.widget_.view.timelineView.ghostTimelineState.leftExtent;
    for (let i = 0; i < this.widget_.view.timelineView.trackViews.length; i ++) {
      const trackVM = this.widget_.view.timelineView.trackViews[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.trackTimelineView.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextStart = trackItem.time.start + dt;
        const nextBase = trackItem.time.base + dt;
        track.setTrackItemTime(trackItem, nextStart, trackItem.time.end, nextBase);
      })
    }
    this.cleanState_();
  }

  private startResizeRight(track: ITrack, trackItem: ITrackItem, e: StandardMouseEvent): void {
    e.stopPropagation();
    this.widget_.view.timelineView.ghostTimelineState.reset();
    this.widget_.view.timelineView.ghostTimelineState.magnetLeft = false;
    this.baseTime_ = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    this.baseTrack_ = this.widget_.timeline.getTrackIndex(track);
    const handler = this.handleResizeRight_.bind(this);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeRight_);
    this.createGhostTrackItems(0);
  }

  private handleResizeRight_(e: StandardMouseEvent) {
    const time = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    const dt = time - this.baseTime_;
    this.widget_.view.timelineView.ghostTimelineState.rightExtent = dt;
  }

  private endResizeRight_() {
    const dt = this.widget_.view.timelineView.ghostTimelineState.rightExtent;
    for (let i = 0; i < this.widget_.view.timelineView.trackViews.length; i ++) {
      const trackVM = this.widget_.view.timelineView.trackViews[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.trackTimelineView.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextEnd = trackItem.time.end + dt;
        const nextBase = trackItem.time.base;
        track.setTrackItemTime(trackItem, trackItem.time.start, nextEnd, nextBase);
      })
    }
    this.cleanState_();
  }


  /*#region Move*/
  private moveBaseTrackIndex_: number;
  private currentDstTrackIndex_: number;
  private moveTrackOffset_: number;
  private moveDisposables_: IDisposable[] = [];

  private startMove(track: ITrack, e: StandardMouseEvent): void {
    e.stopPropagation();
    this.widget_.view.timelineView.ghostTimelineState.reset();
    this.baseTime_ = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    this.moveBaseTrackIndex_ = this.widget_.timeline.getTrackIndex(track);
    this.currentDstTrackIndex_ = this.moveBaseTrackIndex_;
    this.moveTrackOffset_ = 0;
    this.mouseMoveMonitor_.startMonitoring(this.handleMove_, this.endMove_);
    this.moveDisposables_.push(this.widget_.onTrackMouseMove(e => {
      const dstTrackIndex = this.widget_.timeline.getTrackIndex(e.track);
      console.log(dstTrackIndex, this.currentDstTrackIndex_);
      if (dstTrackIndex !== this.currentDstTrackIndex_) {
        this.currentDstTrackIndex_ = dstTrackIndex;
        this.moveTrackOffset_ = dstTrackIndex - this.moveBaseTrackIndex_;
        this.createGhostTrackItems(this.moveTrackOffset_);
      }
    }))
    this.createGhostTrackItems(0);
  }

  private handleMove_(e: StandardMouseEvent) {
    const time = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(
      this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e).x);
    const dt = time - this.baseTime_;
    this.widget_.view.timelineView.ghostTimelineState.translation = dt;
    const magnet = this.widget_.view.timelineView.ghostTimelineState.currentMagnettedTime;
  }

  private endMove_() {
    const dt = this.widget_.view.timelineView.ghostTimelineState.translation;
    const magnet = this.widget_.view.timelineView.ghostTimelineState.currentMagnettedTime;
    let focusList: TimelineTrackItemView[] = [];
    for (let i = 0; i < this.widget_.view.timelineView.trackViews.length; i ++) {
      const dstTrackIndex = this.moveBaseTrackIndex_ + this.moveTrackOffset_;
      if (dstTrackIndex < 0 || dstTrackIndex >= this.widget_.timeline.tracks.length) continue;
      const srcTrack = this.widget_.timeline.tracks[i];
      const srcTrackView = this.widget_.view.timelineView.trackViews[i];
      const dstTrack = this.widget_.timeline.tracks[dstTrackIndex];
      const dstTrackView = this.widget_.view.timelineView.trackViews[dstTrackIndex];
      const focusedTrackItemVMs = srcTrackView.trackTimelineView.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextStart = trackItem.time.start + dt + magnet;
        const nextEnd = trackItem.time.end + dt + magnet;
        srcTrack.removeTrackItem(trackItem);
        trackItem.setTime(nextStart, nextEnd, trackItem.time.base);
        dstTrack.addTrackItem(trackItem);
        focusList.push(dstTrackView.trackTimelineView.getTrackItemView(trackItem));
      })
    }
    focusList.forEach(f => f.focus());
    this.moveDisposables_ = dispose(this.moveDisposables_);
    this.cleanState_();
  }

  private cleanState_() {
    this.widget_.view.timelineView.ghostTimelineState.reset();
    this.ghostTrackItemViews_ = dispose(this.ghostTrackItemViews_);
  }

  dispose() {
    super.dispose();
    dispose(this.ghostTrackItemViews_);
  }

}