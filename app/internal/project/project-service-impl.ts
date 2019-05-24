import { IProject, Project } from "internal/project/project";
import { Event, Emitter } from "base/common/event";
import { IProjectService } from "internal/project/project-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export class ProjectService implements IProjectService {

  private currentProject_: IProject;

  constructor(
    @IInstantiationService private readonly internalService_: IInstantiationService
  ) {}

  getCurrentProject(): IProject {
    return this.currentProject_;
  }

  setCurrentProject(project: IProject) {
    this.currentProject_ = project;
    this.onCurrentProjectChanged_.fire();
  }

  createProject(): IProject {
    return new Project(this.internalService_);
  }

  onCurrentProjectChanged_: Emitter<void> = new Emitter<void>();
  onCurrentProjectChanged: Event<void> = this.onCurrentProjectChanged_.event;

}