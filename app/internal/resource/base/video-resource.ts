import { Resource, IResource, ResourceFactory, ResourceFactoryRegistry, ISerializedResource } from "./resource";
import { Postable } from "worker-postable";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";
import { WithVideoResourceBase } from "internal/resource/common/video-resource";
import { ResourceIdentifier } from "internal/resource/common/resouce";
import { Timebase, ReadonlyTimebase, SerializedTimebase } from "internal/timeline/base/timebase";

export interface IVideoResource extends IResource {
  readonly width: number;
  readonly height: number;
  readonly duration: number;
}

export interface SerializedVideoResource extends ISerializedResource {
  width: number;
  height: number;
  timebase: SerializedTimebase;
  duration: number;
}

@Postable
export class VideoResource extends WithVideoResourceBase(Resource) implements IVideoResource {
  static readonly TYPE = 'olive.resource.VideoResource';

  private timebase_: Timebase;
  public get timebase(): ReadonlyTimebase { return this.timebase_; }

  private duration_: number;
  public get duration() { return this.duration_; }

  constructor(id: ResourceIdentifier, path: string, width: number, height: number, timebase: Timebase, duration: number) {
    super(id, VideoResource.TYPE, path);
    this.width_ = width;
    this.height_ = height;
    this.timebase_ = timebase;
    this.duration_ = duration;

    // const native = app.decoder.AddResource(path);
    // this.native_id = native.id;
    // this.duration = native.duration;
  }

  serialize(): SerializedVideoResource {
    return {
      ...super.serialize(),
      width: this.width,
      height: this.height,
      timebase: this.timebase.serialize(),
      duration: this.duration
    };
  }

}

class VideoResourceFactory implements ResourceFactory {
  serialize(resource: VideoResource): SerializedVideoResource {
    return resource.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedVideoResource): VideoResource {
    const timebase = Timebase.deserialize(serial.timebase);
    const videoResource = new VideoResource(serial.id, serial.path, serial.width, serial.height, timebase, serial.duration);
    return videoResource;
  }
}

Registry.as<ResourceFactoryRegistry>(ResourceFactoryRegistry.ID).registerFactory(VideoResource.TYPE, VideoResourceFactory);