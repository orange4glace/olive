import { WithDrawingBase } from "internal/rendering/drawing/common/drawing";
import { MixinBase } from "base/olive/mixin";
import { RenderingContext } from "internal/rendering/drawing/video-renderer/context";
import { Exception } from "tstl";

export class DrawingVideoRenderer extends WithDrawingBase(MixinBase) {

  draw(context: RenderingContext): void {
    throw new Exception('NotImplementedException');
  }
  afterDraw(context: RenderingContext): void {}

}