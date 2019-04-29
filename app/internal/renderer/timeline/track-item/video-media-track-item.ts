import { TrackItemRenderer } from "../track-item";
import { Posted } from "worker-postable";
import { renderer } from "../../renderer";
import { ResourceRenderer } from "../../resource/resource";
import NVG from "../../../../../nanovg-webgl";
import { VideoFrameData, DecodeResult } from "internal/decoder/decoder";
import { RenderingContext } from "internal/renderer/rendering/context/rendering-context";
import { VideoMediaTrackItemBase } from "internal/timeline/video-media-track-item";
import { VideoTrackItemRenderer } from "internal/renderer/timeline/track-item/video-track-item";

@Posted('VideoMediaTrackItemImpl')
export abstract class VideoMediaTrackItemRenderer extends VideoTrackItemRenderer
    implements VideoMediaTrackItemBase {
  
  resource: ResourceRenderer;
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

  decode(timecode: number) {
    const decoder = renderer.decoder;
    if (this.acquiredDecoderID == -1)
      this.acquiredDecoderID = decoder.Acquire(this.resource.id, timecode);
    console.log(this.acquiredDecoderID)
    this.decodePromise = decoder.Decode(this.resource.id, timecode, this.acquiredDecoderID);
  }

}