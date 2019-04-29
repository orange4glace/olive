import { Timeline } from "internal/timeline/timeline";
import { MonitorWidgetTrackItemViewModel, MonitorWidgetTrackItemViewModelImpl } from "window/view/monitor/model/track-item/track-item-view-model";
import { Track } from "internal/timeline/track";
import { IDisposable, dispose } from "base/common/lifecycle";
import { TrackItem } from "internal/timeline/track-item";
import { TrackItemType } from "internal/timeline/track-item-type";
import { MonitorWidgetVideoTrackItemViewModelImpl } from "window/view/monitor/model/track-item/video-track-item-view-model";
import { VideoTrackItem } from "internal/timeline/video-track-item";
import { observable, action } from "window/app-mobx";
import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { mat2d } from "gl-matrix";

export interface MonitorWidgetTimelineViewModel extends MonitorWidgetSelectableViewModel {

  /*@observable*/ readonly width: number;
  /*@observable*/ readonly height: number;
  /*@observable*/ readonly screenWidth: number;
  /*@observable*/ readonly screenHeight: number;

  /*@observable*/ readonly trackItemViewModels: ReadonlyArray<MonitorWidgetTrackItemViewModel<any> | null>;

  updateScreen(width: number, height: number, screenWidth: number, screenHeight: number): void;

  toScreenPosition(x: number, y: number): {x: number, y: number};

}

export class MonitorWidgetTimelineViewModelImpl extends MonitorWidgetSelectableViewModelImpl 
    implements MonitorWidgetTimelineViewModel {

  @observable trackItemViewModels: (MonitorWidgetTrackItemViewModelImpl<any> | null)[];

  @observable width: number;
  @observable height: number;
  @observable screenWidth: number;
  @observable screenHeight: number;

  private timeline_: Timeline;

  private lastTargetTrackItemMap_: Map<Track, TrackItem>;
  private trackDisposables_: Map<Track, IDisposable[]>;

  constructor(timeline: Timeline) {
    super(null);
    this.timeline_ = timeline;
    this.trackItemViewModels = [];
    this.lastTargetTrackItemMap_ = new Map();
    this.trackDisposables_ = new Map();

    this.timeline_.tracks.forEach((track, index) => this.trackAddedHandler(track, index));
    this._register(this.timeline_.onTrackAdded(e => this.trackAddedHandler(e.track, e.index), this));
    this._register(this.timeline_.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track, e.index), this));
    this._register(this.timeline_.onCurrentTimeChanged(this.updateTargetTrackItems, this));
    this.updateTargetTrackItems();
  }

  @action
  private trackAddedHandler(track: Track, index: number) {
    this.trackItemViewModels.splice(index, 0, null);
    let disposables: IDisposable[] = [];
    track.onTrackItemAdded(this.updateTargetTrackItems, this, disposables);
    track.onTrackItemRemoved(this.updateTargetTrackItems, this, disposables);
    this.trackDisposables_.set(track, disposables);
    this.lastTargetTrackItemMap_.set(track, null);
    this.updateTargetTrackItems();
  }

  @action
  private trackWillRemoveHandler(track: Track, index: number) {
    this.trackItemViewModels.splice(index, 1);
    const disposables = this.trackDisposables_.get(track);
    this.trackDisposables_.delete(track);
    this.lastTargetTrackItemMap_.delete(track);
    dispose(disposables);
  }

  @action
  private updateTargetTrackItems() {
    const currentTime = this.timeline_.currentTime;
    this.timeline_.tracks.forEach((track, index) => {
      const last = this.lastTargetTrackItemMap_.get(track);
      const current = track.getTrackItemAt(currentTime);
      if (last == current) return;
      this.lastTargetTrackItemMap_.set(track, current);
      const lastTrackItemVM = this.trackItemViewModels[index];
      dispose(lastTrackItemVM);
      this.trackItemViewModels[index] = null;
      if (!current) return;

      let currentVM: MonitorWidgetTrackItemViewModelImpl<any> = null;
      switch (current.type) {
        case TrackItemType.VIDEO_FIGURE:
        case TrackItemType.VIDEO_MEDIA:
          currentVM = new MonitorWidgetVideoTrackItemViewModelImpl(this, this.timeline_, current as VideoTrackItem);
        break;
      }
      this.trackItemViewModels[index] = currentVM;
    })
  }

  @action
  updateScreen(width: number, height: number, screenWidth: number, screenHeight: number): void {
    this.width = width;
    this.height = height;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  toScreenPosition(x: number, y: number): {x: number, y: number} {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    return {
      x: x * wr,
      y: y * hr
    };
  }

  __getLocalTransformMatrix() {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    let mat = mat2d.create();
    mat2d.identity(mat);
    mat2d.scale(mat, mat, [wr, hr]);
    return mat;
  }

  __getLocalInverseTransformMatrix() {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    let mat = mat2d.create();
    mat2d.identity(mat);
    mat2d.scale(mat, mat, [1 / wr, 1 / hr]);
    return mat;
  }

  __getChildren() {
    return this.trackItemViewModels.filter(e => e);
  }

  __select(x: number, y: number): boolean {
    return false;
  }

}