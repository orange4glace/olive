import { WithVideoResourceBase } from "internal/resource/common/video-resource";
import { ResourceBase } from "internal/resource/common/resouce";
import { PostedEventListener, Posted } from "worker-postable";
import { VideoRendererGlobal } from "internal/renderer/video-renderer/global";

@Posted
export class VideoResourceVideoRenderer extends WithVideoResourceBase(ResourceBase) implements PostedEventListener {

  native_id: number;

  onPostableInstanceCreated() {
    this.native_id = VideoRendererGlobal.decoder.AddResource(this.path).id;
    console.log('video resource created', this.native_id)
  }

}