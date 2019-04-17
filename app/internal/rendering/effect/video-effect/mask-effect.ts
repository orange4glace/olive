import { VideoEffect } from "./video-effect";
import { PolyPathProperty } from "../property/polypath-property";
import { ScalarProperty } from "../property/scalar-property";

export class MaskEffect extends VideoEffect {
  path: PolyPathProperty;
  feather: ScalarProperty;

  constructor() {
    super('Mask')
  }
}