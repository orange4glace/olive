import { Resource, IResource, ResourceFactory, ResourceFactoryRegistry, ISerializedResource } from "./resource";
import { Postable } from "worker-postable";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";
import { Constructor } from "base/olive/mixin";
import { WithAudioResourceBase } from "internal/resource/common/audio-resource";
import { ResourceIdentifier } from "internal/resource/common/resouce";

export interface SerializedAudioResource extends ISerializedResource {
  duration: number;
}

export interface IAudioResource extends IResource {}

@Postable
export class AudioResource extends WithAudioResourceBase(Resource) implements IAudioResource {
  static readonly TYPE = 'olive.resource.AudioResource';

  duration: number;

  constructor(id: ResourceIdentifier, path: string, duration: number) {
    super(id, AudioResource.TYPE, path);
    this.duration = duration;

    // exec(`.${(ffmpeg as any).path} -i "${this.path}" -f f32le -ac 1 -ar 48000 -acodec pcm_f32le "${this.path}.raw"`,
    //   (error, stdout, stderr) => {
    //     if (error) {
    //       logger.error(error.message);
    //       console.error(error);
    //       return;
    //     }
    //     console.log(stdout);
    //     console.log(stderr);
    // });
  }

  serialize(): SerializedAudioResource {
    return {
      ...super.serialize(),
      duration: this.duration
    }
  }

}

class AudioResourceFactory implements ResourceFactory {
  serialize(resource: AudioResource): SerializedAudioResource {
    return resource.serialize();
  }
  deserialize(instantiationService: IInstantiationService, serial: SerializedAudioResource): AudioResource {
    const audioResource = new AudioResource(serial.id, serial.path, serial.duration);
    return audioResource;
  }
}

Registry.as<ResourceFactoryRegistry>(ResourceFactoryRegistry.ID).registerFactory(AudioResource.TYPE, AudioResourceFactory);