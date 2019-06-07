import { IModalWindow } from "window/workbench/modal-window/modal-window";
import { IApp } from "internal/app-interface";

export interface IModalWindowStarter {

  start(appWindow: IModalWindow, app: IApp): void;
  onDispose(): void;

}