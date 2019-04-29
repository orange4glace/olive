export interface Cloneable {
  clone(obj: Object): Object;
}

export function clone<T extends Cloneable>(original: T): T {
  let clone = Object.create(original.constructor.prototype) as T;
  original.clone(clone);
  return clone;
}