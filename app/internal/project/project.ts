import { Postable, postable } from "worker-postable";
import { IStorageService, StorageService } from "internal/storage/storage-service";
import { IResourceService } from "internal/resource/resource-service";
import { IResource } from "internal/resource/resource";
import { IStorageDirectory } from "internal/storage/storage-directory";
import { ResourceStorageFile } from "internal/resource/resource-storage-file";
import { ITimeline } from "internal/timeline/timeline";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";
import { ITimelineService, TimelineService } from "internal/timeline/timeline-service";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { InstantiationService } from "platform/instantiation/common/instantiationService";
import { ServiceCollection } from "platform/instantiation/common/serviceCollection";
import { ResourceService } from "internal/resource/resource-service-impl";

export interface ProjectBase {
}

export interface IProject extends ProjectBase {

  readonly instantiationService: IInstantiationService;

  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;

  createResource(path: string, directory: IStorageDirectory): Promise<IResource>;
  createTimeline(directory: IStorageDirectory): ITimeline;
}

@Postable
export class Project implements IProject, ProjectBase {

  readonly instantiationService: IInstantiationService;

  readonly storageService: IStorageService;
  readonly resourceService: IResourceService;
  readonly timelineService: ITimelineService;

  constructor(
    @IInstantiationService readonly internalService: IInstantiationService) {
    this.storageService = new StorageService();
    this.resourceService = new ResourceService();
    this.timelineService = new TimelineService();
    const services = new ServiceCollection(
      [IStorageService, this.storageService],
      [IResourceService, this.resourceService],
      [ITimelineService, this.timelineService]
    )
    this.instantiationService = internalService.createChild(services);
  }

  async createResource(path: string, directory: IStorageDirectory): Promise<IResource> {
    const resource = await this.resourceService.createResource(path);
    const resourceStorageFile = new ResourceStorageFile(resource);
    directory.addItem(resourceStorageFile);
    return resource;
  }

  createTimeline(directory: IStorageDirectory): ITimeline {
    const timeline = this.timelineService.createTimeline();
    const timelineStorageFile = new TimelineStorageFile('Timeline ' + timeline.id, timeline);
    directory.addItem(timelineStorageFile);
    return timeline;
  }
 
}