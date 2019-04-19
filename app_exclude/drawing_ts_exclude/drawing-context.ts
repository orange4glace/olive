import NVG from "../../../../nanovg-webgl";
import { VideoFrameData } from "internal/decoder/decoder";

export interface DrawingContext {
  nvg: NVG;
  screenWidth: number;
  screenHeight: number;
  timecode: number;
  videoFrame?: VideoFrameData;
}