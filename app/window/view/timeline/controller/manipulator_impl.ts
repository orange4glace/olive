import * as dom from 'base/view/dom'
import { TimelineWidgetManipulatorController } from "window/view/timeline/controller/manipulator";
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { GlobalMouseMoveMonitor, standardMouseMoveMerger, IStandardMouseMoveEventData } from 'base/view/globalMouseMoveMonitor';
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { TimelineWidgetGhostContainerViewModel } from 'window/view/timeline/model/ghost-view-model';
import { TimelineWidget } from 'window/view/timeline/widget';

class MouseMoveMonitor extends Disposable {

  private readonly mouseMoveMonitor_: GlobalMouseMoveMonitor<IStandardMouseMoveEventData>;
  private keydownListener_: IDisposable;

  constructor() {
    super();
		this.mouseMoveMonitor_ = this._register(new GlobalMouseMoveMonitor<IStandardMouseMoveEventData>());
    this.keydownListener_ = null;
  }

  startMonitoring(mouseMoveCallback: (e: StandardMouseEvent) => void, onStopCallback: () => void): void {
		// Add a <<capture>> keydown event listener that will cancel the monitoring
		// if something other than a modifier key is pressed
		this.keydownListener_ = dom.addStandardDisposableListener(<any>document, 'keydown', (e) => {
			const kb = e.toKeybinding();
			if (kb.isModifierKey()) {
				// Allow modifier keys
				return;
			}
			this.mouseMoveMonitor_.stopMonitoring(true);
		}, true);

		this.mouseMoveMonitor_.startMonitoring(standardMouseMoveMerger, mouseMoveCallback, () => {
			this.keydownListener_!.dispose();
			onStopCallback();
		});
  }

}

class ManipulationState {
  dtSum: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;

  constructor() {
    this.dtSum = 0;
    this.xMin = this.yMin = -Infinity;
    this.xMax = this.yMax = Infinity;
  }

  clamp(): number {
    return Math.max(this.xMin, Math.min(this.xMax, this.dtSum));
  }
}

export class TimelineWidgetManipulatorControllerImpl extends Disposable 
    implements TimelineWidgetManipulatorController {

  private mouseMoveMonitor_: MouseMoveMonitor;

  private ghostContainer_: TimelineWidgetGhostContainerViewModel;
  
  constructor(private readonly widget_: TimelineWidget) {
    super();
    this.mouseMoveMonitor_ = new MouseMoveMonitor();
    this._register(this.mouseMoveMonitor_);

    this.startMove = this.startMove.bind(this);
    this.endMove_ = this.endMove_.bind(this);
    this.startResizeLeft = this.startResizeLeft.bind(this);
    this.endResizeLeft_ = this.endResizeLeft_.bind(this);
    this.startResizeRight = this.startResizeRight.bind(this);
    this.endResizeRight_ = this.endResizeRight_.bind(this);

    this._register(widget_.onTrackItemMouseMoveStart(e => {
      this.startMove(e.e);
    }));
    this._register(widget_.onTrackItemThumbMouseMoveStart(e => {
      if (e.direction == 'LEFT') this.startResizeLeft(e.e);
      else this.startResizeRight(e.e);
    }));
  }

  private createGhostContainerFromFocused() {
    this.ghostContainer_ = this.widget_.model.ghostViewModel.createGhostContainer();
    let topMostTrackIndex = -1;
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      const trackVM = this.widget_.model.trackViewModels[i];
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      if (topMostTrackIndex == -1 && focusedTrackItemVMs.size) {
        topMostTrackIndex = i;
        this.ghostContainer_.setTrackOffset(i);
      }
      if (topMostTrackIndex == -1) continue;
      focusedTrackItemVMs.forEach(trackItemVM => {
        this.ghostContainer_.addGhostTrackItem(i - topMostTrackIndex, trackItemVM.start, trackItemVM.end);
      })
    }
    this.widget_.model.ghostViewModel.setCurrentContainer(this.ghostContainer_);
  }

  startResizeLeft(e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeLeft_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeLeft_);
    this.createGhostContainerFromFocused();
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

  startResizeRight(e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeRight_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeRight_);
    this.createGhostContainerFromFocused();
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

  startMove(e: StandardMouseEvent): void {
    e.stopPropagation();
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleMove_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endMove_);
    this.createGhostContainerFromFocused();
  }

  private handleMove_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.widget_.model.getTimeAmountRelativeToTimeline(e.movementX);
    state.dtSum += dt;
    this.ghostContainer_.translate(state.clamp());
  }

  private endMove_() {
    for (let i = 0; i < this.widget_.model.trackViewModels.length; i ++) {
      const trackVM = this.widget_.model.trackViewModels[i];
      const track = trackVM.track;
      const focusedTrackItemVMs = trackVM.getFocusedTrackItemViewModels();
      focusedTrackItemVMs.forEach(trackItemVM => {
        const trackItem = trackItemVM.trackItem;
        const nextStart = trackItem.time.start + this.ghostContainer_.translation;
        const nextEnd = trackItem.time.end + this.ghostContainer_.translation;
        track.setTrackItemTime(trackItem, nextStart, nextEnd, trackItem.time.base);
      })
    }
    this.cleanState_();
  }

  private cleanState_() {
    this.widget_.model.ghostViewModel.setCurrentContainer(null);
    dispose(this.ghostContainer_);
    this.ghostContainer_ = null;
  }

}