import { PropertyBase, Property } from "./property";
import { Postable } from "worker-postable";

export interface ScalarPropertyBase extends PropertyBase<number> {
}

@Postable
export class ScalarProperty extends Property<number> implements ScalarPropertyBase {

  constructor(defaultValue: number) {
    super('SCALAR', defaultValue);
  }

  createValue(val: number): number {
    return val;
  }

  cloneValue(val: number): number {
    return val;
  }

  interpolate(lhs: number, rhs: number, t: number): number {
    return lhs + (rhs - lhs) * t;
  }

}
