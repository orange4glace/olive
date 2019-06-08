import { Postable, postable } from "worker-postable";
import { Cloneable, clone } from "base/olive/cloneable";

export enum InterpolationType {
  NONE,
  LINEAR,
}

export interface ISerializedKeyframeValue {
  type: string;
}

export interface IKeyframeValue {
  readonly type: string;
  serialize(): object;
}

export abstract class KeyframeValue implements IKeyframeValue {
  @postable readonly type: string;
  constructor(type: string) { this.type = type; }
  abstract serialize(): object;
}

export interface KeyframeBase<T extends IKeyframeValue> {
  timecode: number;
  value: T;
  interpolationType: InterpolationType;
}

export interface SerializedKeyframe {
  timecode: number;
  valueType: string;
  value: any;
  interpolationType: InterpolationType;
}

@Postable
export class Keyframe<T extends IKeyframeValue> implements KeyframeBase<T>, Cloneable {
  @postable timecode: number;
  @postable value: T;
  @postable interpolationType: InterpolationType;

  constructor(timecode: number, value: T, interpolationType = InterpolationType.LINEAR) {
    this.timecode = timecode;
    this.value = value;
    this.interpolationType = InterpolationType.LINEAR;
  }

  clone(object: Keyframe<T>): Object {
    object.timecode = this.timecode;
    object.value = (typeof this.value == 'object' ? clone(this.value as any) : this.value);
    object.interpolationType = this.interpolationType;
    return object;
  }

  serialize(): SerializedKeyframe {
    return {
      timecode: this.timecode,
      valueType: this.value.type,
      value: this.value.serialize(),
      interpolationType: this.interpolationType
    };
  }

  static deserialize<T extends KeyframeValue>(instantiationService: IInstantiationService, obj: SerializedKeyframe): Keyframe<T> | null {
    let value: T;
    const factory = Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).getFactory(obj.valueType)
    if (!factory) {
      console.warn('Keyframe deserialize failed. Factory not found with ' + obj);
      return null;
    }
    value = factory.deserialize(instantiationService, obj.value) as T;
    if (!value) {
      console.warn('Keyframe deserialize failed. ' + obj);
      return null;
    }
    new Keyframe<T>(obj.timecode, value, obj.interpolationType);
  }
}


import { FactoryRegistry, IFactory, IFactoryRegistry } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

export interface IKeyframeValueFactory extends IFactory<KeyframeValue, ISerializedKeyframeValue> {}
export class KeyframeValueFactoryRegistry extends FactoryRegistry<IKeyframeValueFactory> {
  static readonly ID = 'olive.property.keyframe.KeyframeValueFactoryRegistry'
}
Registry.add(KeyframeValueFactoryRegistry.ID, new KeyframeValueFactoryRegistry());