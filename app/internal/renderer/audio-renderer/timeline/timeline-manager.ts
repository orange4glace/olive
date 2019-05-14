import { Posted, PostedEventListener } from "worker-postable";
import { TimelineManagerRenderer } from "internal/renderer/base/all";
import { TimelineAudioRenderer } from "internal/renderer/audio-renderer/timeline/timeline";

@Posted('TimelineManagerImpl')
export class TimelineManagerAudioRenderer extends TimelineManagerRenderer<TimelineAudioRenderer>
    implements PostedEventListener {

  onPostableInstanceCreated() {
    
  }
  
}