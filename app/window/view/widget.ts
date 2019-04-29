import { IDisposable } from 'base/common/lifecycle';
import { Serializable } from 'base/common/serialize';

export abstract class Widget implements Serializable, IDisposable {

  private static __next_id = 0;

  readonly id: number;

  constructor() {
    this.id = Widget.__next_id++;
  }

  abstract get name(): string;
  
  abstract render(): JSX.Element;

  abstract serialize(): Object;
  abstract dispose(): void;

}