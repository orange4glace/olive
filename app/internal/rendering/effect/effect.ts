import { Postable } from "worker-postable";

let __next_id = 0;

export enum EffectType {
  TRANSFORM = 'TRANSFORM',
  OPACITY = 'OPACITY'
}

export interface EffectBase {

}

@Postable
export abstract class Effect implements EffectBase {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }
}