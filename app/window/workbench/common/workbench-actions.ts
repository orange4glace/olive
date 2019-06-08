import { Action } from "base/common/actions";
import { IProjectsService } from "internal/project/projects-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { MenuRegistry, MenuId, SyncActionDescriptor } from "platform/actions/common/actions";
import { Registry } from "platform/registry/common/platform";
import { IWorkbenchActionRegistry, Extensions } from "window/workbench/common/actions";

export class OpenProjectAction extends Action {
  static readonly ID = 'olive.workbench.action.OpenProject';
  static readonly LABEL = 'Open: Project';

  constructor(
    id: string,
    label: string,
    @IInstantiationService private readonly instantiationService: IInstantiationService,
    @IProjectsService private readonly projectsService: IProjectsService) {
    super(id, label);
  }

  run(): Promise<void> {
    const d = JSON.parse((window as any).t) as any;
    const project = this.projectsService.deserialize(this.instantiationService, d);
    console.log(project);
    this.projectsService.addProject(project);
    return;
  }

}

MenuRegistry.appendMenuItem(MenuId.MenubarFileMenu, {
  group: 'navigation',
  command: {
    id: 'olive.workbench.action.OpenProject',
    title: 'Open a Project'
  }
})

Registry.as<IWorkbenchActionRegistry>(Extensions.WorkbenchActions).registerWorkbenchAction(
  new SyncActionDescriptor(OpenProjectAction, OpenProjectAction.ID, OpenProjectAction.LABEL),
  'Open: Project');