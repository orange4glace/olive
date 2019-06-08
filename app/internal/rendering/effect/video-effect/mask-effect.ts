import { VideoEffect } from "./video-effect";
import { PolyPathProperty } from "../../property/polypath-property";
import { ScalarProperty } from "../../property/scalar-property";
import { Postable, postable } from "worker-postable";

@Postable
export class MaskEffect extends VideoEffect {
  @postable path: PolyPathProperty;
  @postable feather: ScalarProperty;

  constructor() {
    super('MASK')
  }

  serialize(): any {
    throw new Error('Not implemeneted');
  }
}