import * as dom from 'base/browser/dom'
import { Disposable, IDisposable } from "base/common/lifecycle";
import { GlobalMouseMoveMonitor, IStandardMouseMoveEventData, standardMouseMoveMerger } from "base/browser/globalMouseMoveMonitor";
import { StandardMouseEvent } from "base/browser/mouseEvent";

export class InterruptableMouseMoveMonitor extends Disposable {

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
			if (onStopCallback) onStopCallback();
		});
  }

}