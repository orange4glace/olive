import { Postable } from "worker-postable";
import { Effect } from "internal/rendering/effect/effect";
import { Cloneable } from "base/olive/cloneable";

let __next_id = 0;

export enum DrawingType {
  VIDEO_MEDIA = 'VIDEO_MEDIA',
  RECTANGLE = 'RECTANGLE'
}

export interface DrawingBase {
  
}

@Postable
export abstract class Drawing implements Cloneable {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

  clone(obj: Drawing): Object {
    (obj as any).id = __next_id++;
    (obj as any).type = this.type;
    return obj;
  }

}