import { Postabled } from "worker-postable";

@Postabled
export class MixinBase {}
export type Constructor<T = {}> = new (...args: any[]) => T;