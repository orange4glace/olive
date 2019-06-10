import { Property, PropertyFactoryRegistry } from "./property";
import { Postable, postable, Posted } from "worker-postable";
import { IKeyframeValueFactory, KeyframeValueFactoryRegistry, SerializedKeyframe } from "internal/rendering/property/base/keyframe";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { WithScalarKeyframeValueBase, ScalarKeyframeValueBase, WithScalarPropertyBase } from "internal/rendering/property/common/scalar-property";
import { KeyframeValue, ISerializedKeyframeValue } from "internal/rendering/property/base/keyframe-value";
import { WithPropertyBase } from "internal/rendering/property/common/property";

export interface SerializedScalarKeyframeValue extends ISerializedKeyframeValue {
  value: number;
}

export class ScalarKeyframeValue extends WithScalarKeyframeValueBase(KeyframeValue) {

  constructor(value: number) {
    super(ScalarKeyframeValueBase.TYPE);
    this.value_ = value;
  }

  serialize(): SerializedScalarKeyframeValue {
    return {
      type: ScalarKeyframeValue.TYPE,
      value: this.value
    };
  }
}

class ScalarKeyframeValueFactory implements IKeyframeValueFactory {
  serialize(value: ScalarKeyframeValue): SerializedScalarKeyframeValue {
    return value.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedScalarKeyframeValue): ScalarKeyframeValue {
    if (obj.type !== ScalarKeyframeValue.TYPE) throw new Error('Keyframe value type invalid. ' + obj.type);
    return new ScalarKeyframeValue(obj.value);
  }
}
Registry.as<KeyframeValueFactoryRegistry>(KeyframeValueFactoryRegistry.ID).registerFactory(ScalarKeyframeValue.TYPE, ScalarKeyframeValueFactory);





class _ScalarProperty extends Property<ScalarKeyframeValue> {
  createValue(val: number): ScalarKeyframeValue {
    return new ScalarKeyframeValue(val);
  }

  cloneValue(val: ScalarKeyframeValue): ScalarKeyframeValue {
    return new ScalarKeyframeValue(val.value);
  }
}

@Postable
export class ScalarProperty extends WithScalarPropertyBase(_ScalarProperty) {
  static readonly TYPE = 'olive.property.Scalar';

  constructor(defaultValue: ScalarKeyframeValue) {
    super(ScalarKeyframeValue.TYPE, defaultValue);
    this.animatable_ = true;
  }

}

Registry.as<PropertyFactoryRegistry>(PropertyFactoryRegistry.ID).registerFactory(ScalarProperty.TYPE, ScalarProperty);