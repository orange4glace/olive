import { Resource, ResourceBase, IResource, SerializedResource, ResourceFactory, ResourceFactoryRegistry, ResourceIdentifier } from "./resource";
import { Postable } from "worker-postable";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";

export interface AudioResourceBase extends ResourceBase {
}

export interface IAudioResource extends IResource, AudioResourceBase {}

export interface SerializedAudioResource extends SerializedResource {
  duration: number;
}

@Postable
export class AudioResource extends Resource implements IAudioResource {
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