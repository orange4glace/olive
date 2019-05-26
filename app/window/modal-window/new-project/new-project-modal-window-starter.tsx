import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IModalWindowStarter } from "window/modal-window/modal-window-starter";
import { IModalWindow } from "window/modal-window/modal-window";
import { IApp } from "internal/app-interface";
import { IProjectService } from "internal/project/project-service";
import { NewProjectWindowModalView } from 'window/modal-window/new-project/view/modal-view';
import { INewProjectModal, NewProjectModal } from 'window/modal-window/new-project/new-project-modal';

export class NewProjectModalWindowStarter implements IModalWindowStarter {

  private modal_: INewProjectModal;

  constructor(
    @IProjectService private readonly projectService_: IProjectService) {
    this.modal_ = new NewProjectModal(projectService_);
  }

  start(modalWindow: IModalWindow, app: IApp): void {
    ReactDOM.render(<NewProjectWindowModalView/>, 
      modalWindow.appWindow.nativeWindow.document.getElementById('app'));

  }

  onDispose() {
    console.log('[NewProjectModalWindow] onDispose');
  }

}