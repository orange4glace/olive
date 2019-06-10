// import { WithVideoMediaTrackItemBase } from "internal/timeline/common/track-item/video-media-track-item";
// import { VideoTrackItemVideoRenderer } from "internal/timeline/video-renderer/track-item/video-track-item";
// import { VideoResourceVideoRenderer } from "internal/resource/video-renderer/video-resource";
// import { DecodeResult, VideoFrameData } from "internal/decoder/decoder";
// import NVG from "../../../../../nanovg-webgl";
// import { RenderingContext } from "internal/rendering/drawing/video-renderer/context";
// import { Converter } from "internal/timeline/video-renderer/converter";
// import { Decoder } from "internal/timeline/video-renderer/decoder";
// import { Posted } from "worker-postable";

// @Posted
// export class VideoMediaTrackItemVideoRenderer extends WithVideoMediaTrackItemBase(VideoTrackItemVideoRenderer) {

//   protected resource_: VideoResourceVideoRenderer;
//   public get resource() { return this.resource_; }

//   acquiredDecoderID: number = -1;
//   decodePromise: Promise<DecodeResult>;

//   async draw(nvg: NVG, timecode: number): Promise<null> {
//     let data = await this.decodePromise;
//     let videoFrameData: VideoFrameData = Converter.AsVideoFrameData(data.data);
//     let context: RenderingContext = {
//       nvg: nvg,
//       timeOffset: timecode,
//       screenWidth: 300,
//       screenHeight: 150,
//       videoFrame: videoFrameData
//     };
//     this.drawing.draw(context);
//     Decoder.FreeFrame(data.native);
//     return null;
//   }

//   afterDraw(nvg: NVG) {
//     this.drawing.afterDraw(nvg);
//   }

//   decode(timecode: number) {
//     const decoder = Decoder;
//     if (this.acquiredDecoderID == -1)
//       this.acquiredDecoderID = decoder.Acquire(this.resource.id, timecode);
//     this.decodePromise = decoder.Decode(this.resource.id, timecode, this.acquiredDecoderID);
//   }

// }