import * as dom from 'base/view/dom'
import { TimelineViewManipulationController, TimelineViewManipulationGhostTrackItem } from "window/view/timeline/controller/manipulation";
import { IDisposable, dispose, Disposable } from "base/common/disposable";
import { TimelineViewCoreController } from 'window/view/timeline/controller/core';
import { GlobalMouseMoveMonitor } from 'base/view/global-mouse-move-monitor';
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { observable } from 'window/app-mobx';
import TrackItem from 'internal/timeline/track-item';
import Timeline from 'internal/timeline/timeline';
import { TimelineViewGhostController, TimelineViewGhostContainer } from 'window/view/timeline/controller/ghost';

class MouseMoveMonitor extends Disposable {

  private readonly mouseMoveMonitor_: GlobalMouseMoveMonitor<StandardMouseEvent>;
  private keydownListener_: IDisposable;

  constructor() {
    super();
		this.mouseMoveMonitor_ = this._register(new GlobalMouseMoveMonitor<StandardMouseEvent>());
    this.keydownListener_ = null;
  }

  public startMonitoring(mouseMoveCallback: (e: StandardMouseEvent) => void, onStopCallback: () => void): void {
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

		this.mouseMoveMonitor_.startMonitoring(mouseMoveCallback, () => {
			this.keydownListener_!.dispose();
			onStopCallback();
		});
  }

}

class ManipulationState {
  dtSum: number;
  min: number;
  max: number;

  clamp(): number {
    return Math.max(this.min, Math.min(this.max, this.dtSum));
  }
}

class TimelineViewManipulationGhostTrackItemImpl implements TimelineViewManipulationGhostTrackItem {

  @observable private startTime_: number;
  @observable private endTime_: number;
  @observable private snapLeft_: boolean;
  @observable private snapRight_: boolean;

  get startTime(): number { return this.startTime_; }
  get endTime(): number { return this.endTime_; }
  get snapLeft(): boolean { return this.snapLeft_; }
  get snapRight(): boolean { return this.snapRight_; }

  constructor(trackItem: TrackItem) {

  }

}

export class TimelineViewManipulationControllerImpl implements TimelineViewManipulationController, IDisposable {

  private timeline_: Timeline;

  private core_: TimelineViewCoreController;
  private ghost_: TimelineViewGhostController;
  private mouseMoveMonitor_: MouseMoveMonitor;

  private hooks_: IDisposable[];

  private ghostContainer_: TimelineViewGhostContainer;

  private movementXSum_ = 0;
  private movementYSum_ = 0;
  
  constructor(core: TimelineViewCoreController, ghost: TimelineViewGhostController) {
    this.core_ = core;
    this.ghost_ = ghost;
    this.mouseMoveMonitor_ = new MouseMoveMonitor();
  }

  private createGhostContainerFromFocused() {
    this.ghostContainer_ = this.ghost_.createGhostContainer();
    this.timeline_.tracks.forEach(track => {
      this.core_.getFocusedTrackItems(track).forEach(trackItem => {
        this.ghostContainer_.addGhostTrackItem(track, trackItem.time.start, trackItem.time.end);
      })
    })
  }

  startResizeLeft(): void {
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeLeft_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeLeft_);
    this.createGhostContainerFromFocused();
  }

  private handleResizeLeft_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.core_.getTimeAmountRelativeToTimeline(e.movementX);
    state.dtSum += dt;
    this.ghostContainer_.extendLeft(state.clamp());
  }

  private endResizeLeft_() {
    this.cleanState_();
  }

  startResizeRight(): void {
    
  }

  startMove(): void {

  }

  private cleanState_() {
    this.movementXSum_ = 0;
    this.movementYSum_ = 0;
    this.ghost_.removeGhostContainer(this.ghostContainer_!);
    this.ghostContainer_ = null;
  }

  dispose() {
    this.hooks_ = dispose(this.hooks_);
    this.mouseMoveMonitor_ = dispose(this.mouseMoveMonitor_);
  }

}