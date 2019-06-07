import { Postable } from "worker-postable";
import { Serializable } from "base/olive/serialize";
import { IStorageDirectory, StorageDirectory } from "internal/storage/storage-directory";
import { IStorageFile } from "internal/storage/storage-file";
import { ITimeline } from "internal/timeline/timeline";
import { MediaResourceStorageFile, AudioResourceStorageFile } from "internal/resource/resource-storage-file";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";
import { ITimelineManager, TimelineManagerImpl } from "internal/timeline/timeline-manager";
import { IResourceManager, ResourceManager } from "internal/resource/manager";

export interface ProjectBase {
}

export interface IProject extends ProjectBase {

  readonly id: string;

  readonly timelineManager: ITimelineManager;
  readonly storage: IStorageDirectory;
  

  importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile>;
  createTimeline(directory: IStorageDirectory): ITimeline;

}

export interface ProjectSerial {
  id: string;
}

@Postable
export class Project implements IProject, ProjectBase, Serializable {

  readonly id: string;

  readonly timelineManager: ITimelineManager;
  readonly resourceManager: IResourceManager;
  readonly storage: IStorageDirectory;

  constructor(
    id: string) {
    this.id = id;

    this.timelineManager = new TimelineManagerImpl();
    this.resourceManager = new ResourceManager();
    this.storage = new StorageDirectory('');
  }

  async importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile> {
    const resources = await this.resourceManager.createResource(path);
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
    const timeline = this.timelineManager.createTimeline();
    const timelineStorageFile = new TimelineStorageFile('Timeline ' + timeline.id, timeline);
    directory.addItem(timelineStorageFile);
    return timeline;
  }

  serialize() {
    const serial: ProjectSerial = {
      id: this.id
    }
    return serial;
  }
 
}