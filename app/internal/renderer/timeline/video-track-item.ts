import { TrackItemRenderer } from "./track-item";
import { Posted } from "worker-postable";
import { renderer } from "../renderer";
import { ResourceRenderer } from "../resource/resource";
import NVG from "../../../../nanovg-webgl";
import { VideoFrameData, DecodeResult } from "internal/decoder/decoder";
import { VideoTrackItemBase } from "internal/timeline/video-track-item";

@Posted('VideoTrackItem')
export class VideoTrackItemRenderer extends TrackItemRenderer
    implements VideoTrackItemBase {

  acquiredDecoderID: number = -1;
  
  resource: ResourceRenderer;

  decodePromise: Promise<DecodeResult>;

  async draw(nvg: NVG, timecode: number) {
    let data = await this.decodePromise;
    let videoFrameData: VideoFrameData = renderer.converter.AsVideoFrameData(data.data);
    // let context: DrawingContext = {
    //   nvg: nvg,
    //   timecode: timecode,
    //   screenWidth: 300,
    //   screenHeight: 150,
    //   videoFrame: videoFrameData
    // };
    // this.drawing.draw(context, timecode - this.time.base);
    renderer.decoder.FreeFrame(data.native);
  }

  decode(timecode: number) {
    const decoder = renderer.decoder;
    if (this.acquiredDecoderID == -1)
      this.acquiredDecoderID = decoder.Acquire(this.resource.id, timecode);
    console.log(this.acquiredDecoderID)
    this.decodePromise = decoder.Decode(this.resource.id, timecode, this.acquiredDecoderID);
  }

}