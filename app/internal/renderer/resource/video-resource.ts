import { Posted } from "worker-postable";
import { VideoResourceBase } from "internal/resource/video-resource";
import { ResourceRenderer } from "./resource";

@Posted('VideoResource')
export class VideoResourceRenderer extends ResourceRenderer implements VideoResourceBase {
  
  native_id: number;

}