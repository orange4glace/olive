import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export type DrawingBaseConstructor = new (...args: any[]) => DrawingBase;
export function WithDrawingBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class DrawingBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.drawing.Drawing';
    @postable protected type_: string;
    public get type() { return this.type_; }
  };
  return DrawingBase;
}
@Postabled
export class DrawingBase extends WithDrawingBase(MixinBase) {}