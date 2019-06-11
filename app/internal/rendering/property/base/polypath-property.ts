import { Property, SerializedProperty, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { Keyframe, IKeyframeValueFactory, KeyframeValueFactoryRegistry } from "./keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { WithPolypathKeyframeValueBase, WithPolypathPropertyBase, PolypathPoint, PolypathKeyframeValueBase } from "internal/rendering/property/common/polypath-property";
import { ISerializedKeyframeValue, KeyframeValue } from "internal/rendering/property/base/keyframe-value";

export interface SerializedPolypathKeyframeValue extends ISerializedKeyframeValue {
  points: PolypathPoint[];
}

@Postable
export class PolypathKeyframeValue extends WithPolypathKeyframeValueBase(KeyframeValue) {

  constructor(points?: PolypathPoint[]) {
    super(PolypathKeyframeValue.TYPE);
    this.points_ = points.slice(0) || [];
  }

  serialize(): SerializedPolypathKeyframeValue {
    let points: PolypathPoint[] = [];
    this.points.forEach(p => {
      points.push({...p});
    })
    return {
      type: PolypathKeyframeValueBase.TYPE,
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
    let points: PolypathPoint[] = [];
    obj.points.forEach(p => {
      points.push({x: p.x, y: p.y});
    })
    return new PolypathKeyframeValue(points);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(PolypathKeyframeValue.TYPE, PolypathKeyframeValueFactory);


@Postable
class _PolypathProperty extends Property<PolypathKeyframeValue> {
  createValue(path: [{x: number, y: number}]): PolypathKeyframeValue {
    let res: PolypathPoint[] = [];
    for (let i = 0; i < path.length; i ++) {
      const vec = {...path[i]};
      res.push(vec);
    }
    return new PolypathKeyframeValue(res);
  }

  cloneValue(path: PolypathKeyframeValue): PolypathKeyframeValue {
    let res: PolypathPoint[] = [];
    for (let i = 0; i < path.points.length; i ++) {
      const vec = {x: path.points[i].x, y: path.points[i].y};
      res.push(vec);
    }
    return new PolypathKeyframeValue(res);
  }
}

@Postable
export class PolyPathProperty extends WithPolypathPropertyBase(_PolypathProperty) {

  static readonly TYPE = 'olive.property.Polypath';

  constructor(defaultValue: PolypathKeyframeValue) {
    super(PolypathKeyframeValue.TYPE, defaultValue);
    this.animatable_ = true;
  }

  insertPoint(index: number, ratio: number) {
    console.log('insert point', index, ratio, this.animated, this.keyframes);
    (this.animated ? this.keyframes : [this.defaultKeyframe]).forEach((keyframe: Keyframe<PolypathKeyframeValue>) => {
      console.log(keyframe);
      const p1 = keyframe.value.points[(index - 1 + keyframe.value.points.length) %  keyframe.value.points.length];
      const p2 = keyframe.value.points[index % keyframe.value.points.length];
      const x = (p1.x + (p2.x - p1.x) * ratio);
      const y = (p1.y + (p2.y - p1.y) * ratio);
      const p = {x: x, y: y};
      keyframe.value.points.splice(index, 0, p);
      this.addKeyframeAt(keyframe.timecode, keyframe.value);
    })
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(PolyPathProperty.TYPE, PolyPathProperty);