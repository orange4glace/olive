import { PropertyValueBase, ScalarPropertyValueBase, Vector2PropertyValueBase } from "internal/drawing";
import { PostableVector2Renderer } from "../renderer-util";
import { Posted } from "worker-postable";

@Posted('PropertyValue')
export abstract class PropertyValueRenderer<T> implements PropertyValueBase<T> {

  value: T;

  constructor(val: T) {
    this.value = val;
  }

  abstract interpolate(rhs: PropertyValueRenderer<T>, time: number): PropertyValueRenderer<T>;
  abstract clone(): PropertyValueRenderer<T>;

}

@Posted('ScalarPropertyValue')
export class ScalarPropertyValueRenderer extends PropertyValueRenderer<number>
    implements ScalarPropertyValueBase {

  constructor(val: number) {
    super(val);
  }

  interpolate(rhs: PropertyValueRenderer<number>, time: number): PropertyValueRenderer<number> {
    return new ScalarPropertyValueRenderer(this.value + (rhs.value - this.value) * time);
  }

  clone(): PropertyValueRenderer<number> {
    return new ScalarPropertyValueRenderer(this.value);
  }

}

@Posted('Vector2PropertyValue')
export class Vector2PropertyValueRenderer extends PropertyValueRenderer<PostableVector2Renderer>
    implements Vector2PropertyValueBase {

  constructor(val: PostableVector2Renderer) {
    super(val);
  }

  interpolate(rhs: PropertyValueRenderer<PostableVector2Renderer>, time: number): PropertyValueRenderer<PostableVector2Renderer> {
    return new Vector2PropertyValueRenderer(PostableVector2Renderer.interpolate(this.value, rhs.value, time));
  }

  clone(): PropertyValueRenderer<PostableVector2Renderer> {
    return new Vector2PropertyValueRenderer(new PostableVector2Renderer(this.value.x, this.value.y));
  }

}