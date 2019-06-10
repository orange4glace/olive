import { Posted } from "worker-postable";
import { renderer } from "../../renderer";
import NVG from "../../../../../../nanovg-webgl";
import { VideoFrameData, DecodeResult } from "internal/decoder/decoder";
import { RenderingContext } from "internal/renderer/video-renderer/rendering/context/rendering-context";
import { VideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
import { VideoMediaTrackItemRenderer } from "internal/renderer/base/all";
import { VideoTrackItemVideoRenderer } from "internal/renderer/video-renderer/timeline/track-item/video-track-item";
import { VideoResourceVideoRenderer } from "internal/renderer/video-renderer/resource/video-resource";

@Posted('VideoMediaTrackItemImpl')
export class VideoMediaTrackItemVideoRenderer extends VideoTrackItemVideoRenderer 
    implements VideoMediaTrackItemRenderer {
  
  resource: VideoResourceVideoRenderer;
  acquiredDecoderID: number = -1;
  decodePromise: Promise<DecodeResult>;

  async draw(nvg: NVG, timecode: number): Promise<null> {
    let data = await this.decodePromise;
    let videoFrameData: VideoFrameData = renderer.converter.AsVideoFrameData(data.data);
    let context: RenderingContext = {
      nvg: nvg,
      timeOffset: timecode,
      screenWidth: 300,
      screenHeight: 150,
      videoFrame: videoFrameData
    };
    this.drawing.draw(context);
    renderer.decoder.FreeFrame(data.native);
    return null;
  }

  afterDraw(nvg: NVG) {
    this.drawing.afterDraw(nvg);
  }

  decode(timecode: number) {
    const decoder = renderer.decoder;
    if (this.acquiredDecoderID == -1)
      this.acquiredDecoderID = decoder.Acquire(this.resource.id, timecode);
    this.decodePromise = decoder.Decode(this.resource.id, timecode, this.acquiredDecoderID);
  }

}