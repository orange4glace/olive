import { TrackItemRenderer } from "internal/renderer/base/timeline/track-item/track-item";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";
import { AudioTrackItemBase } from "internal/timeline/track-item/audio-track-item";
import { Posted, posted } from "worker-postable";
import { AudioResourceRenderer } from "internal/renderer/base/resource/audio-resource";

@Posted('AudioTrackItemImpl')
export class AudioTrackItemRenderer extends TrackItemRenderer
    implements AudioTrackItemBase {
  
  @posted resource: AudioResourceRenderer;
  @posted drawing: VideoDrawingRenderer;

}