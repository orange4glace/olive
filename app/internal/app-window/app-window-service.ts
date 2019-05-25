import { IAppWindow, AppWindow } from "internal/app-window/app-window";
import { WindowRequestWrapResult, WindowRequestPromise, WindowRequestParam, WindowRequestResult } from "connector";
import { assert } from "base/common/assert";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import app from "internal/app";

import { remote } from 'electron'
import { number } from "prop-types";
const { BrowserWindow } = remote;

// Utilies
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const IAppWindowService = createDecorator<IAppWindowService>('olive.AppWindowService');

export interface IAppWindowService {

  createAppWindow(starter: IAppWindowStarter, param: WindowRequestParam): Promise<IAppWindow>;

}

let _next_appWindow_id = 0;

export class AppWindowService implements IAppWindowService {

  private promises_ = new Map<string, WindowRequestPromise>();
  private appWindows_ = new Map<string, IAppWindow>();

  constructor(
    private readonly ipcRenderer_: Electron.IpcRenderer) {

    const _window = window as any;
    _window.onAppWindowLoaded = (id: string) => {
      const appWindow = this.appWindows_.get(id);
      assert(appWindow, 'AppWindow not exists! id: ' + id);
      appWindow.start();
    }

    ipcRenderer_.on('app-window-started', (e: Event, args: WindowRequestWrapResult) => {
      const promise = this.promises_.get(args.name);
      this.promises_.delete(args.name);
      if (!args.ok) return promise.reject();
      let browserWindow = BrowserWindow.fromId(args.id);
      assert(browserWindow, 'BrowserWindow not found ' + args.id);
      browserWindow.webContents.openDevTools();
      promise.resolve({
        browserWindow: browserWindow,
        nativeWindow: promise.nativeWindow
      })
    });
    ipcRenderer_.on('start-app-window', (e: Event, args: WindowRequestParam) => {
      console.log('[AppWindowService] Open native window ', args);
      const nativeWindow = window.open(`/app.html?id=${args.name}`, args.name);
      this.promises_.get(args.name).nativeWindow = nativeWindow;
    })

  }

  async createAppWindow(starter: IAppWindowStarter, param: WindowRequestParam): Promise<IAppWindow> {
    param.name = '' + _next_appWindow_id++;
    console.warn('Request creating app window', param);
    const result = await this._createAppWindow(param);
    const appWindow = new AppWindow(app, starter, result.browserWindow, result.nativeWindow);
    this.appWindows_.set(param.name, appWindow);
    return appWindow;
  }

  private async _createAppWindow(param: WindowRequestParam): Promise<WindowRequestResult> {
    param = param || {};
    let name = param.name || guid();
    param.name = name;
    let promise = new Promise<WindowRequestResult>((resolve, reject) => {
      this.promises_.set(name, {
        resolve: resolve,
        reject: reject,
        nativeWindow: null
      });
      this.ipcRenderer_.send('request-app-window', param);
    });
    return promise;
  }

}