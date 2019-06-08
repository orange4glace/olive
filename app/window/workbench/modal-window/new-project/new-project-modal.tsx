import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IProjectsService } from "internal/project/projects-service";
import { MenuRegistry, MenuId, SyncActionDescriptor } from "platform/actions/common/actions";
import { Action } from "base/common/actions";
import { IModalWindowService } from "window/workbench/modal-window/modal-window-service";
import { NewProjectModalWindowStarter } from "window/workbench/modal-window/new-project/new-project-modal-window-starter";
import { Registry } from "platform/registry/common/platform";
import { IWorkbenchActionRegistry, Extensions } from "window/workbench/common/actions";
import { IModalWindow } from 'window/workbench/modal-window/modal-window';

export interface INewProjectModal {



}

export class NewProjectModal implements INewProjectModal {

  constructor(
    private readonly modalWindow_: IModalWindow,
    @IProjectsService private readonly projectsService_: IProjectsService) {
    ReactDOM.render(<NewProjectModalView modal={this}/>, 
      modalWindow_.appWindow.nativeWindow.document.getElementById('app'));
  }

  done() {
    this.projectsService_.createProject();
    this.modalWindow_.close();
  }

}

class NewProjectModalView extends React.Component<{modal: NewProjectModal}> {

  render() {
    return (
      <div onClick={e => this.props.modal.done()}>DONE</div>
    )
  }

}

class OpenNewProjectModelAction extends Action {

  static readonly ID = 'olive.workbench.action.OpenNewProjectModelAction';
  static readonly LABEL = 'New Project';

  constructor(
    id: string,
    label: string,
    @IProjectsService private readonly projectsService: IProjectsService,
    @IModalWindowService private readonly modalWindowService: IModalWindowService
  ) {
    super(id, label);
  }

  run(): Promise<void> {
    this.modalWindowService.createModal(new NewProjectModalWindowStarter(this.projectsService));
    return Promise.resolve();
  }

}

Registry.as<IWorkbenchActionRegistry>(Extensions.WorkbenchActions).registerWorkbenchAction(
  new SyncActionDescriptor(OpenNewProjectModelAction,
  OpenNewProjectModelAction.ID,
  OpenNewProjectModelAction.LABEL),
  'Create: New Project')

MenuRegistry.appendMenuItem(MenuId.MenubarFileMenu, {
  group: 'navigation',
  command: {
    id: OpenNewProjectModelAction.ID,
    title: 'New Project'
  }
});