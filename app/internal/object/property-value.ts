import Vector2 from 'util/vector2'

export default abstract class PropertyValue<T> {

  value: T;

  constructor(val: T) {
    this.value = val;
  }

  abstract interpolate(rhs: PropertyValue<T>, time: number): PropertyValue<T>;
  abstract clone(): PropertyValue<T>;

}

class ScalarPropertyValue extends PropertyValue<number> {

  interpolate(rhs: PropertyValue<number>, time: number): PropertyValue<number> {
    return new ScalarPropertyValue(this.value + (rhs.value - this.value) * time);
  }

  clone(): PropertyValue<number> {
    return new ScalarPropertyValue(this.value);
  }

}

class Vector2PropertyValue extends PropertyValue<Vector2> {

  interpolate(rhs: PropertyValue<Vector2>, time: number): PropertyValue<Vector2> {
    return new Vector2PropertyValue(
        Vector2.interpolate(this.value, rhs.value, time));
  }

  clone(): PropertyValue<Vector2> {
    return new Vector2PropertyValue(new Vector2(this.value.x, this.value.y));
  }

}

export {
  ScalarPropertyValue,
  Vector2PropertyValue
}