import ResourceType from "./type_t";
import app from "internal/app";
import { Resource, ResourceBase, IResource } from "./resource";
import { Postable, postable } from "worker-postable";
import { TrackItem } from "internal/timeline/track-item/track-item";

export interface VideoResourceBase extends ResourceBase {
  width: number;
  height: number;
}

export interface IVideoResource extends IResource, VideoResourceBase {
  duration: number;
}

@Postable
export class VideoResource extends Resource implements IVideoResource {

  @postable width: number;
  @postable height: number;
  duration: number;

  constructor(path: string, width: number, height: number, duration: number) {
    super(ResourceType.VIDEO, path);
    this.width = width;
    this.height = height;
    this.duration = duration;

    // const native = app.decoder.AddResource(path);
    // this.native_id = native.id;
    // this.duration = native.duration;
  }

}