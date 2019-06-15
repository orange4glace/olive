import { TimelineWidgetTimelineUIEvent } from "window/workbench/common/widgets/timeline/event";
import { Disposable } from "base/common/lifecycle";
import { InterruptableMouseMoveMonitor } from "window/view/common/interruptable-mouse-move-monitor";
import { StandardMouseEvent } from "base/browser/mouseEvent";
import { Vector2 } from "oliveutil/vector2";
import { clone } from "base/olive/cloneable";
import { TimelineWidget } from "window/workbench/common/widgets/timeline/widget-impl";

export interface ITimelineWidgetRangeSelectorController {



}

export class TimelineWidgetRangeSelectorController extends Disposable
    implements ITimelineWidgetRangeSelectorController {

  private mouseMoveMonitor_: InterruptableMouseMoveMonitor;
  private startPos_: Vector2;
  private endPos_: Vector2;
  private selectTowardPositive_: boolean;
  private moveStart_: boolean;

  constructor(private readonly widget_: TimelineWidget) {
    super();
    this.mouseMoveMonitor_ = new InterruptableMouseMoveMonitor();
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this._register(this.mouseMoveMonitor_);
    this._register(widget_.onTimelineMouseDown(this.timelineMouseDownHandler, this));
  }

  private timelineMouseDownHandler(e: TimelineWidgetTimelineUIEvent) {
    const pos = this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e.e);
    const time = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(pos.x);
    this.moveStart_ = false;
    this.startPos_ = new Vector2(time, pos.y);
    this.endPos_ = new Vector2(time, pos.y);
    this.selectTowardPositive_ = true;
    this.mouseMoveMonitor_.startMonitoring(this.mouseMoveHandler, this.mouseUpHandler);
  }

  private mouseMoveHandler(e: StandardMouseEvent) {
    const timelineView = this.widget_.view.timelineView;
    const rangeSelector = this.widget_.rangeSelector;
    const pos = this.widget_.view.timelineView.scrollViewModel.getMousePostionRelativeToTimeline(e);
    const time = this.widget_.view.timelineView.scrollViewModel.getTimeRelativeToTimeline(pos.x);
    const endPos = new Vector2(time, pos.y);

    this.updateViewModel(this.startPos_, endPos);

    if (this.moveStart_ == false) {
      timelineView.blurAllTrackItems();
      this.moveStart_ = true;
      rangeSelector.setActive(true);
    }

    if (this.selectTowardPositive_) {
      if (this.endPos_.x < this.startPos_.x) {
        timelineView.blurAllTrackItems();
        this.selectTowardPositive_ = false;
        this.endPos_ = clone(this.startPos_);
        this.mouseMoveHandler(e);
      }
      else if (this.endPos_.x <= endPos.x) {
        // Extend
        timelineView.trackViews.forEach(trackView => {
          const track = trackView.track;
          const trackItems = track.getTrackItemsBetween(this.endPos_.x, endPos.x);
          trackItems.forEach(trackItem => {
            const trackItemView = trackView.trackTimelineView.getTrackItemView(trackItem);
            trackItemView.focus();
          })
        })
      }
      else {
        // Reduce
        timelineView.trackViews.forEach(trackView => {
          const track = trackView.track;
          const trackItems = track.getTrackItemsBetween(endPos.x, this.endPos_.x);
          trackItems.forEach(trackItem => {
            if (endPos.x < trackItem.time.start) {
              const trackItemView = trackView.trackTimelineView.getTrackItemView(trackItem);
              trackItemView.blur();
            }
          })
        })
      }
    }
    else {
      if (this.endPos_.x > this.startPos_.x) {
        timelineView.blurAllTrackItems();
        this.selectTowardPositive_ = true;
        this.endPos_ = clone(this.startPos_);
        this.mouseMoveHandler(e);
      }
      else if (this.endPos_.x >= endPos.x) {
        // Extend
        timelineView.trackViews.forEach(trackView => {
          const track = trackView.track;
          const trackItems = track.getTrackItemsBetween(endPos.x, this.endPos_.x);
          trackItems.forEach(trackItem => {
            const trackItemView = trackView.trackTimelineView.getTrackItemView(trackItem);
            trackItemView.focus();
          })
        })
      }
      else {
        // Reduce
        timelineView.trackViews.forEach(trackView => {
          const track = trackView.track;
          const trackItems = track.getTrackItemsBetween(this.endPos_.x, endPos.x);
          trackItems.forEach(trackItem => {
            if (trackItem.time.end < endPos.x) {
              const trackItemView = trackView.trackTimelineView.getTrackItemView(trackItem);
              trackItemView.blur();
            }
          })
        })
      }
    }
    this.endPos_ = endPos;
  }

  private updateViewModel(start: Vector2, end: Vector2) {
    const timelineView = this.widget_.view.timelineView;
    const rangeSelectorVM = this.widget_.rangeSelector;
    const top = Math.min(start.y, end.y);
    const bottom = Math.max(start.y, end.y);
    const left = timelineView.scrollViewModel.getPositionRelativeToTimeline(Math.min(start.x, end.x));
    const right = timelineView.scrollViewModel.getPositionRelativeToTimeline(Math.max(start.x, end.x));
    rangeSelectorVM.setSize(top, left, right - left, bottom - top);
  }

  private mouseUpHandler() {
    const rangeSelector = this.widget_.rangeSelector;
    rangeSelector.setActive(false);
  }

}