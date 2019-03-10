import NVG from "../../../../nanovg-webgl";

export interface DrawingContext {
  nvg: NVG,
  screenWidth: number,
  screenHeight: number,
  timecode: number
}