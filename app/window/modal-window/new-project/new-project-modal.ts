import { IProjectService } from "internal/project/project-service";

export interface INewProjectModal {



}

export class NewProjectModal implements INewProjectModal {

  constructor(
    @IProjectService private readonly projectService_: IProjectService) {
  }

}