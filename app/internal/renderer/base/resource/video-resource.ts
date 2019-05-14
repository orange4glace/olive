import { Posted } from "worker-postable";
import { VideoResourceBase } from "internal/resource/video-resource";
import { ResourceRenderer } from "./resource";

@Posted('VideoResource')
export class VideoResourceRenderer extends ResourceRenderer implements VideoResourceBase {
  
  width: number;
  height: number;
  native_id: number;

}