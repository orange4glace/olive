import { WithVideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
import { VideoTrackItemVideoRenderer } from "internal/timeline/video-renderer/track-item/video-track-item";
import { DecodeResult, VideoFrameData } from "internal/decoder/decoder";
import { RenderingContext } from "internal/rendering/drawing/video-renderer/context";
import { Posted } from "worker-postable";
import { VideoRendererGlobal } from "internal/renderer/video-renderer/global";
import { VideoResourceVideoRenderer } from "internal/resource/video-renderer/video-resource";

@Posted
export class VideoMediaTrackItemVideoRenderer extends WithVideoMediaTrackItemBase(VideoTrackItemVideoRenderer) {

  protected resource_: VideoResourceVideoRenderer;
  public get resource() { return this.resource_; }

  acquiredDecoderID: number = -1;
  decodePromise: Promise<DecodeResult>;

  async beforeDraw(timecode: number): Promise<null> {
    const decoder = VideoRendererGlobal.decoder;
    if (this.acquiredDecoderID == -1)
      this.acquiredDecoderID = decoder.Acquire(this.resource.native_id, timecode);
    this.decodePromise = decoder.Decode(this.resource.native_id, timecode, this.acquiredDecoderID);
    return;
  }

  async draw(timecode: number): Promise<null> {
    let data = await this.decodePromise;
    let videoFrameData: VideoFrameData = VideoRendererGlobal.converter.AsVideoFrameData(data.data);
    let context: RenderingContext = {
      timeOffset: timecode,
      screenWidth: 300,
      screenHeight: 150,
      videoFrame: videoFrameData
    };
    this.drawing.draw(context);
    VideoRendererGlobal.decoder.FreeFrame(data.native);
    return null;
  }

  afterDraw() {
    this.drawing.afterDraw();
  }

  decode(timecode: number) {
    const decoder = VideoRendererGlobal.decoder;
    if (this.acquiredDecoderID == -1)
      this.acquiredDecoderID = decoder.Acquire(this.resource.native_id, timecode);
    this.decodePromise = decoder.Decode(this.resource.native_id, timecode, this.acquiredDecoderID);
  }

}