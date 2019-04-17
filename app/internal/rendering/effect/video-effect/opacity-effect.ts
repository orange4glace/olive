import { VideoEffect } from "./video-effect";
import { ScalarProperty } from "../property/scalar-property";

export class OpacityEffect extends VideoEffect {
  opacity: ScalarProperty;

  constructor() {
    super('Opacity')
  }
}