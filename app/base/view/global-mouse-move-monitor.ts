import { Disposable, IDisposable, dispose } from "base/common/lifecycle";

export interface IMouseMoveCallback<R> {
	(mouseMoveData: R): void;
}

export interface IOnStopCallback {
	(): void;
}

export class GlobalMouseMoveMonitor<R> extends Disposable {

  private hooks_: IDisposable[];
  private mouseMoveCallback_: IMouseMoveCallback<R>;
  private onStopCallback_: IOnStopCallback;

  constructor() {
    super();
    this.hooks_ = [];
    this.mouseMoveCallback_ = null;
    this.onStopCallback_ = null;
  }

  dispose(): void {
    super.dispose();
  }

  stopMonitoring(invokeStopCallback: boolean = true): void {
    if (!this.isMonitoring()) return;
    this.hooks_ = dispose(this.hooks_);
    this.mouseMoveCallback_ = null;
		let onStopCallback = this.onStopCallback_;
		this.onStopCallback_ = null;
    
		if (invokeStopCallback && onStopCallback) {
			onStopCallback();
		}
  }

  isMonitoring(): boolean {
    return this.hooks_.length > 0;
  }

  startMonitoring(
      mouseMoveCallback: IMouseMoveCallback<R>,
      onStopCallback: IOnStopCallback): void {
    if (this.isMonitoring()) return;
    
		this.mouseMoveCallback_ = mouseMoveCallback;
		this.onStopCallback_ = onStopCallback;
  }

}