import { Postable, postable, Posted } from "worker-postable";

@Postable
export class Vector4 {
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

}

@Posted('Vector4')
export class Vector4Renderer {
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