import { Timeline } from "internal/timeline/timeline";
import { Track } from "internal/timeline/track";
import { IDisposable, dispose } from "base/common/lifecycle";
import { observable, action } from "window/app-mobx";
import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl } from "window/view/monitor/model/selectable-view-model";
import { mat2d } from "gl-matrix";
import { MonitorWidgetTrackViewModel, MonitorWidgetTrackViewModelImpl } from "window/view/monitor/model/track-view-model";

export interface MonitorWidgetTimelineViewModel extends MonitorWidgetSelectableViewModel {

  readonly timeline: Timeline;

  /*@observable*/ readonly width: number;
  /*@observable*/ readonly height: number;
  /*@observable*/ readonly screenWidth: number;
  /*@observable*/ readonly screenHeight: number;

  /*@observable*/ readonly trackViewModels: ReadonlyArray<MonitorWidgetTrackViewModel | null>;

  updateScreen(width: number, height: number, screenWidth: number, screenHeight: number): void;

  toScreenPosition(x: number, y: number): {x: number, y: number};

}

export class MonitorWidgetTimelineViewModelImpl extends MonitorWidgetSelectableViewModelImpl 
    implements MonitorWidgetTimelineViewModel {

  @observable trackViewModels: MonitorWidgetTrackViewModelImpl[];
  private trackViewModelMap_: Map<Track, MonitorWidgetTrackViewModel>;
  private trackDisposables_: Map<MonitorWidgetTrackViewModel, IDisposable[]>;

  @observable width: number;
  @observable height: number;
  @observable screenWidth: number;
  @observable screenHeight: number;

  private timeline_: Timeline;


  constructor(public readonly timeline: Timeline) {
    super(null);
    this.timeline_ = timeline;
    this.trackViewModels = [];
    this.trackViewModelMap_ = new Map();
    this.trackDisposables_ = new Map();

    this.timeline_.tracks.forEach((track, index) => this.trackAddedHandler(track, index));
    this._register(this.timeline_.onTrackAdded(e => this.trackAddedHandler(e.track, e.index), this));
    this._register(this.timeline_.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track, e.index), this));
  }

  @action
  private trackAddedHandler(track: Track, index: number) {
    const tvm = new MonitorWidgetTrackViewModelImpl(this, this.timeline_, track);
    this.trackViewModelMap_.set(track, tvm);
    this.trackViewModels.splice(index, 0, tvm);
  }

  @action
  private trackWillRemoveHandler(track: Track, index: number) {
    const tvm = this.trackViewModelMap_.get(track);
    this.trackViewModels.splice(index, 1);
    dispose(tvm);
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
    return this.trackViewModels;
  }

  __select(x: number, y: number): boolean {
    return false;
  }

}