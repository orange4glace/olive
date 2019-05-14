import { Posted, PostedEventListener } from "worker-postable";
import { ResourceRenderer } from "internal/renderer/base/resource";
import { AudioResourceBase } from "internal/resource/audio-resource";

@Posted('AudioResource')
export class AudioResourceAudioRenderer extends ResourceRenderer implements AudioResourceBase, PostedEventListener {

  onPostableInstanceCreated() {
  }

}