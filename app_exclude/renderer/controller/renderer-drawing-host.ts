import { Drawing } from "internal/drawing";
import VideoDrawing from "internal/drawing/video-drawing";

export abstract class RendererDrawingHost<T extends Drawing> {

  drawing: T;



}

export class RendererVideoDrawingHost extends RendererDrawingHost<VideoDrawing> {

}