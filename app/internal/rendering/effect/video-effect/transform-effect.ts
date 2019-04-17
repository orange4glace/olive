import { VideoEffect } from "./video-effect";
import { Vector2Property } from "../property/vector2-property";

export class TransformEffect extends VideoEffect {
  position: Vector2Property;
  scale: Vector2Property;

  constructor() {
    super('Transform')
  }
}