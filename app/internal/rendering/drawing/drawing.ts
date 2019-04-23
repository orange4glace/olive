import { Postable } from "worker-postable";
import { Effect } from "internal/rendering/effect/effect";

let __next_id = 0;

export enum DrawingType {
  VIDEO_MEDIA = 'VIDEO_MEDIA',
  RECTANGLE = 'RECTANGLE'
}

export interface DrawingBase {
  
}

@Postable
export abstract class Drawing {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

}