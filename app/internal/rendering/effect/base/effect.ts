import { Postable, postable } from "worker-postable";
import { Cloneable } from "base/olive/cloneable";
import { Registry } from "platform/registry/common/platform";
import { EffectFactoryRegistry } from "internal/rendering/effect/base/effect-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Constructor, MixinBase } from "base/olive/mixin";
import { WithEffectBase } from "internal/rendering/effect/common/effect";

let __next_id = 0;

export interface SerializedEffect {
  type: string;
}

@Postable
export class Effect extends WithEffectBase(MixinBase) implements Cloneable {

  readonly id: number;

  constructor(type: string) {
    super();
    this.id = __next_id++;
    this.type_ = type;
  }

  clone(obj: Effect): Object {
    (obj as any).id = this.id;
    (obj as any).type = this.type;
    return obj;
  }

  serialize(): SerializedEffect { throw new Error('Not implemeneted exception') }
  static deserialize(instantiationService: IInstantiationService, obj: SerializedEffect): Effect | null {
    const factory = Registry.as<EffectFactoryRegistry>(EffectFactoryRegistry.ID).getFactory(obj.type);
    if (!factory) {
      console.warn('Deserialize Effect failed. Factory not found. ' + obj);
      return null;
    }
    return factory.deserialize(instantiationService, obj);
  }

}