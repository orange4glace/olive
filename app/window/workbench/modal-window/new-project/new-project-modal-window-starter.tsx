import { IModalWindowStarter } from "window/workbench/modal-window/modal-window-starter";
import { IModalWindow } from "window/workbench/modal-window/modal-window";
import { IApp } from "internal/app-interface";
import { IProjectsService } from "internal/project/projects-service";
import { INewProjectModal, NewProjectModal } from 'window/workbench/modal-window/new-project/new-project-modal';

export class NewProjectModalWindowStarter implements IModalWindowStarter {

  private modal_: INewProjectModal;

  constructor(
    @IProjectsService private readonly projectsService_: IProjectsService) {
  }

  start(modalWindow: IModalWindow, app: IApp): void {
    modalWindow.appWindow.nativeWindow.document.head.append(window.document.getElementById('olive-style').cloneNode(true));
    this.modal_ = new NewProjectModal(modalWindow, this.projectsService_);
  }

  onDispose() {
    console.log('[NewProjectModalWindow] onDispose');
  }

}