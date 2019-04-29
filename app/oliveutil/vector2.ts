import { Postable, postable, Posted } from "worker-postable";
import { Cloneable } from "base/common/cloneable";

export interface Vector2Base {
  x: number;
  y: number;
}

@Postable
export class Vector2 implements Vector2Base, Cloneable {
  @postable x: number;
  @postable y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(obj: Vector2): Object {
    obj.x = this.x;
    obj.y = this.y;
    return obj;
  }

}

@Posted('Vector2')
export class Vector2Renderer implements Vector2Base {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}