import { VideoTrackItemBase } from "internal/timeline";
import { TrackItemRenderer } from "./track-item";
import { Posted } from "worker-postable";
import { renderer } from "../renderer";
import { ResourceRenderer } from "../resource/resource";
import NVG from "../../../../nanovg-webgl";
import { DrawingContext } from "../drawing/drawing-context";
import { DecodeResponse } from "internal/decoder/server";
import { VideoFrameData } from "internal/decoder/decoder";

@Posted('VideoTrackItem')
export class VideoTrackItemRenderer extends TrackItemRenderer
    implements VideoTrackItemBase {
  
  resource: ResourceRenderer;

  decodePromise: Promise<DecodeResponse>;

  async draw(nvg: NVG, timecode: number) {
    let data = await this.decodePromise;
    let videoFrameData: VideoFrameData = renderer.converter.AsVideoFrameData(data.ptr);
    let context: DrawingContext = {
      nvg: nvg,
      timecode: timecode,
      screenWidth: 300,
      screenHeight: 150,
      videoFrame: videoFrameData
    };
    this.drawing.draw(context, timecode - this.baseTime);
    renderer.decoderClient.Free({id: data.id});
  }

  decode(timecode: number) {
    this.decodePromise = renderer.decoderClient.Decode({
        resourceID: this.resource.id,
        timecode: timecode
    });
  }

}