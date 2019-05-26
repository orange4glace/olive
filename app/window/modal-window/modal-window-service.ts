import { IModalWindow } from "window/modal-window/modal-window";
import { IModalWindowStarter } from "window/modal-window/modal-window-starter";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const IModalWindowService = createDecorator<IModalWindowService>('olive.ModalWindowService');

export interface IModalWindowService {

  createModal(starter: IModalWindowStarter): Promise<IModalWindow>;
  closeModal(id: number): void;
  closeAllModals(): void;

}