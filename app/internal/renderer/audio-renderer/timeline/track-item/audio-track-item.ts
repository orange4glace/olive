import { TrackItemRenderer } from "internal/renderer/base/timeline/track-item";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";
import { AudioTrackItemBase } from "internal/timeline/track-item/audio-track-item";
import { Posted, posted } from "worker-postable";
import { AudioResourceAudioRenderer } from "internal/renderer/audio-renderer/resource/audio-resource";

@Posted('AudioTrackItemImpl')
export class AudioTrackItemAudioRenderer extends TrackItemRenderer
    implements AudioTrackItemBase {
  
  @posted resource: AudioResourceAudioRenderer;
  @posted drawing: VideoDrawingRenderer;

}