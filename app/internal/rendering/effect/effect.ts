import { Postable } from "worker-postable";
import { Cloneable } from "base/olive/cloneable";

let __next_id = 0;

export enum EffectType {
  TRANSFORM = 'TRANSFORM',
  OPACITY = 'OPACITY'
}

export interface EffectBase {

}

@Postable
export abstract class Effect implements EffectBase, Cloneable {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

  clone(obj: Effect): Object {
    (obj as any).id = this.id;
    (obj as any).type = this.type;
    return obj;
  }
}