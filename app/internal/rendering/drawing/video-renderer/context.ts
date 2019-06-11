import NVG from "../../../../../nanovg-webgl";
import { VideoFrameData } from "internal/decoder/decoder";

export interface RenderingContext {
  screenWidth: number;
  screenHeight: number;
  timeOffset: number;
  videoFrame?: VideoFrameData;
}