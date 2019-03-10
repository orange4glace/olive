import { Postable, postable } from "worker-postable";

@Postable
export default class PostableVector2 {
  @postable x: number;
  @postable y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static interpolate(lhs: PostableVector2, rhs: PostableVector2, time: number) {
    return new PostableVector2(
        lhs.x + (rhs.x - lhs.x) * time,
        lhs.y + (rhs.y - lhs.y) * time
    );
  }

}