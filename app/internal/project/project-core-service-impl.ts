import { IProjectCoreService } from "internal/project/project-core-service";
import { IStorageService } from "internal/storage/storage-service";
import { ITimelineService } from "internal/timeline/timeline-service";
import { IStorageDirectory } from "internal/storage/storage-directory";
import { ITimeline } from "internal/timeline/timeline";
import { IResource } from "internal/resource/resource";
import { IResourceService } from "internal/resource/resource-service";
import { ResourceStorageFile, MediaResourceStorageFile, AudioResourceStorageFile } from "internal/resource/resource-storage-file";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";
import { IStorageFile } from "internal/storage/storage-file";

export class ProjectCoreService implements IProjectCoreService {

  constructor(
    @IStorageService private readonly storageService_: IStorageService,
    @IResourceService private readonly resourceService_: IResourceService,
    @ITimelineService private readonly timelineService_: ITimelineService
  ) {

  }

  async importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile> {
    const resources = await this.resourceService_.createResource(path);
    console.log('cr', path, directory, resources);

    let storageFile: IStorageFile = null;
    if (resources.video && resources.audio) {
      const storageFile = new MediaResourceStorageFile(path, resources.video, resources.audio);
      directory.addItem(storageFile);
    }
    else if (resources.audio) {
      const storageFile = new AudioResourceStorageFile(path, resources.audio);
      directory.addItem(storageFile);
    }
    return storageFile;
  }

  createTimeline(directory: IStorageDirectory): ITimeline {
    const timeline = this.timelineService_.createTimeline();
    const timelineStorageFile = new TimelineStorageFile('Timeline ' + timeline.id, timeline);
    directory.addItem(timelineStorageFile);
    return timeline;
  }

}