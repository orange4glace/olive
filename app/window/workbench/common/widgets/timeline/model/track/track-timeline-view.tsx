import * as style from './track-timeline-view.scss';
import * as React from 'react'
import { ITrack } from 'internal/timeline/base/track/track';
import { IProject } from 'internal/project/project';
import { TimelineTrackItemView } from 'window/workbench/common/widgets/timeline/model/track/track-item-view';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { IDisposable, Disposable, dispose } from 'base/common/lifecycle';
import { TreeMultiSet } from 'tstl';
import { ConstTrackItemTime } from 'internal/timeline/base/track-item/track-item-time';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { createStandardMouseEvent } from 'base/olive/mouse-event';
import { GhostTrackItemView } from 'window/workbench/common/widgets/timeline/model/track/ghost-track-item-view';
import { Emitter } from 'base/common/event';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class TimelineTrackTimelineView extends Disposable {

  private readonly onDidAddGhostTrackItemView_: Emitter<GhostTrackItemView> = new Emitter();
  public get onDidAddGhostTrackItemView() { return this.onDidAddGhostTrackItemView_.event; }

  @observable private trackItemViews_: Set<TimelineTrackItemView>;
  public get trackItemViews(): ReadonlySet<TimelineTrackItemView> { return this.trackItemViews_; }
  private trackItemViewMap_: Map<ITrackItem, TimelineTrackItemView>;
  private trackItemViewDisposables_: Map<ITrackItem, IDisposable[]>;

  @observable private ghostTrackItemViews_: Set<GhostTrackItemView> = new Set();
  public get ghostTrackItemViews(): ReadonlySet<GhostTrackItemView> { return this.ghostTrackItemViews_; }

  private trackItemStartTimeSet_: TreeMultiSet<number>;
  private trackItemEndTimeSet_: TreeMultiSet<number>;

  private focusedTrackItemViews_: Set<TimelineTrackItemView>;

  emitTrackMouseMove(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackMouseMove({
      track: this.track,
      e: e
    });
  }

  emitTrackDragOver(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackDragOver({
      track: this.track,
      e: e
    })
  }

  emitTrackDragLeave(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackDragLeave({
      track: this.track,
      e: e
    })
  }

  emitTrackDrop(e: StandardMouseEvent) {
    this.outgoingEvents.emitTrackDrop({
      track: this.track,
      e: e
    })
  }

  constructor(
    readonly project: IProject,
    readonly track: ITrack,
    readonly timelineScrollView: TimelineScrollView,
    readonly outgoingEvents: TimelineWidgetViewOutgoingEvents
  ) {
    super();
    this.trackItemViews_ = new Set();
    this.trackItemViewMap_ = new Map();
    this.trackItemViewDisposables_ = new Map();
    this.focusedTrackItemViews_ = new Set();
    this.trackItemStartTimeSet_ = new TreeMultiSet();
    this.trackItemEndTimeSet_ = new TreeMultiSet();

    this.track.trackItems.forEach((trackItemTime, trackItem) => this.trackItemAddedHandler(trackItem));
    this._register(this.track.onTrackItemAdded(e => this.trackItemAddedHandler(e.trackItem), this));
    this._register(this.track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem), this));
    this._register(this.track.onTrackItemTimeChanged(e => this.trackItemTimeChangedHandler(e.trackItem, e.old), this));
  }

  addGhostTrackItem(startTime: number, endTime: number): GhostTrackItemView {
    const view = new GhostTrackItemView(this.timelineScrollView, startTime, endTime);
    this.ghostTrackItemViews_.add(view);
    let disposables: IDisposable[] = [];
    disposables.push(view.onDidDispose(() => {
      this.removeGhostTrackItem(view);
      dispose(disposables);
    }));
    this.onDidAddGhostTrackItemView_.fire(view);
    return view;
  }

  removeGhostTrackItem(view: GhostTrackItemView) {
    this.ghostTrackItemViews_.delete(view);
    console.log('rem ghost ', view);
  }

  getTrackItemView(trackItem: ITrackItem) {
    return this.trackItemViewMap_.get(trackItem);
  }

  getFocusedTrackItemViewModels(): ReadonlySet<TimelineTrackItemView> {
    let set = new Set<TimelineTrackItemView>();
    this.trackItemViews_.forEach(tiv => {
      if (tiv.focused) set.add(tiv);
    })
    return set;
    // return this.focusedTrackItemViews_;
  }

  blurAllTrackItems(): void {
    this.trackItemViews_.forEach(tiv => {
      if (tiv.focused) tiv.blur();
    })
    // this.focusedTrackItemViews_.forEach(vm => vm.blur());
  }

  getClosestTime(time: number) {
    let dt = Infinity;
    let ret = Infinity;
    let slb = this.trackItemStartTimeSet_.lower_bound(time);
    if (!slb.equals(this.trackItemStartTimeSet_.end())) {
      let val = slb.value;
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    }
    if (!slb.equals(this.trackItemStartTimeSet_.begin())) {
      let val = slb.prev().value;
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    }

    slb = this.trackItemEndTimeSet_.lower_bound(time);
    if (!slb.equals(this.trackItemEndTimeSet_.end())) {
      let val = slb.value;
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    }
    if (!slb.equals(this.trackItemEndTimeSet_.begin())) {
      let val = slb.prev().value;
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    }
    return ret;
  }

  private trackItemAddedHandler(trackItem: ITrackItem) {
    const tiv = new TimelineTrackItemView(this.track, trackItem, this.timelineScrollView, this.outgoingEvents);
    this.trackItemViews_.add(tiv);
    this.trackItemViewMap_.set(trackItem, tiv);
    let disposables: IDisposable[] = [];
    disposables.push(tiv.onFocused(e => this.trackItemFocusedHandler(tiv), this));
    disposables.push(tiv.onBlured(e => this.trackItemBluredHandler(tiv), this));
    this.trackItemViewDisposables_.set(trackItem, disposables);
    this.trackItemStartTimeSet_.insert(trackItem.time.start);
    this.trackItemEndTimeSet_.insert(trackItem.time.end);
    // this.onTrackItemAdded_.fire(vm);
  }

  private trackItemWillRemoveHandler(trackItem: ITrackItem) {
    const tiv = this.trackItemViewMap_.get(trackItem);
    tiv.blur();
    // this.onTrackItemWillRemove_.fire(tiv);
    this.trackItemViews_.delete(tiv);
    this.trackItemViewMap_.delete(trackItem);
    dispose(this.trackItemViewDisposables_.get(trackItem));
    this.trackItemViewDisposables_.delete(trackItem);
    this.trackItemStartTimeSet_.erase(trackItem.time.start);
    this.trackItemEndTimeSet_.erase(trackItem.time.end);
    dispose(tiv);
  }

  private trackItemTimeChangedHandler(trackItem: ITrackItem, oldTime: ConstTrackItemTime) {
    this.trackItemStartTimeSet_.erase(oldTime.start);
    this.trackItemEndTimeSet_.erase(oldTime.end);
    this.trackItemStartTimeSet_.insert(trackItem.time.start);
    this.trackItemEndTimeSet_.insert(trackItem.time.end);
  }

  private trackItemFocusedHandler(tiv: TimelineTrackItemView) {
    this.focusedTrackItemViews_.add(tiv);
    // this.onTrackItemFocused_.fire(trackItemVM);
  }

  private trackItemBluredHandler(tiv: TimelineTrackItemView) {
    this.focusedTrackItemViews_.delete(tiv);
    // this.onTrackItemBlured_.fire(trackItemVM);
  }

  render(): React.ReactNode {
    return <TrackTimelineViewComponent view={this}/>
  }

}


@observer
export class TrackTimelineViewComponent extends React.Component<{view: TimelineTrackTimelineView}> {

  mouseMoveHandler = (e: React.MouseEvent) => {
    const view = this.props.view;
    view.emitTrackMouseMove(createStandardMouseEvent(e));
  }

  dragOverHandler = (e: React.MouseEvent) => {
    const view = this.props.view;
    view.emitTrackDragOver(createStandardMouseEvent(e));
  }

  dragLeaveHandler = (e: React.MouseEvent) => {
    const view = this.props.view;
    view.emitTrackDragLeave(createStandardMouseEvent(e));
  }

  dropHandler = (e: React.MouseEvent) => {
    const view = this.props.view;
    view.emitTrackDrop(createStandardMouseEvent(e));
  }

  render() {
    const view = this.props.view;
    const st = {
      height: 30 + 'px'
    }
    return (
      <div className={`track ${style.component}`} style={st}
        onMouseMove={this.mouseMoveHandler}
        onDragOver={this.dragOverHandler}
        onDragLeave={this.dragLeaveHandler}
        onDrop={this.dropHandler}>
        { [...view.trackItemViews].map(v => v.render()) }
        { [...view.ghostTrackItemViews].map(v => v.render())}
      </div>
    );
  }
}