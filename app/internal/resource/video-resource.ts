import ResourceType from "./type_t";
import app from "internal/app";
import { Resource, ResourceBase } from "./resource";
import { Postable, postable } from "worker-postable";

export interface VideoResourceBase extends ResourceBase {
  native_id: number;
}

@Postable
export class VideoResource extends Resource {

  readonly path: string;
  @postable readonly native_id: number;

  duration: number;

  constructor(path: string) {
    super(ResourceType.VIDEO);
    this.path = path;

    const native = app.decoder.AddResource(path);
    this.native_id = native.id;
    this.duration = native.duration;
  }

}