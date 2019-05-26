import { IDisposable } from "base/common/lifecycle";
import { IAppWindow } from "internal/app-window/app-window";
import { IModalWindowStarter } from "window/modal-window/modal-window-starter";
import { IApp } from "internal/app-interface";

export interface IModalWindow {

  readonly id: number;
  readonly appWindow: IAppWindow;

  close(): void;

}