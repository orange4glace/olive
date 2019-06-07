import { IAppWindow, AppWindow } from "internal/app-window/app-window";
import { WindowRequestWrapResult, WindowRequestPromise, WindowRequestParam, WindowRequestResult } from "connector";
import { assert } from "base/olive/assert";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { IAppWindowStarter } from "internal/app-window/app-window-starter";
import app from "internal/app";

export const IAppWindowService = createDecorator<IAppWindowService>('olive.AppWindowService');

export interface IAppWindowService {

  _serviceBrand: any;

  createAppWindow(starter: IAppWindowStarter, param: WindowRequestParam): Promise<IAppWindow>;
  getAppWindow(id: string): IAppWindow;
  closeAppWindow(id: string): void;

}