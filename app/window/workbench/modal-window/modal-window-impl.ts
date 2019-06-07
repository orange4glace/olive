import { IModalWindow } from "window/workbench/modal-window/modal-window";
import { IAppWindow } from "internal/app-window/app-window";
import { IModalWindowStarter } from "window/workbench/modal-window/modal-window-starter";
import { IApp } from "internal/app-interface";
import { IModalWindowService } from "window/workbench/modal-window/modal-window-service";

export class ModalWindow implements IModalWindow {

  public get id() { return this.appWindow.id; }
  appWindow: IAppWindow;

  constructor(
    private readonly starter_: IModalWindowStarter,
    @IModalWindowService private readonly modalWindowService_: IModalWindowService) {

  }

  start(app: IApp) {
    this.starter_.start(this, app);
  }

  onDispose() {
    this.starter_.onDispose();
  }

  close() {
    this.appWindow.browserWindow.close();
  }

}