import { Postable, postable } from "worker-postable";
import { IStorageService, StorageService } from "internal/storage/storage-service";
import { IResourceService } from "internal/resource/resource-service";
import { IResource } from "internal/resource/resource";
import { IStorageDirectory } from "internal/storage/storage-directory";
import { ResourceStorageFile } from "internal/resource/resource-storage-file";
import { ITimeline } from "internal/timeline/timeline";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";
import { ITimelineService } from "internal/timeline/timeline-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { InstantiationService } from "platform/instantiation/common/instantiationService";
import { ServiceCollection } from "platform/instantiation/common/serviceCollection";
import { ResourceService } from "internal/resource/resource-service-impl";
import { IProjectCoreService } from "internal/project/project-core-service";
import { ProjectCoreService } from "internal/project/project-core-service-impl";
import { TimelineService } from "internal/timeline/timeline-service-impl";

export interface ProjectBase {
}

export interface IProject extends ProjectBase {

  readonly instantiationService: IInstantiationService;

  readonly coreService: IProjectCoreService;
  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;
}

@Postable
export class Project implements IProject, ProjectBase {

  readonly instantiationService: IInstantiationService;

  readonly coreService: IProjectCoreService;
  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;

  constructor(
    @IInstantiationService readonly internalService: IInstantiationService) {
    this.storageService = new StorageService();
    this.resourceService = new ResourceService();
    this.timelineService = new TimelineService();
    this.coreService = new ProjectCoreService(
      this.storageService,
      this.resourceService,
      this.timelineService);
    const services = new ServiceCollection(
      [IStorageService, this.storageService],
      [IResourceService, this.resourceService],
      [ITimelineService, this.timelineService],
      [IProjectCoreService, this.coreService]
    )
    this.instantiationService = internalService.createChild(services);
  }
 
}