import { IAppWindow } from "internal/app-window/app-window";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import App from "internal/app-interface";

export class MainAppWindowStarter implements IAppWindowStarter {

  private appWindow_: IAppWindow;

  start(appWindow: IAppWindow, app: App) {
    this.appWindow_ = appWindow;
    console.log('MainAppWindowStarter', appWindow.nativeWindow);
  
    const nativeWindow = appWindow.nativeWindow as any;
    nativeWindow.app = app;
    (<any>nativeWindow).nativeKeymap = app.nativeKeymap

    const document = nativeWindow.document;
    const script = document.createElement('script');
    script.setAttribute('src', './window.js');
    document.head.appendChild(script);
  }

  onDispose() {
    const nativeWindow = this.appWindow_.nativeWindow as any;
    (nativeWindow as any).onMainAppWindowDispose();
  }

}