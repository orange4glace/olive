import { Postable } from "worker-postable";
import { Cloneable } from "base/olive/cloneable";
import { Registry } from "platform/registry/common/platform";
import { EffectFactoryRegistry } from "internal/rendering/effect/effect-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

let __next_id = 0;

export enum EffectType {
  TRANSFORM = 'TRANSFORM',
  OPACITY = 'OPACITY'
}

export interface EffectBase {

}

export interface SerializedEffect {
  type: string;
}

@Postable
export abstract class Effect implements EffectBase, Cloneable {

  readonly id: number;
  readonly type: string;

  constructor(type: string) {
    this.id = __next_id++;
    this.type = type;
  }

  clone(obj: Effect): Object {
    (obj as any).id = this.id;
    (obj as any).type = this.type;
    return obj;
  }

  abstract serialize(): SerializedEffect;
  static deserialize(instantiationService: IInstantiationService, obj: SerializedEffect): Effect | null {
    const factory = Registry.as<EffectFactoryRegistry>(EffectFactoryRegistry.ID).getFactory(obj.type);
    if (!factory) {
      console.warn('Deserialize Effect failed. Factory not found. ' + obj);
      return null;
    }
    return factory.deserialize(instantiationService, obj);
  }

}