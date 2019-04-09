import ResourceType from "./type_t";
import app from "internal/app";
import { Resource, ResourceBase } from "./resource";
import { Postable, postable } from "worker-postable";

export interface VideoResourceBase extends ResourceBase {
}

@Postable
export class VideoResource extends Resource {

  duration: number;

  constructor(path: string) {
    super(ResourceType.VIDEO, path);

    // const native = app.decoder.AddResource(path);
    // this.native_id = native.id;
    // this.duration = native.duration;
  }

}