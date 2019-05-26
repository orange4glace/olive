import { BrowserWindow } from "electron";
import App from "internal/app-interface";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import { IDisposable, Disposable } from "base/common/lifecycle";
import { Event, Emitter } from "base/common/event";

export interface IAppWindow extends IDisposable {

  readonly onClosed: Event<void>;

  readonly id: number;
  readonly closed: boolean;
  readonly browserWindow: BrowserWindow;
  readonly nativeWindow: Window;

  // start(): void;

}

let _next_appWindow_id = 0;

export class AppWindow implements IAppWindow {

  private readonly onClosed_: Emitter<void> = new Emitter();
  public readonly onClosed = this.onClosed_.event;

  readonly id: number;
  closed: boolean = false;

  constructor(
    readonly app: App,
    readonly starter: IAppWindowStarter,
    readonly browserWindow: BrowserWindow,
    readonly nativeWindow: Window) {
    this.id = _next_appWindow_id ++;

    browserWindow.once('closed', () => {
      this.closed = true;
      this.onClosed_.fire();
    })
  }

  start(): void {
    this.starter.start(this, this.app);
  }

  dispose() {
    this.starter.onDispose();
  }

}