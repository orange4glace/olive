import { IProject, SerializedProject } from "internal/project/project";
import { createDecorator, IInstantiationService } from "platform/instantiation/common/instantiation";
import { Event } from "base/common/event";

export const IProjectsService = createDecorator<IProjectsService>('olive.project.ProjectsService');

export interface IProjectsService {

  _serviceBrand: any;

  projects: ReadonlyMap<string, IProject>;

  onCurrentProjectChanged: Event<void>;
  onProjectAdded: Event<IProject>;

  getCurrentProject(): IProject;
  setCurrentProject(project: IProject): void;
  createProject(): IProject;
  addProject(project: IProject): void;
  getProject(id: string): IProject | null;
  deserialize(instantiationService: IInstantiationService, serial: SerializedProject): IProject | null;

}