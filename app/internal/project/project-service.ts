import { IProject } from "internal/project/project";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { Event } from "base/common/event";

export const IProjectService = createDecorator<IProjectService>('olive.ProjectService');

export interface IProjectService {

  projects: ReadonlyMap<string, IProject>;

  onCurrentProjectChanged: Event<void>;
  onProjectAdded: Event<IProject>;

  getCurrentProject(): IProject;
  setCurrentProject(project: IProject): void;
  createProject(): IProject;

}