import { Effect, SerializedEffect } from "internal/rendering/effect/effect";
import { Registry } from "platform/registry/common/platform";
import { IFactory, FactoryRegistry } from "internal/common/factory-registry";

export interface IEffectFactory<T extends Effect> extends IFactory<T, SerializedEffect> {}
export class EffectFactoryRegistry extends FactoryRegistry<IEffectFactory<any>> {
  static readonly ID = 'olive.effect.FactoryRegistry'
}
Registry.add(EffectFactoryRegistry.ID, new EffectFactoryRegistry());