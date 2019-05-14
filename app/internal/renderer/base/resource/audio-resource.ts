import { Posted } from "worker-postable";
import { VideoResourceBase } from "internal/resource/video-resource";
import { ResourceRenderer } from "./resource";

@Posted('AudioResource')
export class AudioResourceRenderer extends ResourceRenderer implements VideoResourceBase {
  
  width: number;
  height: number;
  native_id: number;

}