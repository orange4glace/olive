import { Postable } from "worker-postable";
import { IStorageService, StorageService } from "internal/storage/storage-service";
import { IResourceService } from "internal/resource/resource-service";
import { ITimelineService } from "internal/timeline/timeline-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ServiceCollection } from "platform/instantiation/common/serviceCollection";
import { ResourceService } from "internal/resource/resource-service-impl";
import { IProjectCoreService } from "internal/project/project-core-service";
import { ProjectCoreService } from "internal/project/project-core-service-impl";
import { TimelineService } from "internal/timeline/timeline-service-impl";
import { Serializable } from "base/olive/serialize";

export interface ProjectBase {
}

export interface IProject extends ProjectBase {

  readonly id: string;

  readonly instantiationService: IInstantiationService;

  readonly coreService: IProjectCoreService;
  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;
}

export interface ProjectSerial {
  id: string;
}

@Postable
export class Project implements IProject, ProjectBase, Serializable {

  readonly id: string;

  readonly instantiationService: IInstantiationService;

  readonly coreService: IProjectCoreService;
  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;

  constructor(
    id: string,
    @IInstantiationService readonly internalService: IInstantiationService) {
    this.id = id;
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

  serialize() {
    const serial: ProjectSerial = {
      id: this.id
    }
    return serial;
  }
 
}