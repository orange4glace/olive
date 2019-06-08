import { IProjectsService } from "internal/project/projects-service";
import { MenuRegistry, MenuId, SyncActionDescriptor } from "platform/actions/common/actions";
import { Action } from "base/common/actions";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IWidgetService } from "window/workbench/services/editor/common/widget-service";
import { IWorkbenchActionRegistry, Extensions as WorkbenchActionExtensions } from "window/workbench/common/actions";
import { Registry } from "platform/registry/common/platform";
import { IProject } from "internal/project/project";
import { StorageWidget } from "window/workbench/common/widgets/storage/widget-impl";
import { IDisposable, combinedDisposable } from "base/common/lifecycle";
import { IWorkbenchContribution, IWorkbenchContributionsRegistry, Extensions } from "window/workbench/common/contributions";
import { LifecyclePhase } from "platform/lifecycle/common/lifecycle";

const SID = ''

export class StorageWidgetListener implements IWorkbenchContribution {

  private projectDisposable_: Map<IProject, IDisposable> = new Map();

  constructor(
    @IProjectsService private readonly projectsService_: IProjectsService) {
    this.projectsService_.projects.forEach(project => this.registerProjectMenuAction(project));
    this.projectsService_.projects.forEach(project => this.registerProjectFileAction(project));
    this.projectsService_.onProjectAdded(project => {
      this.registerProjectMenuAction(project);
      this.registerProjectFileAction(project);
    })
  }

  private registerProjectMenuAction(project: IProject) {
    let disposable: IDisposable;
    disposable = MenuRegistry.appendMenuItem(MenuId.MenubarViewMenu, {
      group: 'navigation',
      command: {
        id: 'olive.workbench.action.OpenStorageWidget' + '_' + project.id,
        title: 'Storage: ' + project.id
      }
    })

    class ScopedOpenStorageWidgetAction extends Action {

      static ID = 'olive.workbench.action.OpenStorageWidget';
      static LABEL = 'Open: Storage'

      constructor(
        id: string,
        label: string,
        @IInstantiationService private readonly instantiationService: IInstantiationService,
        @IProjectsService private readonly projectsService: IProjectsService,
        @IWidgetService private readonly widgetService: IWidgetService) {
        super(id, label);
      }

      run() {
        const projectID = this.id.split('_')[1];
        const project = this.projectsService.getProject(projectID);
        if (!project) throw new Error('Project not found! ' + projectID);
        const widget = this.instantiationService.createInstance(StorageWidget, project, project.storage);
        this.widgetService.openWidget(widget);
        return Promise.resolve();
      }

    }


    disposable = combinedDisposable([Registry.as<IWorkbenchActionRegistry>(WorkbenchActionExtensions.WorkbenchActions).registerWorkbenchAction(
      new SyncActionDescriptor(ScopedOpenStorageWidgetAction, ScopedOpenStorageWidgetAction.ID + '_' + project.id, ScopedOpenStorageWidgetAction.LABEL),
      'Open: Storage'), disposable]);

    this.projectDisposable_.set(project, disposable);
  }

  private registerProjectFileAction(project: IProject) {
    let disposable: IDisposable;
    disposable = MenuRegistry.appendMenuItem(MenuId.MenubarFileMenu, {
      group: 'navigation',
      command: {
        id: 'olive.workbench.action.SaveProject' + '_' + project.id,
        title: 'Save: ' + project.id
      }
    })
    console.log('registerProjectFileAction', project)

    class ScopedOpenStorageWidgetAction extends Action {

      static ID = 'olive.workbench.action.SaveProject';
      static LABEL = 'Save: Storage'

      constructor(
        id: string,
        label: string,
        @IInstantiationService private readonly instantiationService: IInstantiationService,
        @IProjectsService private readonly projectsService: IProjectsService,
        @IWidgetService private readonly widgetService: IWidgetService) {
        super(id, label);
      }

      run() {
        const projectID = this.id.split('_')[1];
        const project = this.projectsService.getProject(projectID);
        if (!project) throw new Error('Project not found! ' + projectID);
        console.log(project.serialize());
        return Promise.resolve();
      }

    }


    disposable = combinedDisposable([Registry.as<IWorkbenchActionRegistry>(WorkbenchActionExtensions.WorkbenchActions).registerWorkbenchAction(
      new SyncActionDescriptor(ScopedOpenStorageWidgetAction, ScopedOpenStorageWidgetAction.ID + '_' + project.id, ScopedOpenStorageWidgetAction.LABEL),
      'Save: Project'), disposable]);

    this.projectDisposable_.set(project, disposable);
  }

}

Registry.as<IWorkbenchContributionsRegistry>(Extensions.Workbench).registerWorkbenchContribution(StorageWidgetListener, LifecyclePhase.Ready);