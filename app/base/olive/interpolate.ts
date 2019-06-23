export function interpolate(lhs: number, rhs: number, t: number) {
  return (rhs - lhs) * t + lhs
}