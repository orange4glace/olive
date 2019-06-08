import { Postable } from "worker-postable";
import { Serializable } from "base/olive/serialize";
import { IStorageDirectory, StorageDirectory, SerializedStorageDirectory } from "internal/storage/storage-directory";
import { IStorageFile } from "internal/storage/storage-file";
import { ITimeline } from "internal/timeline/timeline";
import { MediaResourceStorageFile, AudioResourceStorageFile } from "internal/resource/resource-storage-file";
import { TimelineStorageFile } from "internal/timeline/timeline-storage-file";
import { ITimelineManager, TimelineManagerImpl, SerializedTimelineManager } from "internal/timeline/timeline-manager";
import { ResourceManager, SerializedResourceManager } from "internal/resource/manager";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { ServiceCollection } from "platform/instantiation/common/serviceCollection";
import { ITimelinesService } from "internal/timeline/timelines-service";
import { IResourcesService } from "internal/resource/resource-service";
import { VideoSetting } from "internal/timeline/video-setting";
import { AudioSetting } from "internal/timeline/audio-setting";
import { FrameRate } from "internal/timeline/frame_rate";

export interface SerializedProject {
  id: string;
  resourceManager: SerializedResourceManager;
  timelineManager: SerializedTimelineManager;
  storage: SerializedStorageDirectory;
}

export interface ProjectBase {
}

export interface IProject extends ProjectBase {

  readonly id: string;

  readonly timelineManager: ITimelineManager;
  readonly storage: IStorageDirectory;
  

  importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile>;
  createTimeline(directory: IStorageDirectory): ITimeline;

  serialize(): object;

}

@Postable
export class Project implements IProject, ProjectBase, Serializable {

  readonly id: string;

  readonly instantiationService: IInstantiationService;

  private timelineManager_: TimelineManagerImpl;
  public get timelineManager() { return this.timelineManager_; }
  private resourceManager_: ResourceManager;
  public get resourceManager() { return this.resourceManager_; }
  private storage_: IStorageDirectory;
  public get storage() { return this.storage_; }

  constructor(id: string,
    @IInstantiationService instantiationService: IInstantiationService) {
    this.id = id;

    this.timelineManager_ = new TimelineManagerImpl();
    this.resourceManager_ = new ResourceManager();
    this.storage_ = new StorageDirectory('');

    const projectServices = new ServiceCollection();
    projectServices.set(ITimelinesService, this.timelineManager);
    projectServices.set(IResourcesService, this.resourceManager);

    this.instantiationService = instantiationService.createChild(projectServices);
  }

  async importResource(path: string, directory: IStorageDirectory): Promise<IStorageFile> {
    const resources = await this.resourceManager.createResource(path);

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
    const timeline = this.timelineManager.createTimeline(new VideoSetting(1920, 1080, new FrameRate(30, 1)), new AudioSetting(48000));
    const timelineStorageFile = new TimelineStorageFile('Timeline ' + timeline.id, timeline);
    directory.addItem(timelineStorageFile);
    return timeline;
  }

  serialize(): SerializedProject {
    return {
      id: this.id,
      resourceManager: this.resourceManager.serialize(),
      timelineManager: this.timelineManager.serialize(),
      storage: this.storage.serialize()
    }
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedProject): Project {
    const project = new Project(serial.id, instantiationService);
    console.log('Deserialize Resource');
    project.resourceManager_.deserialize(project.instantiationService, serial.resourceManager);
    console.log('Deserialize Timeline');
    project.timelineManager_.deserialize(project.instantiationService, serial.timelineManager);
    console.log(project);
    console.log('Deserialize Storage');
    project.storage_ = StorageDirectory.deserialize(project.instantiationService, serial.storage);
    return project;
  }
 
}