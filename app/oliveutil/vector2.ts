import { Postable, postable, Posted } from "worker-postable";

@Postable
export class Vector2 {
  @postable x: number;
  @postable y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}

@Posted('Vector2')
export class Vector2Renderer {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}