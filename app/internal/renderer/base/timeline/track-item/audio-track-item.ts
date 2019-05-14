import { TrackItemRenderer } from "internal/renderer/base/timeline/track-item";
import { VideoDrawingRenderer } from "internal/renderer/base/rendering/drawing/video-drawing";
import { AudioTrackItemBase } from "internal/timeline/track-item/audio-track-item";
import { Posted } from "worker-postable";

@Posted('AudioTrackItemImpl')
export class AudioTrackItemRenderer extends TrackItemRenderer
    implements AudioTrackItemBase {
  
  /*@postable*/ drawing: VideoDrawingRenderer;

}