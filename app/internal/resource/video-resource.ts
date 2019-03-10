import Resource from "./resource";
import ResourceType from "./type_t";
import app from "internal/app";

export default class VideoResource extends Resource {

  readonly path: string;
  readonly native_id: number;

  constructor(path: string) {
    super(ResourceType.VIDEO);
    this.path = path;

    this.native_id = app.decoder.AddResource(path);
  }

}