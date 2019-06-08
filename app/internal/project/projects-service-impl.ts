import { IProject, Project, SerializedProject } from "internal/project/project";
import { Event, Emitter } from "base/common/event";
import { IProjectsService } from "internal/project/projects-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import uuid from "uuid";
import { ref } from "worker-postable";

export class ProjectsService implements IProjectsService {

  _serviceBrand: any;

  private readonly onCurrentProjectChanged_: Emitter<void> = new Emitter<void>();
  public readonly onCurrentProjectChanged: Event<void> = this.onCurrentProjectChanged_.event;

  private readonly onProjectAdded_: Emitter<IProject> = new Emitter<IProject>();
  public readonly onProjectAdded = this.onProjectAdded_.event;

  projects: Map<string, IProject>;
  private currentProject_: IProject;

  constructor(
    @IInstantiationService private readonly internalService_: IInstantiationService
  ) {
    this.projects = new Map();
  }

  getCurrentProject(): IProject {
    return this.currentProject_;
  }

  setCurrentProject(project: IProject) {
    this.currentProject_ = project;
    this.onCurrentProjectChanged_.fire();
  }

  createProject(): IProject {
    const project = new Project(uuid(), this.internalService_);
    this.doAddProject(project);
    return project;
  }

  addProject(project: IProject): void {
    this.doAddProject(project);
  }

  getProject(id: string): IProject | null {
    const project = this.projects.get(id);
    return project;
  }

  private doAddProject(project: IProject) {
    ref(project);
    this.projects.set(project.id, project);
    this.onProjectAdded_.fire(project);
  }

  deserialize(instantiationService: IInstantiationService, serial: SerializedProject): Project | null {
    return Project.deserialize(instantiationService, serial);
  }

}