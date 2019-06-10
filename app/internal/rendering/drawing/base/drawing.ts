import { Postable, postable } from "worker-postable";
import { Cloneable } from "base/olive/cloneable";
import { FactoryRegistry, IFactory } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { MixinBase, Constructor } from "base/olive/mixin";
import { WithDrawingBase } from "internal/rendering/drawing/common/drawing";

let __next_id = 0;

export interface SerializedDrawing {
  type: string;
}

@Postable
export class Drawing extends WithDrawingBase(MixinBase) implements Cloneable {

  readonly id: number;

  constructor(type: string) {
    super();
    this.id = __next_id++;
    this.type_ = type;
  }

  clone(obj: Drawing): Object {
    (obj as any).id = __next_id++;
    obj.type_ = this.type;
    return obj;
  }

  serialize(): SerializedDrawing { throw new Error('NotImplementedException') }

}

export interface DrawingFactory extends IFactory<Drawing, SerializedDrawing> {}
export class DrawingFactoryRegistry extends FactoryRegistry<DrawingFactory> {
  static readonly ID = 'olive.drawing.DrawingFactoryRegistry';
}
Registry.add(DrawingFactoryRegistry.ID, new DrawingFactoryRegistry());