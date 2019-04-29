import { Postable, postable, Posted } from "worker-postable";
import { Cloneable } from "base/common/cloneable";

export interface Vector4Base {
  x: number;
  y: number;
  z: number;
  w: number;
}

@Postable
export class Vector4 implements Vector4Base, Cloneable {
  @postable x: number;
  @postable y: number;
  @postable z: number;
  @postable w: number;
  
  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  clone(obj: Vector4): Object {
    obj.x = this.x;
    obj.y = this.y;
    obj.z = this.z;
    obj.w = this.w;
    return obj;
  }

}

@Posted('Vector4')
export class Vector4Renderer implements Vector4Base {
  x: number;
  y: number;
  z: number;
  w: number;
  
  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

}