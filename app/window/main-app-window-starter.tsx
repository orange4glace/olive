import { IAppWindow } from "internal/app-window/app-window";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import App from "internal/app-interface";

export class MainAppWindowStarter implements IAppWindowStarter {

  start(appWindow: IAppWindow, app: App) {
    console.log('MainAppWindowStarter', appWindow.nativeWindow);

setTimeout(() => {
  
    const nativeWindow = appWindow.nativeWindow as any;
    nativeWindow.app = app;

    const document = nativeWindow.document;
    const script = document.createElement('script');
    script.setAttribute('src', './window.js');
    document.head.appendChild(script);
}, 2000)
  }

}