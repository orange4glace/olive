import { TimelineWidgetTrackViewModel, TimelineWidgetTrackViewModelImpl } from "window/view/timeline/model/track-view-model";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";
import { observable } from "window/app-mobx";
import { IDisposable, dispose } from "base/common/lifecycle";
import { Track } from "internal/timeline/track";
import { TimelineWidgetScrollViewModel, TimelineWidgetScrollViewModelImpl } from "window/view/timeline/model/scroll-view-model";
import { MouseUtil } from "orangeutil";
import { TimelineWidgetGhostViewModel } from "window/view/timeline/model/ghost-view-model";
import { TimelineWidgetGhostViewModelImpl } from "window/view/timeline/model/ghost-view-model-impl";
import { TrackItem } from "internal/timeline/track-item";
import { Event, Emitter } from "base/common/event";
import { TimelineWidgetTrackItemViewModel } from "window/view/timeline/model/track-item-view-model";
import { StandardMouseEvent } from "base/view/mouseEvent";

export interface TimelineViewModelTrackItemEvent {
  trackViewModel: TimelineWidgetTrackViewModel;
  trackItemViewModel: TimelineWidgetTrackItemViewModel;
}

export interface TimelineWidgetTimelineViewModel extends ViewModel {

  onTrackItemFocused: Event<TimelineViewModelTrackItemEvent>;
  onTrackItemBlured: Event<TimelineViewModelTrackItemEvent>;

  /*@observable*/ readonly trackViewModels: ReadonlyArray<TimelineWidgetTrackViewModel>;
  readonly scrollViewModel: TimelineWidgetScrollViewModel;
  readonly ghostViewModel: TimelineWidgetGhostViewModel;

  setCurrentTime(time: number): void;
  /*@observable*/ readonly currentTime: number;

  getTrackViewModelIndex(vm: TimelineWidgetTrackViewModel): number;

  getFocusedTrackItems(): ReadonlySet<TrackItem>;
  blurAllTrackItems(): void;

  /*@observable*/ getTimeRelativeToTimeline(px: number): number;
  /*@observable*/ getTimeAmountRelativeToTimeline(px: number): number;
  /*@observable*/ getPositionRelativeToTimeline(time: number): number;
  /*@observable*/ getPixelAmountRelativeToTimeline(time: number): number;
  /*@observable*/ getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number};

}

export class TimelineWidgetTimelineViewModelImpl 
    extends ViewModelImpl
    implements TimelineWidgetTimelineViewModel {

  private onTrackItemFocused_: Emitter<TimelineViewModelTrackItemEvent> = new Emitter();
  onTrackItemFocused: Event<TimelineViewModelTrackItemEvent> = this.onTrackItemFocused_.event;
  private onTrackItemBlured_: Emitter<TimelineViewModelTrackItemEvent> = new Emitter();
  onTrackItemBlured: Event<TimelineViewModelTrackItemEvent> = this.onTrackItemBlured_.event;

  @observable trackViewModels: Array<TimelineWidgetTrackViewModel>;
  readonly scrollViewModel: TimelineWidgetScrollViewModel;
  readonly ghostViewModel: TimelineWidgetGhostViewModel;

  private toDispose_: IDisposable[] = [];
  private timeline_: Timeline;

  private trackViewModelMap_: Map<Track, TimelineWidgetTrackViewModel>;
  private trackViewModelDisposables_: Map<TimelineWidgetTrackViewModel, IDisposable[]>;

  constructor(timeline: Timeline) {
    super();
    this.timeline_ = timeline;
    
    this.trackViewModels = [];
    this.trackViewModelMap_ = new Map();
    this.trackViewModelDisposables_ = new Map();

    this.scrollViewModel = new TimelineWidgetScrollViewModelImpl(timeline);
    this.ghostViewModel = new TimelineWidgetGhostViewModelImpl(timeline);

    timeline.tracks.forEach((track, index) => this.trackAddedHandler(track, index));
    this.toDispose_.push(timeline.onTrackAdded(e => this.trackAddedHandler(e.track, e.index), this));
    this.toDispose_.push(timeline.onTrackAdded(e => this.trackWillRemoveHandler(e.track, e.index), this));
  }

  private trackAddedHandler(track: Track, index: number) {
    const vm = new TimelineWidgetTrackViewModelImpl(track);
    this.trackViewModelMap_.set(track, vm);
    this.trackViewModels.splice(index, 0, vm);
    let disposables = [];
    disposables.push(vm.onTrackItemFocused(e => this.onTrackItemFocused_.fire({
      trackViewModel: vm,
      trackItemViewModel: e
    }), this))
    disposables.push(vm.onTrackItemBlured(e => this.onTrackItemBlured_.fire({
      trackViewModel: vm,
      trackItemViewModel: e
    }), this))
    this.trackViewModelDisposables_.set(vm, disposables);
  }

  private trackWillRemoveHandler(track: Track, index: number) {
    const vm = this.trackViewModelMap_.get(track);
    this.trackViewModelMap_.delete(track);
    this.trackViewModels.splice(index, 1);
    dispose(this.trackViewModelDisposables_.get(vm));
    this.trackViewModelDisposables_.delete(vm);
    dispose(vm);
  }

  setCurrentTime(time: number): void {
    this.timeline_.setCurrentTime(time);
  }

  get currentTime(): number {
    return this.timeline_.currentTime;
  }

  getTrackViewModelIndex(vm: TimelineWidgetTrackViewModel): number {
    const index = this.trackViewModels.indexOf(vm);
    return index;
  }

  getFocusedTrackItems(): ReadonlySet<TrackItem> {
    let result: Set<TrackItem> = new Set();
    this.trackViewModels.forEach(trackVM => {
      trackVM.trackItemViewModels.forEach(trackItemVM => {
        if (trackItemVM.focused) result.add(trackItemVM.trackItem);
      })
    })
    return result;
  }

  blurAllTrackItems(): void {
    this.trackViewModels.forEach(vm => vm.blurAllTrackItems());
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

  getMousePostionRelativeToTimeline(e: MouseEvent | React.MouseEvent | StandardMouseEvent): {x: number, y: number} {
    if (e instanceof StandardMouseEvent) return e.mousePositionElement(this.scrollViewModel.element);
    return MouseUtil.mousePositionElement(e, this.scrollViewModel.element);
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}