import { Postable } from "worker-postable";
import { Effect } from "internal/rendering/effect/effect";
import { Cloneable } from "base/olive/cloneable";
import { FactoryRegistry, IFactory } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";

let __next_id = 0;

export interface DrawingBase {
  
}

export interface SerializedDrawing {
  type: string;
}

@Postable
export abstract class Drawing implements Cloneable {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

  clone(obj: Drawing): Object {
    (obj as any).id = __next_id++;
    (obj as any).type = this.type;
    return obj;
  }

  abstract serialize(): SerializedDrawing;

}

export interface DrawingFactory extends IFactory<Drawing, SerializedDrawing> {}
export class DrawingFactoryRegistry extends FactoryRegistry<DrawingFactory> {
  static readonly ID = 'olive.drawing.DrawingFactoryRegistry';
}
Registry.add(DrawingFactoryRegistry.ID, new DrawingFactoryRegistry());