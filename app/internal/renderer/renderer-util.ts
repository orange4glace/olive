import { Posted } from "worker-postable";

@Posted('PostableVector2')
export class PostableVector2Renderer {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static interpolate(lhs: PostableVector2Renderer, rhs: PostableVector2Renderer, time: number) {
    return new PostableVector2Renderer(
        lhs.x + (rhs.x - lhs.x) * time,
        lhs.y + (rhs.y - lhs.y) * time
    );
  }
}