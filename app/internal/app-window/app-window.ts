import { BrowserWindow } from "electron";
import App from "internal/app-interface";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";

export interface IAppWindow {

  readonly id: number;
  readonly browserWindow: BrowserWindow;
  readonly nativeWindow: Window;

  start(): void;

}

let _next_appWindow_id = 0;

export class AppWindow implements IAppWindow {

  readonly id: number;

  constructor(
    readonly app: App,
    readonly starter: IAppWindowStarter,
    readonly browserWindow: BrowserWindow,
    readonly nativeWindow: Window) {

    this.id = _next_appWindow_id ++;
  }

  start(): void {
    this.starter.start(this, this.app);
  }

}