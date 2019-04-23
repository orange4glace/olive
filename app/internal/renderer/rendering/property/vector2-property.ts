import { Posted } from "worker-postable";
import { PostableVector2Renderer } from "internal/renderer/renderer-util";
import { Vector2PropertyBase } from "internal/rendering/property/vector2-property";
import { PropertyRenderer } from "internal/renderer/rendering/property/property";

@Posted('Vector2Property')
export class Vector2PropertyRenderer extends PropertyRenderer<PostableVector2Renderer> implements Vector2PropertyBase {

  interpolate(lhs: PostableVector2Renderer, rhs: PostableVector2Renderer, t: number): PostableVector2Renderer {
    return new PostableVector2Renderer(
      lhs.x + (rhs.x - lhs.x) * t,
      lhs.y + (rhs.y - lhs.y) * t);
  }
}