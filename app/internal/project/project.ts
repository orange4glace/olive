import { Postable, postable } from "worker-postable";
import { ITimelineManager, TimelineManagerImpl, TimelineManagerBase } from "internal/timeline/timeline-manager";

export interface ProjectBase {
  timelineManager: TimelineManagerBase;
}

export interface IProject extends ProjectBase {
  timelineManager: ITimelineManager;
}

@Postable
export class Project implements IProject, ProjectBase {

  @postable timelineManager: ITimelineManager;

  constructor() {
    this.timelineManager = new TimelineManagerImpl();
  }
 
}