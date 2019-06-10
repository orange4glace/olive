import { RenderingContext } from "internal/renderer/video-renderer/rendering/context/rendering-context";
import NVG from "../../../../../../nanovg-webgl";
import { DrawingRenderer } from "internal/renderer/base/rendering/drawing/drawing";

export abstract class DrawingVideoRenderer extends DrawingRenderer {

  abstract draw(context: RenderingContext): void;
  abstract afterDraw(vg: NVG): void;

}