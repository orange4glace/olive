import { MonitorWidgetTrackItemViewModel, MonitorWidgetTrackItemViewModelImpl } from "window/view/monitor/model/track-item/track-item-view-model";
import { Track } from "internal/timeline/track";
import { dispose } from "base/common/lifecycle";
import { TrackItem } from "internal/timeline/track-item";
import { Timeline } from "internal/timeline/timeline";
import { TrackItemType } from "internal/timeline/track-item-type";
import { MonitorWidgetVideoTrackItemViewModelImpl } from "window/view/monitor/model/track-item/video-track-item-view-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { mat2d } from "gl-matrix";
import { observable } from "window/app-mobx";

export interface MonitorWidgetTrackViewModel extends MonitorWidgetSelectableViewModel {

  /*@observable*/ readonly trackItemViewModels: ReadonlySet<MonitorWidgetTrackItemViewModel<any>>;
  /*@observable*/ readonly currentTrackItemViewModel: MonitorWidgetTrackItemViewModel<any> | null;

}
export class MonitorWidgetTrackViewModelImpl extends MonitorWidgetSelectableViewModelImpl
    implements MonitorWidgetTrackViewModel {

  @observable trackItemViewModels: Set<MonitorWidgetTrackItemViewModelImpl<any>>;
  trackItemViewModelMap_: Map<TrackItem, MonitorWidgetTrackItemViewModelImpl<any>>;

  @observable currentTrackItemViewModel: MonitorWidgetTrackItemViewModel<any> | null;

  constructor(
    parent: MonitorWidgetSelectableViewModelImpl,
    private readonly timeline_: Timeline,
    private readonly track_: Track
  ) {
    super(parent);
    this.trackItemViewModels = new Set();
    this.trackItemViewModelMap_ = new Map();
    track_.trackItems.forEach((time, ti) => this.trackItemAddedHandler(ti));
    this._register(track_.onTrackItemAdded(e => this.trackItemAddedHandler(e.trackItem), this));
    this._register(track_.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem), this));
    this._register(track_.onTrackItemTimeChanged(e => this.updateCurrentTrackItemViewModel(), this));
    this._register(timeline_.onSeek(e => this.updateCurrentTrackItemViewModel(), this));
  }

  private trackItemAddedHandler(trackItem: TrackItem) {
    let tiVM: MonitorWidgetTrackItemViewModelImpl<any> = null;
    switch (trackItem.type) {
      case TrackItemType.VIDEO_FIGURE:
      case TrackItemType.VIDEO_MEDIA:
        tiVM = new MonitorWidgetVideoTrackItemViewModelImpl(this, this.timeline_, trackItem as VideoTrackItem);
      break;
    }
    if (!tiVM) return;
    this.trackItemViewModels.add(tiVM);
    this.trackItemViewModelMap_.set(trackItem, tiVM);
    this.updateCurrentTrackItemViewModel();
  }

  private trackItemWillRemoveHandler(trackItem: TrackItem) {
    let tiVM: MonitorWidgetTrackItemViewModelImpl<any> = this.trackItemViewModelMap_.get(trackItem);
    this.trackItemViewModels.delete(tiVM);
    this.trackItemViewModelMap_.delete(trackItem);
    dispose(tiVM);
    this.updateCurrentTrackItemViewModel();
  }

  private updateCurrentTrackItemViewModel() {
    const timeline = this.timeline_;
    const currentTime = timeline.currentTime;
    const trackItem = this.track_.getTrackItemAt(currentTime);
    if (!trackItem) this.currentTrackItemViewModel = null;
    const tiVM = this.trackItemViewModelMap_.get(trackItem);
    this.currentTrackItemViewModel = tiVM;
    console.log('track item view model update', this.currentTrackItemViewModel);
  }

  __getChildren() {
    return [...this.trackItemViewModels];
  }

  __getLocalTransformMatrix() {
    return mat2d.create();
  }

  __getLocalInverseTransformMatrix() {
    return mat2d.create();
  }

  __select() {
    return false;
  }

}