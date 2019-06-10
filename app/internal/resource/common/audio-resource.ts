import { ResourceBaseConstructor, ResourceBase } from "internal/resource/common/resouce";
import { Postabled } from "worker-postable";

export function WithAudioResourceBase<T extends ResourceBaseConstructor>(Base: T) { 
  @Postabled
  class AudioResourceBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.resource.AudioResource';
  };
  return AudioResourceBase;
}
@Postabled
export class AudioResourceBase extends WithAudioResourceBase(ResourceBase) {}