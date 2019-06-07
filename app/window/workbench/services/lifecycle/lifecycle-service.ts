import { ILifecycleService, LifecyclePhase, StartupKind, WillShutdownEvent } from "platform/lifecycle/common/lifecycle";
import { Event, Emitter } from "base/common/event";

export class WorkbenchLifecycleService implements ILifecycleService {
  
	_serviceBrand: any;

	onBeforeShutdown = Event.None;

	public readonly onWillShutdown = Event.None;

  private readonly onShutdown_: Emitter<void> = new Emitter();
	public readonly onShutdown = this.onShutdown_.event;

	phase = LifecyclePhase.Restored;

	startupKind = StartupKind.NewWindow;

	when() { return Promise.resolve(); }

  constructor() {
    (window as any).shutdown = () => {
      this.onShutdown_.fire();
    }
  }

};