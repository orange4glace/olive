import { Postable, postable } from "worker-postable";
import { Cloneable, clone } from "base/olive/cloneable";
import { FactoryRegistry, IFactory } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { MixinBase } from "base/olive/mixin";
import { IKeyframeValue, KeyframeValue, ISerializedKeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { WithKeyframeBase, InterpolationType } from "internal/rendering/property/common/keyframe";


//#region Keyframe

export interface SerializedKeyframe {
  timecode: number;
  valueType: string;
  value: any;
  interpolationType: InterpolationType;
}

@Postable
export class Keyframe<T extends IKeyframeValue> extends WithKeyframeBase(MixinBase) implements Cloneable {

  protected value_: T;

  constructor(timecode: number, value: T, interpolationType = InterpolationType.LINEAR) {
    super();
    this.timecode_ = timecode;
    this.value_ = value;
    this.interpolationType_ = InterpolationType.LINEAR;
  }

  setValue(value: T) {
    this.value_ = value;
  }

  clone(object: Keyframe<T>): Object {
    object.timecode_ = this.timecode;
    object.value_ = (typeof this.value == 'object' ? clone(this.value as any) : this.value);
    object.interpolationType_ = this.interpolationType;
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

//#endregion

export interface IKeyframeValueFactory extends IFactory<KeyframeValue, ISerializedKeyframeValue> {}
export class KeyframeValueFactoryRegistry extends FactoryRegistry<IKeyframeValueFactory> {
  static readonly ID = 'olive.property.keyframe.KeyframeValueFactoryRegistry'
}
Registry.add(KeyframeValueFactoryRegistry.ID, new KeyframeValueFactoryRegistry());