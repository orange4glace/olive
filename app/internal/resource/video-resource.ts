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

  constructor(path: string) {
    super(ResourceType.VIDEO);
    this.path = path;

    this.native_id = app.decoder.AddResource(path);
  }

}