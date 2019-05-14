import ResourceType from "./type_t";
import { Resource, ResourceBase } from "./resource";
import { Postable } from "worker-postable";

export interface AudioResourceBase extends ResourceBase {
}

@Postable
export class AudioResource extends Resource {

  duration: number;

  constructor(path: string, duration: number) {
    super(ResourceType.AUDIO, path);
    this.duration = duration;
  }

}