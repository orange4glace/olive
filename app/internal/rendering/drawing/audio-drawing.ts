import { Drawing, DrawingBase } from "./drawing";
import { Postable } from "worker-postable";

export interface AudioDrawingBase extends DrawingBase {
}

@Postable
export abstract class AudioDrawing extends Drawing implements AudioDrawingBase {

  constructor(type: string) {
    super(type);
  }

  clone(obj: AudioDrawing): Object {
    super.clone(obj);
    return obj;
  }

}