import app from "internal/app";
import { Resource, ResourceBase, IResource, SerializedResource, ResourceFactory, ResourceFactoryRegistry, ResourceIdentifier } from "./resource";
import { Postable, postable } from "worker-postable";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";

export interface VideoResourceBase extends ResourceBase {
  width: number;
  height: number;
}

export interface IVideoResource extends IResource, VideoResourceBase {
  duration: number;
}

export interface SerializedVideoResource extends SerializedResource {
  width: number;
  height: number;
  duration: number;
}

@Postable
export class VideoResource extends Resource implements IVideoResource {
  static readonly TYPE = 'olive.resource.VideoResource';

  @postable width: number;
  @postable height: number;
  duration: number;

  constructor(id: ResourceIdentifier, path: string, width: number, height: number, duration: number) {
    super(id, VideoResource.TYPE, path);
    this.width = width;
    this.height = height;
    this.duration = duration;

    // const native = app.decoder.AddResource(path);
    // this.native_id = native.id;
    // this.duration = native.duration;
  }

  serialize(): SerializedVideoResource {
    return {
      ...super.serialize(),
      width: this.width,
      height: this.height,
      duration: this.duration
    };
  }

}

class VideoResourceFactory implements ResourceFactory {
  serialize(resource: VideoResource): SerializedVideoResource {
    return resource.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedVideoResource): VideoResource {
    const videoResource = new VideoResource(serial.id, serial.path, serial.width, serial.height, serial.duration);
    return videoResource;
  }
}

Registry.as<ResourceFactoryRegistry>(ResourceFactoryRegistry.ID).registerFactory(VideoResource.TYPE, VideoResourceFactory);