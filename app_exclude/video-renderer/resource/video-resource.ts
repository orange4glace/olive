import { Posted } from "worker-postable";
import { renderer } from "../renderer";
import { VideoResourceRenderer } from "internal/renderer/base/all";
import { PostedEventListener } from 'worker-postable'

@Posted('VideoResource')
export class VideoResourceVideoRenderer extends VideoResourceRenderer implements PostedEventListener {

  onPostableInstanceCreated() {
    this.native_id = renderer.decoder.AddResource(this.path).id;
    console.log('video resource created', this.native_id)
  }

}