import { Vector2, Vector2Base } from "oliveutil/vector2";
import { PropertyBase, Property, SerializedProperty, PropertyFactoryRegistry } from "./property";
import { action } from "mobx";
import { Postable, postable, Posted } from "worker-postable";
import { Keyframe, ISerializedKeyframeValue, KeyframeValue, IKeyframeValueFactory, KeyframeValueFactoryRegistry, SerializedKeyframe } from "./keyframe";
import { Vector2KeyframeValue, SerializedVector2KeyframeValue } from "internal/rendering/property/vector2-property";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface SerializedPolypathKeyframeValue extends ISerializedKeyframeValue {
  points: SerializedVector2KeyframeValue[];
}

@Posted('PolypathKeyframeValue')
export class PolypathKeyframeValue extends KeyframeValue {
  static readonly TYPE = 'olive.property.keyframe.value.Polypath'

  @postable points: Vector2KeyframeValue[];

  constructor(points?: Vector2KeyframeValue[]) {
    super(PolypathKeyframeValue.TYPE);
    this.points = points || [];
  }

  serialize(): SerializedPolypathKeyframeValue {
    let points: SerializedVector2KeyframeValue[] = [];
    this.points.forEach(p => {
      points.push(p.serialize());
    })
    return {
      type: Vector2KeyframeValue.TYPE,
      points: points
    };
  }

  asNumberArray(): [[number, number]] {
    let arr: any = [];
    this.points.forEach(p => arr.push([p.x, p.y]));
    return arr;
  }
}

class PolypathKeyframeValueFactory implements IKeyframeValueFactory {
  serialize(value: PolypathKeyframeValue): SerializedPolypathKeyframeValue {
    return value.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedPolypathKeyframeValue): PolypathKeyframeValue {
    if (obj.type !== PolypathKeyframeValue.TYPE) throw new Error('Keyframe value type invalid. ' + obj.type);
    let points: Vector2KeyframeValue[] = [];
    obj.points.forEach(p => {
      points.push(new Vector2KeyframeValue(p.x, p.y));
    })
    return new PolypathKeyframeValue(points);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(PolypathKeyframeValue.TYPE, PolypathKeyframeValueFactory);

export interface PolyPathPropertyBase extends PropertyBase<PolypathKeyframeValue> {
}

@Postable
export class PolyPathProperty extends Property<PolypathKeyframeValue> implements PolyPathPropertyBase {

  static readonly TYPE = 'olive.property.Polypath';

  constructor(defaultValue: PolypathKeyframeValue) {
    super(PolypathKeyframeValue.TYPE, defaultValue);
    this.animatable = true;
  }

  createValue(path: [[number, number]]): PolypathKeyframeValue {
    let res: Vector2KeyframeValue[] = [];
    for (let i = 0; i < path.length; i ++) {
      const vec = new Vector2KeyframeValue(path[i][0], path[i][1]);
      res.push(vec);
    }
    return new PolypathKeyframeValue(res);
  }

  cloneValue(path: PolypathKeyframeValue): PolypathKeyframeValue {
    let res: Vector2KeyframeValue[] = [];
    for (let i = 0; i < path.points.length; i ++) {
      const vec = new Vector2KeyframeValue(path.points[i].x, path.points[i].y);
      res.push(vec);
    }
    return new PolypathKeyframeValue(res);
  }

  @action
  insertPoint(index: number, ratio: number) {
    console.log('insert point', index, ratio, this.animated, this.keyframes);
    (this.animated ? this.keyframes : [this.defaultKeyframe]).forEach((keyframe: Keyframe<PolypathKeyframeValue>) => {
      console.log(keyframe);
      const p1 = keyframe.value.points[(index - 1 + keyframe.value.points.length) %  keyframe.value.points.length];
      const p2 = keyframe.value.points[index % keyframe.value.points.length];
      const x = (p1.x + (p2.x - p1.x) * ratio);
      const y = (p1.y + (p2.y - p1.y) * ratio);
      const p = new Vector2KeyframeValue(x, y);
      keyframe.value.points.splice(index, 0, p);
      this.addKeyframeAt(keyframe.timecode, keyframe.value);
    })
  }

  interpolate(lhs: PolypathKeyframeValue, rhs: PolypathKeyframeValue, t: number): PolypathKeyframeValue {
    console.assert(lhs.points.length == rhs.points.length);
    let res: Vector2KeyframeValue[] = [];
    for (let i = 0; i < lhs.points.length; i ++) {
      const vec1 = lhs.points[i];
      const vec2 = rhs.points[i];
      const vec = new Vector2KeyframeValue(vec1.x + (vec2.x - vec1.x) * t,
                              vec1.y + (vec2.y - vec1.y) * t);
      res.push(vec);
    }
    return new PolypathKeyframeValue(res);
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(PolyPathProperty.TYPE, PolyPathProperty);