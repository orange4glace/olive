export interface A {
  n: number
}

export interface B {
  (n: number): number;
  (o: object): object;
}

export type ABC = A & B;