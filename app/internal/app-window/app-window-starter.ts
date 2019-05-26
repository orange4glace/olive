import App from "internal/app-interface";
import { IAppWindow } from "internal/app-window/app-window";

export interface IAppWindowStarter {

  start(appWindow: IAppWindow, app: App): void;
  onDispose(): void;

}