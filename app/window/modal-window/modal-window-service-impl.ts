import { IModalWindowService } from "window/modal-window/modal-window-service";
import { IModalWindow } from "window/modal-window/modal-window";
import { IModalWindowStarter } from "window/modal-window/modal-window-starter";
import { IAppWindowService } from "internal/app-window/app-window-service";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import { IAppWindow } from "internal/app-window/app-window";
import { IApp } from "internal/app-interface";
import { ModalWindow } from "window/modal-window/modal-window-impl";
import { assert } from "base/common/assert";

class ModalWindowBootstrap implements IAppWindowStarter {

  constructor(private readonly modalWindow: ModalWindow) {
  }

  start(appWindow: IAppWindow, app: IApp): void {
    this.modalWindow.start(app);
  }

  onDispose() {
    this.modalWindow.onDispose();
  }

}

export class ModalWindowService implements IModalWindowService {

  appWindowStarter_: IAppWindowStarter;
  modals_: Map<number, IModalWindow> = new Map();

  constructor(
    @IAppWindowService private readonly appWindowService_: IAppWindowService) {

    (window as any).onMainAppWindowDispose = () => {
      this.closeAllModals();
    }
  }

  async createModal(starter: IModalWindowStarter): Promise<IModalWindow> {
    const mainAppWindow = this.appWindowService_.getAppWindow('0');
    const modalWindow = new ModalWindow(starter, this);
    const bootstrap = new ModalWindowBootstrap(modalWindow);
    const appWindow = await this.appWindowService_.createAppWindow(bootstrap, {
      options: {
        parent: mainAppWindow.browserWindow.id,
        modal: true,
        autoHideMenuBar: true,
        minimizable: false,
        maximizable: false,
      }
    });
    appWindow.onClosed(() => { this.modals_.delete(appWindow.id); })
    modalWindow.appWindow = appWindow;
    this.modals_.set(modalWindow.id, modalWindow);
    return modalWindow;
  }

  closeModal(id: number) {
    const modalWindow = this.modals_.get(id);
    assert(modalWindow, 'No such ModalWindow ' + id);
    if (modalWindow.appWindow.closed) return;
    modalWindow.close();
  }

  closeAllModals() {
    this.modals_.forEach(m => this.closeModal(m.id));
  }

}