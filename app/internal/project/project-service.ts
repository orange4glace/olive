import { IProject } from "internal/project/project";
import { createDecorator } from "platform/instantiation/common/instantiation";
import { Event } from "base/common/event";

export const IProjectService = createDecorator<IProjectService>('olive.ProjectService');

export interface IProjectService {

  getCurrentProject(): IProject;
  setCurrentProject(project: IProject): void;
  createProject(): IProject;

  onCurrentProjectChanged: Event<void>;

}