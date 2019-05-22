import { TimelineWidgetManipulatorController } from "window/view/timeline/controller/manipulator";
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { TimelineWidgetGhostContainerViewModel } from 'window/view/timeline/model/ghost-view-model';
import { TimelineWidget } from 'window/view/timeline/widget';
import { TrackItem } from 'internal/timeline/track-item/track-item';
import { InterruptableMouseMoveMonitor } from "window/view/common/interruptable-mouse-move-monitor";
import { TimelineWidgetTrackViewModel } from "window/view/timeline/model/track-view-model";
import { TimelineWidgetTrackItemViewModel } from "window/view/timeline/model/track-item-view-model";

class ManipulationState implements IDisposable {
  dtSum: number;
  xMin: number;
  xMax: number;
  trackOffset: number;
  disposables: IDisposable[];

  constructor() {
    this.dtSum = 0;
    this.xMin = -Infinity;
    this.xMax = Infinity;
    this.disposables = [];
  }

  clamp(): number {
    return Math.max(this.xMin, Math.min(this.xMax, this.dtSum));
  }

  dispose() {
    dispose(this.disposables);
  }
}

export class TimelineWidgetManipulatorControllerImpl extends Disposable 
    implements TimelineWidgetManipulatorController {

  private mouseMoveMonitor_: InterruptableMouseMoveMonitor;

  private ghostContainer_: TimelineWidgetGhostContainerViewModel;
  
  constructor(private readonly widget_: TimelineWidget) {
    super();
    this.mouseMoveMonitor_ = new InterruptableMouseMoveMonitor();
    this._register(this.mouseMoveMonitor_);

    this.startMove = this.startMove.bind(this);
    this.endMove_ = this.endMove_.bind(this);
    this.startResizeLeft = this.startResizeLeft.bind(this);
    this.endResizeLeft_ = this.endResizeLeft_.bind(this);
    this.startResizeRight = this.startResizeRight.bind(this);
    this.endResizeRight_ = this.endResizeRight_.bind(this);

    this._register(widget_.onTrackItemMouseMoveStart(e => {
      const trackOffset = this.widget_.model.getTrackViewModelIndex(e.trackViewModel);
      this.startMove(trackOffset, e.e);
    }));
    this._register(widget_.onTrackItemMouseDown(e => {
      this.trackItemMouseDownHandler(e.trackViewModel, e.trackItemViewModel, e.e);
    }));
    this._register(widget_.onTrackItemThumbMouseMoveStart(e => {
      if (e.direction == 'LEFT') this.startResizeLeft(e.e);
      else this.startResizeRight(e.e);
    }));
    this._register(widget_.onTrackItemThumbMouseDown(e => {
      e.e.stopPropagation();
    }));
  }

  private createGhostContainerFromFocused(): TimelineWidgetGhostContainerViewModel {
    const ghostContainer = this.widget_.model.ghostViewModel.createGhostContainer();
    let topMostTrackIndex = -1;
    let bottomMostTrackIndex = -1;
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      const trackVM = this.widget_.model.trackViewModels[i];
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      if (topMostTrackIndex == -1 && focusedTrackItemVMs.size) {
        topMostTrackIndex = i;
        ghostContainer.setTrackOffset(i);
      }
      if (topMostTrackIndex == -1) continue;
      if (focusedTrackItemVMs.size) bottomMostTrackIndex = i;
      focusedTrackItemVMs.forEach(trackItemVM => {
        ghostContainer.addGhostTrackItem(i - topMostTrackIndex, trackItemVM.start, trackItemVM.end);
      })
    }
    ghostContainer.setMaxTrackOffset(this.widget_.model.trackViewModels.length + topMostTrackIndex - bottomMostTrackIndex);
    return ghostContainer;
  }

  private trackItemMouseDownHandler(trackVM: TimelineWidgetTrackViewModel, trackItemVM: TimelineWidgetTrackItemViewModel, e: StandardMouseEvent) {
    e.stopPropagation();
    this.trackItemFocusHandler(trackVM, trackItemVM, e.ctrlKey);
  }

  private trackItemFocusHandler(trackVM: TimelineWidgetTrackViewModel, trackItemVM: TimelineWidgetTrackItemViewModel,
      ctrlKey: boolean) {
    if (ctrlKey) {
      if (trackItemVM.focused) trackItemVM.blur();
      else trackItemVM.focus();
    }
    else {
      if (trackItemVM.focused) return;
      this.widget_.model.blurAllTrackItems();
      trackItemVM.focus();
    }
  }

  private startResizeLeft(e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeLeft_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeLeft_);
    const ghostContainer = this.createGhostContainerFromFocused();
    this.ghostContainer_ = ghostContainer;
    this.widget_.model.ghostViewModel.setCurrentContainer(ghostContainer);
  }

  private handleResizeLeft_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.widget_.model.getTimeAmountRelativeToTimeline(e.movementX);
    state.dtSum += dt;
    this.ghostContainer_.extendLeft(state.clamp());
  }

  private endResizeLeft_() {
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      const trackVM = this.widget_.model.trackViewModels[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextStart = trackItem.time.start + this.ghostContainer_.leftExtend;
        const nextBase = trackItem.time.base + this.ghostContainer_.leftExtend;
        track.setTrackItemTime(trackItem, nextStart, trackItem.time.end, nextBase);
      })
    }
    this.cleanState_();
  }

  private startResizeRight(e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeRight_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeRight_);
    const ghostContainer = this.createGhostContainerFromFocused();
    this.ghostContainer_ = ghostContainer;
    this.widget_.model.ghostViewModel.setCurrentContainer(ghostContainer);
  }

  private handleResizeRight_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.widget_.model.getTimeAmountRelativeToTimeline(e.movementX);
    state.dtSum += dt;
    this.ghostContainer_.extendRight(state.clamp());
  }

  private endResizeRight_() {
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      const trackVM = this.widget_.model.trackViewModels[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextEnd = trackItem.time.end + this.ghostContainer_.rightExtend;
        track.setTrackItemTime(trackItem, trackItem.time.start, nextEnd, trackItem.time.base);
      })
    }
    this.cleanState_();
  }

  private startMove(targetTrackItemTackOffset: number, e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleMove_.bind(this, state);
    const endHandler = this.endMove_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, endHandler);
    const ghostContainer = this.createGhostContainerFromFocused();
    this.ghostContainer_ = ghostContainer;
    this.widget_.model.ghostViewModel.setCurrentContainer(ghostContainer);
    const topMostTrackIndex = ghostContainer.trackOffset;
    state.trackOffset = topMostTrackIndex;
    state.disposables.push(this.widget_.onTrackMouseMove(e => {
      const movedTrackOffset = this.widget_.model.getTrackViewModelIndex(e.trackViewModel);
      const trackDeltaOffset = movedTrackOffset - targetTrackItemTackOffset;
      ghostContainer.setTrackOffset(topMostTrackIndex + trackDeltaOffset);
    }))
  }

  private handleMove_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.widget_.model.getTimeAmountRelativeToTimeline(e.movementX);
    state.dtSum += dt;
    this.ghostContainer_.translate(state.clamp());
  }

  private endMove_(state: ManipulationState) {
    const ghostContainer = this.ghostContainer_;
    let trackTrackItems: Array<Array<TrackItem>> = [];

    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      let trackItems: Array<TrackItem> = [];
      trackTrackItems.push(trackItems);
      const trackVM = this.widget_.model.trackViewModels[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        track.removeTrackItem(trackItem);
        trackItems.push(trackItem);
        // const nextStart = trackItem.time.start + this.ghostContainer_.leftExtend;
        // const nextEnd = trackItem.time.end + this.ghostContainer_.rightExtend;
        // track.setTrackItemTime(trackItem, nextStart, nextEnd, trackItem.time.base);
      })
    }

    const trackDeltaOffset = ghostContainer.trackOffset - state.trackOffset;
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      let j = i + trackDeltaOffset;
      if (j < 0 || j >= this.widget_.model.trackViewModels.length) continue;
      const track = this.widget_.model.trackViewModels[j].track;
      trackTrackItems[i].forEach(trackItem => {
        track.addTrackItem(trackItem, trackItem.time.start + ghostContainer.leftExtend, trackItem.time.end + ghostContainer.rightExtend, trackItem.time.base)
        // Refocus track item
        const trackVM = this.widget_.model.trackViewModels[j];
        trackVM.getTrackItemViewModel(trackItem).focus();
      });
    }

    this.cleanState_();
    state.dispose();
  }

  private cleanState_() {
    this.widget_.model.ghostViewModel.setCurrentContainer(null);
    this.ghostContainer_ = dispose(this.ghostContainer_);
  }

}