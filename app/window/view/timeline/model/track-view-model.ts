import { TimelineWidgetTrackItemViewModel, TimelineWidgetTrackItemViewModelImpl } from "window/view/timeline/model/track-item-view-model";
import { TrackItem } from "internal/timeline/track-item";
import { ViewModel, ViewModelImpl } from "window/view/view-model";
import { IDisposable, dispose } from "base/common/lifecycle";
import { Track } from "internal/timeline/track";
import { observable, computed } from "window/app-mobx";
import { Event, Emitter } from "base/common/event";

export interface TimelineWidgetTrackViewModel extends ViewModel {

  readonly track: Track;

  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel>;
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel>;
  readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel>;

  /*@observable*/ readonly name: string;
  /*@observable*/ readonly trackItemViewModels: ReadonlySet<TimelineWidgetTrackItemViewModel>;

  getFocusedTrackItemViewModels(): ReadonlySet<TimelineWidgetTrackItemViewModel>;
  blurAllTrackItems(): void;

  addTrackItem(trackItem: TrackItem, start: number, end: number, base: number): void;

}


export class TimelineWidgetTrackViewModelImpl
    extends ViewModelImpl
    implements TimelineWidgetTrackViewModel{

  readonly track: Track;

  private readonly onTrackItemFocused_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemFocused: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemFocused_.event;
  private readonly onTrackItemBlured_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemBlured: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemBlured_.event;
  private readonly onTrackItemWillRemove_: Emitter<TimelineWidgetTrackItemViewModel> = new Emitter();
  readonly onTrackItemWillRemove: Event<TimelineWidgetTrackItemViewModel> = this.onTrackItemWillRemove_.event;

  @computed get name(): string { return this.track.name; }
  @observable trackItemViewModels: Set<TimelineWidgetTrackItemViewModel>;

  private toDispose_: IDisposable[] = [];

  private trackItemViewModelMap_: Map<TrackItem, TimelineWidgetTrackItemViewModel>;
  private trackItemViewModelDisposables_: Map<TimelineWidgetTrackItemViewModel, IDisposable[]>;

  private focusedTrackItemModelViews_: Set<TimelineWidgetTrackItemViewModel>;

  constructor(track: Track) {
    super();
    this.track = track;

    this.trackItemViewModels = new Set();
    this.trackItemViewModelMap_ = new Map();
    this.trackItemViewModelDisposables_ = new Map();
    this.focusedTrackItemModelViews_ = new Set();

    this.track.trackItems.forEach((trackItemTime, trackItem) => this.trackItemAddedHandler(trackItem));
    this.toDispose_.push(this.track.onTrackItemAdded(e => this.trackItemAddedHandler(e.trackItem), this));
    this.toDispose_.push(this.track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem), this));
  }

  private trackItemAddedHandler(trackItem: TrackItem) {
    const vm = new TimelineWidgetTrackItemViewModelImpl(trackItem);
    this.trackItemViewModels.add(vm);
    this.trackItemViewModelMap_.set(trackItem, vm);
    let disposables: IDisposable[] = [];
    disposables.push(vm.onFocused(e => this.trackItemFocusedHandler(vm), this));
    disposables.push(vm.onBlured(e => this.trackItemBluredHandler(vm), this));
    this.trackItemViewModelDisposables_.set(vm, disposables);
  }

  private trackItemWillRemoveHandler(trackItem: TrackItem) {
    const vm = this.trackItemViewModelMap_.get(trackItem);
    vm.blur();
    this.onTrackItemWillRemove_.fire(vm);
    this.trackItemViewModels.delete(vm);
    this.trackItemViewModelMap_.delete(trackItem);
    dispose(this.trackItemViewModelDisposables_.get(vm));
    this.trackItemViewModelDisposables_.delete(vm);
    dispose(vm);
  }

  private trackItemFocusedHandler(trackItemVM: TimelineWidgetTrackItemViewModel) {
    this.focusedTrackItemModelViews_.add(trackItemVM);
    this.onTrackItemFocused_.fire(trackItemVM);
  }

  private trackItemBluredHandler(trackItemVM: TimelineWidgetTrackItemViewModel) {
    this.focusedTrackItemModelViews_.delete(trackItemVM);
    this.onTrackItemBlured_.fire(trackItemVM);
  }

  getFocusedTrackItemViewModels(): ReadonlySet<TimelineWidgetTrackItemViewModel> {
    return this.focusedTrackItemModelViews_;
  }

  blurAllTrackItems(): void {
    this.focusedTrackItemModelViews_.forEach(vm => vm.blur());
  }

  addTrackItem(trackItem: TrackItem, start: number, end: number, base: number): void {
    this.track.addTrackItem(trackItem, start, end, base);
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}