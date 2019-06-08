import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IModalWindowStarter } from "window/workbench/modal-window/modal-window-starter";
import { IModalWindow } from "window/workbench/modal-window/modal-window";
import { IApp } from "internal/app-interface";
import { IProjectsService } from "internal/project/projects-service";
import { NewProjectWindowModalView } from 'window/workbench/modal-window/new-project/view/modal-view';
import { INewProjectModal, NewProjectModal } from 'window/workbench/modal-window/new-project/new-project-modal';
import { IModalWindowService } from 'window/workbench/modal-window/modal-window-service';

export class NewProjectModalWindowStarter implements IModalWindowStarter {

  private modal_: INewProjectModal;

  constructor(
    @IProjectsService private readonly projectsService_: IProjectsService) {
  }

  start(modalWindow: IModalWindow, app: IApp): void {
      console.log('Start')
    this.modal_ = new NewProjectModal(modalWindow, this.projectsService_);
  }

  onDispose() {
    console.log('[NewProjectModalWindow] onDispose');
  }

}