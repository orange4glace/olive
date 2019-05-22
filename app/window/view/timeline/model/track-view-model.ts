import { TimelineWidgetTrackItemViewModel, TimelineWidgetTrackItemViewModelImpl } from "window/view/timeline/model/track-item-view-model";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { IDisposable, dispose } from "base/common/lifecycle";
import { Track } from "internal/timeline/track/track";
import { observable, computed } from "window/app-mobx";
import { Event, Emitter } from "base/common/event";
import { ConstTrackItemTime } from "internal/timeline/track-item/track-item-time";
import { TreeMultiMap, TreeMultiSet } from "tstl";

export interface TimelineWidgetTrackViewModel extends ViewModel {

  readonly track: Track;

  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel>;
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel>;
  readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel>;

  /*@observable*/ readonly name: string;
  /*@observable*/ readonly trackItemViewModels: ReadonlySet<TimelineWidgetTrackItemViewModel>;

  getTrackItemViewModel(trackItem: TrackItem): TimelineWidgetTrackItemViewModel;
  getFocusedTrackItemViewModels(): ReadonlySet<TimelineWidgetTrackItemViewModel>;
  blurAllTrackItems(): void;

  getClosestTime(time: number): number;

}


export class TimelineWidgetTrackViewModelImpl
    extends ViewModelImpl
    implements TimelineWidgetTrackViewModel{

  readonly track: Track;

  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemBlured_.event;
  private readonly onTrackItemAdded_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemAdded: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemAdded_.event;
  private readonly onTrackItemWillRemove_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemWillRemove_.event;

  @computed get name(): string { return this.track.name; }
  @observable trackItemViewModels: Set<TimelineWidgetTrackItemViewModel>;

  private toDispose_: IDisposable[] = [];

  private trackItemViewModelMap_: Map<TrackItem, TimelineWidgetTrackItemViewModel>;
  private trackItemViewModelDisposables_: Map<TimelineWidgetTrackItemViewModel, IDisposable[]>;

  private focusedTrackItemModelViews_: Set<TimelineWidgetTrackItemViewModel>;

  private trackItemStartTimeSet_: TreeMultiSet<number>;
  private trackItemEndTimeSet_: TreeMultiSet<number>;

  constructor(track: Track) {
    super();
    this.track = track;

    this.trackItemViewModels = new Set();
    this.trackItemViewModelMap_ = new Map();
    this.trackItemViewModelDisposables_ = new Map();
    this.focusedTrackItemModelViews_ = new Set();
    this.trackItemStartTimeSet_ = new TreeMultiSet();
    this.trackItemEndTimeSet_ = new TreeMultiSet();

    this.track.trackItems.forEach((trackItemTime, trackItem) => this.trackItemAddedHandler(trackItem));
    this.toDispose_.push(this.track.onTrackItemAdded(e => this.trackItemAddedHandler(e.trackItem), this));
    this.toDispose_.push(this.track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem), this));
    this.toDispose_.push(this.track.onTrackItemTimeChanged(e => this.trackItemTimeChangedHandler(e.trackItem, e.old), this));
  }

  private trackItemAddedHandler(trackItem: TrackItem) {
    const vm = new TimelineWidgetTrackItemViewModelImpl(trackItem);
    this.trackItemViewModels.add(vm);
    this.trackItemViewModelMap_.set(trackItem, vm);
    let disposables: IDisposable[] = [];
    disposables.push(vm.onFocused(e => this.trackItemFocusedHandler(vm), this));
    disposables.push(vm.onBlured(e => this.trackItemBluredHandler(vm), this));
    this.trackItemViewModelDisposables_.set(vm, disposables);
    this.trackItemStartTimeSet_.insert(trackItem.time.start);
    this.trackItemEndTimeSet_.insert(trackItem.time.end);
    this.onTrackItemAdded_.fire(vm);
  }

  private trackItemWillRemoveHandler(trackItem: TrackItem) {
    const vm = this.trackItemViewModelMap_.get(trackItem);
    vm.blur();
    this.onTrackItemWillRemove_.fire(vm);
    this.trackItemViewModels.delete(vm);
    this.trackItemViewModelMap_.delete(trackItem);
    dispose(this.trackItemViewModelDisposables_.get(vm));
    this.trackItemViewModelDisposables_.delete(vm);
    this.trackItemStartTimeSet_.erase(trackItem.time.start);
    this.trackItemEndTimeSet_.erase(trackItem.time.end);
    dispose(vm);
  }

  private trackItemTimeChangedHandler(trackItem: TrackItem, oldTime: ConstTrackItemTime) {
    this.trackItemStartTimeSet_.erase(oldTime.start);
    this.trackItemEndTimeSet_.erase(oldTime.end);
    this.trackItemStartTimeSet_.insert(trackItem.time.start);
    this.trackItemEndTimeSet_.insert(trackItem.time.end);
  }

  private trackItemFocusedHandler(trackItemVM: TimelineWidgetTrackItemViewModel) {
    this.focusedTrackItemModelViews_.add(trackItemVM);
    this.onTrackItemFocused_.fire(trackItemVM);
  }

  private trackItemBluredHandler(trackItemVM: TimelineWidgetTrackItemViewModel) {
    this.focusedTrackItemModelViews_.delete(trackItemVM);
    this.onTrackItemBlured_.fire(trackItemVM);
  }

  getTrackItemViewModel(trackItem: TrackItem) {
    return this.trackItemViewModelMap_.get(trackItem);
  }

  getFocusedTrackItemViewModels(): ReadonlySet<TimelineWidgetTrackItemViewModel> {
    return this.focusedTrackItemModelViews_;
  }

  blurAllTrackItems(): void {
    this.focusedTrackItemModelViews_.forEach(vm => vm.blur());
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

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}