import { TimelineWidgetTrackViewModel, TimelineWidgetTrackViewModelImpl } from "window/view/timeline/model/track-view-model";
import { ViewModelImpl } from "window/view/view-model";
import { Timeline } from "internal/timeline/timeline";
import { observable } from "window/app-mobx";
import { IDisposable, dispose } from "base/common/lifecycle";
import { Track } from "internal/timeline/track/track";
import { TimelineWidgetScrollViewModel, TimelineWidgetScrollViewModelImpl } from "window/view/timeline/model/scroll-view-model";
import { MouseUtil } from "orangeutil";
import { TimelineWidgetGhostViewModel } from "window/view/timeline/model/ghost-view-model";
import { TimelineWidgetGhostViewModelImpl } from "window/view/timeline/model/ghost-view-model-impl";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { Event, Emitter } from "base/common/event";
import { StandardMouseEvent } from "base/view/mouseEvent";
import { TimelineWidgetTimelineViewModel, TimelineViewModelTrackItemEvent } from "window/view/timeline/model/timeline-view-model";

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

  constructor(readonly timeline: Timeline) {
    super();
    this.timeline_ = timeline;
    
    this.trackViewModels = [];
    this.trackViewModelMap_ = new Map();
    this.trackViewModelDisposables_ = new Map();

    this.scrollViewModel = new TimelineWidgetScrollViewModelImpl(timeline);
    this.ghostViewModel = new TimelineWidgetGhostViewModelImpl(this);

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

  seekTo(time: number): void {
    this.timeline_.seekTo(time);
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
  
  getClosestTime(time: number): number {
    let dt = Infinity;
    let ret = Infinity;
    this.trackViewModels.forEach(tvm => {
      let val = tvm.getClosestTime(time);
      let ldt = Math.abs(val - time);
      if (dt > ldt) {
        dt = ldt;
        ret = val;
      }
    })
    return ret;
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
    if ((e as any).posx) return this.getMousePostionRelativeToTimeline_(e as any);
    return MouseUtil.mousePositionElement(e, this.scrollViewModel.element);
  }

  private getMousePostionRelativeToTimeline_(e: {
    posx: number,
    posy: number
  }){
    function findPos(obj: any) {
      var curleft = 0; var curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }
      return {
        left : curleft,
        top : curtop
      };
    }

		let elPos = findPos(this.scrollViewModel.element);
		return {
			x: e.posx - elPos.left,
			y: e.posy - elPos.top
		};
  }

  dispose(): void {
    this.toDispose_ = dispose(this.toDispose_);
  }

}