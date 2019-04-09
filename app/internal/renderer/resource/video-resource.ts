import { Posted } from "worker-postable";
import { VideoResourceBase } from "internal/resource/video-resource";
import { ResourceRenderer } from "./resource";
import { renderer } from "../renderer";

@Posted('VideoResource')
export class VideoResourceRenderer extends ResourceRenderer implements VideoResourceBase {
  
  native_id: number;

  __onPostableInstanceCreated() {
    super.__onPostableInstanceCreated();
    this.native_id = renderer.decoder.AddResource(this.path).id;
    console.log('video resource created', this.native_id)
  }

}