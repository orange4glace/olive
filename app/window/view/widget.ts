import { IDisposable } from 'base/common/lifecycle';
import { Serializable } from 'base/olive/serialize';

export abstract class Widget implements Serializable, IDisposable {

  private static __next_id = 0;

  private name_: string;
  get name() { return this.name_; }
  readonly id: number;

  constructor(name: string) {
    this.name_ = name;
    this.id = Widget.__next_id++;
  }
  
  abstract render(): JSX.Element;

  abstract serialize(): Object;
  abstract dispose(): void;

}