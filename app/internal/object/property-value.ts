import PropertyValueProxy from 'internal/object/property-value-proxy'

import Vector2 from 'util/vector2'

export default abstract class PropertyValue<T> {

  value: T;
  proxy: PropertyValueProxy;

  constructor(proxy: PropertyValueProxy, val: T) {
    this.value = val;
    this.proxy = proxy;
  }

  abstract interpolate(rhs: PropertyValue<T>, time: number): PropertyValue<T>;
  abstract clone(): PropertyValue<T>;

}

class ScalarPropertyValue extends PropertyValue<number> {

  constructor(proxy: PropertyValueProxy, val: number) {
    super(proxy, val);
    return new Proxy(this, {
      set: (target, key, value, receiver) => {
        Reflect.set(target, key, value, receiver);
        proxy.emit();
        return true;
      }
    })
  }

  interpolate(rhs: PropertyValue<number>, time: number): PropertyValue<number> {
    return new ScalarPropertyValue(this.proxy, this.value + (rhs.value - this.value) * time);
  }

  clone(): PropertyValue<number> {
    return new ScalarPropertyValue(this.proxy, this.value);
  }

}

class Vector2PropertyValue extends PropertyValue<Vector2> {

  constructor(proxy: PropertyValueProxy, val: Vector2) {
    super(proxy, val);
    this.value = new Proxy(this.value, {
      set: (target, key, value, receiver) => {
        Reflect.set(target, key, value, receiver);
        proxy.emit();
        return true;
      }
    })
  }

  interpolate(rhs: PropertyValue<Vector2>, time: number): PropertyValue<Vector2> {
    return new Vector2PropertyValue(this.proxy,
        Vector2.interpolate(this.value, rhs.value, time));
  }

  clone(): PropertyValue<Vector2> {
    return new Vector2PropertyValue(this.proxy, new Vector2(this.value.x, this.value.y));
  }

}

var z: PropertyValue<Vector2>;
z.value.x

export {
  ScalarPropertyValue,
  Vector2PropertyValue
}