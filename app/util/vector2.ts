export default class Vector2 {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static interpolate(lhs: Vector2, rhs: Vector2, time: number) {
    return new Vector2(
        lhs.x + (rhs.x - lhs.x) * time,
        lhs.y + (rhs.y - lhs.y) * time
    );
  }

}