import { IModalWindow } from "window/workbench/modal-window/modal-window";
import { IModalWindowStarter } from "window/workbench/modal-window/modal-window-starter";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const IModalWindowService = createDecorator<IModalWindowService>('olive.workbench.service.ModalWindowService');

export interface IModalWindowService {

  _serviceBrand: any;

  createModal(starter: IModalWindowStarter): Promise<IModalWindow>;
  closeModal(id: number): void;
  closeAllModals(): void;

}