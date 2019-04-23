import * as dom from 'base/view/dom'
import { TimelineWidgetManipulatorController } from "window/view/timeline/controller/manipulator";
import { IDisposable, dispose, Disposable } from "base/common/lifecycle";
import { GlobalMouseMoveMonitor } from 'base/view/globalMouseMoveMonitor';
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { Timeline } from 'internal/timeline/timeline';
import { TimelineWidgetModel } from 'window/view/timeline/model/model';
import { TimelineWidgetGhostContainer } from 'window/view/timeline/model/ghost';

class MouseMoveMonitor extends Disposable {

  private readonly mouseMoveMonitor_: GlobalMouseMoveMonitor<StandardMouseEvent>;
  private keydownListener_: IDisposable;

  constructor() {
    super();
		this.mouseMoveMonitor_ = this._register(new GlobalMouseMoveMonitor<StandardMouseEvent>());
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

export class TimelineWidgetManipulatorControllerImpl implements TimelineWidgetManipulatorController, IDisposable {

  private timeline_: Timeline;

  private model_: TimelineWidgetModel;
  private mouseMoveMonitor_: MouseMoveMonitor;

  private hooks_: IDisposable[];

  private ghostContainer_: TimelineWidgetGhostContainer;

  private movementXSum_ = 0;
  private movementYSum_ = 0;
  
  constructor(model: TimelineWidgetModel) {
    this.model_ = model;
    this.mouseMoveMonitor_ = new MouseMoveMonitor();
  }

  private createGhostContainerFromFocused() {
    this.ghostContainer_ = this.model_.ghostModel.createGhostContainer();
    // this.model_.getFocusedTrackItems().forEach((trackItemSet, track) => {
    //   trackItemSet.forEach(trackItem => {
    //     this.ghostContainer_.addGhostTrackItem(track, trackItem.time.start, trackItem.time.end);
    //   })
    // })
  }

  startResizeLeft(): void {
    let state: ManipulationState = new ManipulationState();
    const handler = this.handleResizeLeft_.bind(this, state);
    this.mouseMoveMonitor_.startMonitoring(handler, this.endResizeLeft_);
    this.createGhostContainerFromFocused();
  }

  private handleResizeLeft_(state: ManipulationState, e: StandardMouseEvent) {
    const dt = this.model_.getTimeAmountRelativeToTimeline(e.movementX);
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
    this.ghostContainer_ = null;
  }

  dispose() {
    this.hooks_ = dispose(this.hooks_);
    this.mouseMoveMonitor_ = dispose(this.mouseMoveMonitor_);
  }

}