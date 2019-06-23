import * as style from './timeline-view.scss'
import * as React from 'react'
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
import { MouseUtil } from "orangeutil";
import { Event, Emitter } from "base/common/event";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrack } from "internal/timeline/base/track/track";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { IProject } from "internal/project/project";
import { AddTrackOperation } from "internal/timeline/base/operaitons/operations";
import { TimelineTrackView } from 'window/workbench/common/widgets/timeline/model/track/track-view-model';
import { TimelineWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/timeline/view-outgoing-events';
import { TimelineWidgetTrackItemEvent } from 'window/workbench/common/widgets/timeline/event';
import { DisposableMap, newDisposableMap } from 'base/olive/lifecycle';
import { GhostTimelineState } from 'window/workbench/common/widgets/timeline/model/ghost-timeline-state';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class TimelineWidgetTimelineView extends Disposable {

  private readonly onDidChangeFocusedItems_: Emitter<void> = new Emitter();
  public readonly onDidChangeFocusedItems = this.onDidChangeFocusedItems_.event;
  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  public readonly onTrackItemFocused: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemEvent> = new Emitter();
  public readonly onTrackItemBlured: Event<TimelineWidgetTrackItemEvent> = this.onTrackItemBlured_.event;

  readonly scrollViewModel: TimelineScrollView;

  @observable private trackViews_: Array<TimelineTrackView>;
  public get trackViews(): ReadonlyArray<TimelineTrackView> { return this.trackViews_; }
  readonly ghostTimelineState: GhostTimelineState;

  private readonly focusedTrackItems_: Set<ITrackItem>;
  private readonly focusedTrackItemTrackMap_: Map<ITrack, Set<ITrackItem>>;
  public get focusedTrackItems(): ReadonlySet<ITrackItem> { return this.focusedTrackItems_; }

  private project_: IProject;
  private timeline_: ITimeline;
  public get timeline() { return this.timeline_; }

  private trackViewMap_: Map<ITrack, TimelineTrackView>;
  private trackViewDisposables_: DisposableMap<TimelineTrackView, IDisposable[]>;

  @observable private guidelineIndicatorPosition_: number;
  public get guidelineIndicatorPosition() { return this.guidelineIndicatorPosition_; }

  constructor(
    project: IProject,
    timeline: ITimeline,
    readonly outgoingEvents: TimelineWidgetViewOutgoingEvents) {
    super();
    this.project_ = project;
    this.timeline_ = timeline;
    
    this.trackViews_ = [];
    this.trackViewMap_ = new Map();
    this.trackViewDisposables_ = newDisposableMap<TimelineTrackView, any>();
    this._register(this.trackViewDisposables_);
    
    this.focusedTrackItems_ = new Set();
    this.focusedTrackItemTrackMap_ = new Map();

    this.scrollViewModel = this._register(new TimelineScrollView(timeline));
    this.ghostTimelineState = this._register(new GhostTimelineState(this));

    timeline.tracks.forEach((track, index) => this.trackAddedHandler(track, index));
    this._register(timeline.onTrackAdded(e => this.trackAddedHandler(e.track, e.index), this));
    this._register(timeline.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track, e.index), this));

  }

  private trackAddedHandler(track: ITrack, index: number) {
    const vm = new TimelineTrackView(this.project_, track, this.scrollViewModel, this.outgoingEvents);
    this.trackViewMap_.set(track, vm);
    this.trackViews_.splice(index, 0, vm);
    this.registerTrackViewListeners(vm, track);
  }

  private registerTrackViewListeners(view: TimelineTrackView, track: ITrack) {
    let disposables = [];
    const focusedTrackItemSet: Set<ITrackItem> = new Set();
    this.focusedTrackItemTrackMap_.set(track, focusedTrackItemSet);

    // Focused handler
    disposables.push(view.onDidFocusTrackItem(e => {
      const trackItem = e.trackItem;
      this.focusedTrackItems_.add(trackItem);
      focusedTrackItemSet.add(trackItem);
      this.onTrackItemFocused_.fire({
        timeline: this.timeline,
        track: track,
        trackItem: e.trackItem
      });
      this.onDidChangeFocusedItems_.fire();
    }, this))

    // Blured handler
    disposables.push(view.onDidBlurTrackItem(e => {
      const trackItem = e.trackItem;
      this.focusedTrackItems_.delete(trackItem);
      focusedTrackItemSet.delete(trackItem);
      this.onTrackItemBlured_.fire({
        timeline: this.timeline,
        track: track,
        trackItem: e.trackItem
      })
      this.onDidChangeFocusedItems_.fire();
    }, this))

    disposables.push(view.onDidAddGhostTrackItemView(ghostTrackItem => {
      this.ghostTimelineState.addGhostTrackItemView(ghostTrackItem);
    }));
    
    this.trackViewDisposables_.set(view, disposables);
  }

  private trackWillRemoveHandler(track: ITrack, index: number) {
    const vm = this.trackViewMap_.get(track);
    this.trackViews_.splice(index, 1);
    this.trackViewMap_.delete(track);

    // Remove focused TrackItemViews
    const focusedTrackItemSet: Set<ITrackItem> = this.focusedTrackItemTrackMap_.get(track);
    this.focusedTrackItemTrackMap_.delete(track);
    focusedTrackItemSet.forEach(ti => {
      this.focusedTrackItems_.delete(ti);
    })
    this.onDidChangeFocusedItems_.fire();

    dispose(this.trackViewDisposables_.get(vm));
    this.trackViewDisposables_.delete(vm);
    dispose(vm);
  }

  seekTo(time: number): void {
    this.timeline_.seekTo(time);
  }

  get currentTime(): number {
    return this.timeline_.currentTime;
  }

  updateGuidelineIndicatorTime(e: React.MouseEvent, el: HTMLElement) {
    const x = MouseUtil.mousePositionElement(e, el).x;
    this.guidelineIndicatorPosition_ = 
      this.scrollViewModel.getPositionRelativeToTimeline(
        this.scrollViewModel.getTimeRelativeToTimeline(x));
    // if (TimelineState.snap) this.time = controller.getSnappedTime(this.time);
  }

  getTrackView(track: ITrack): TimelineTrackView | null {
    return this.trackViewMap_.get(track);
  }

  getTrackViewIndex(vm: TimelineTrackView): number {
    const index = this.trackViews_.indexOf(vm);
    return index;
  }

  getFocusedTrackItems(): ReadonlySet<ITrackItem> {
    let result: Set<ITrackItem> = new Set();
    this.trackViews_.forEach(trackVM => {
      trackVM.trackTimelineView.trackItemViews.forEach(trackItemVM => {
        if (trackItemVM.focused) result.add(trackItemVM.trackItem);
      })
    })
    return result;
  }

  blurAllTrackItems(): void {
    this.trackViews.forEach(vm => vm.trackTimelineView.blurAllTrackItems());
  }
  
  getClosestTime(time: number): number {
    let dt = Infinity;
    let ret = Infinity;
    this.trackViews.forEach(tvm => {
      let val = tvm.trackTimelineView.getClosestTime(time);
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    })
    return ret;
  }

  addTrack() {
    const op = new AddTrackOperation(this.timeline_);
    this.project_.history.execute(op);
    this.project_.history.close();
  }

  render(): React.ReactNode {
    return <TimelineViewComponent view={this}/>
  }

}


@observer
class TimelineViewComponent extends React.Component<{view: TimelineWidgetTimelineView}> {

  timelineRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.props.view.scrollViewModel.setElement(this.timelineRef.current);
  }

  timelineMouseMoveHandler = (e: React.MouseEvent) => {
    this.props.view.updateGuidelineIndicatorTime(e, this.timelineRef.current);
  }

  render() {
    const view = this.props.view;
    return (
      <div className={`timeline-body ${style.component}`}>
        <SideComponent view={view}/>
        <div className='timeline' ref={this.timelineRef}>
          {view.scrollViewModel.render(
            <>
              <GuidelineIndicator position={view.guidelineIndicatorPosition}/>
              <TrackRenderer view={view}/>
            </>
          )}
        </div>
      </div>
    )
  }

}

@observer
class TrackRenderer extends React.Component<{view: TimelineWidgetTimelineView}> {
  render() {
    const view = this.props.view;
    return (
      <div className='tracks-wrapper'>
        <div className='tracks'>
          {view.trackViews.map(tv => tv.trackTimelineView.render())}
        </div>
      </div>
    )
  }
}

@observer
class SideComponent extends React.Component<{view: TimelineWidgetTimelineView}> {
  render() {
    const view = this.props.view;
    return (
      <div className='side'>
        <div className='header'>
          <div className='add-track' onClick={()=>view.addTrack()}/>
        </div>
        <div className='tracks'>
          {view.trackViews.map(tv => tv.trackSideView.render())}
        </div>
      </div>
    );
  }
}

interface GuidelineIndicatorProps {
  position: number;
}

@observer
class GuidelineIndicator extends React.Component<GuidelineIndicatorProps, {}> {

  render() {
    const style = {
      left: this.props.position + 'px'
    }
    return (
      <div className='guideline-indicator' style={style}/>
    )
  }

}