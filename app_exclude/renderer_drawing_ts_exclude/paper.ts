import DrawingRenderer from "./drawing";
import { PaperBase } from "internal/drawing";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";
import NVG from "../../../../nanovg-webgl";

@Posted('Paper')
export class PaperRenderer extends DrawingRenderer implements PaperBase {

  constructor() {
    super();
  }

  draw(context: DrawingContext, timeoffset: number) {
    const vg = context.nvg;
    const position = this.position.getInterpolatedPropertyValue(timeoffset);
    const scale = this.scale.getInterpolatedPropertyValue(timeoffset);
    vg.save();
    vg.translate(position.x, position.y);
    vg.scale(scale.x, scale.y);
    this.children.forEach(child => child.draw(context, timeoffset));
    vg.restore();
  }

  afterDraw(vg: NVG) {
    this.children.forEach(child => child.afterDraw(vg));
  }
  
}