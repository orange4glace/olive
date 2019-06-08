import { IConstructorSignature0, IInstantiationService } from "platform/instantiation/common/instantiation";

export interface IFactoryRegistry<FactoryType> {

  registerFactory(type: string, ctor: IConstructorSignature0<FactoryType>): void;
  getFactory(type: string): FactoryType;

}

export interface IFactory<T, SerializedType> {
  serialize(effect: T): SerializedType | null;
  deserialize(instantiationService: IInstantiationService, serial: SerializedType): T | null;
}

export class FactoryRegistry<FactoryType> implements IFactoryRegistry<FactoryType> {

  private factoryInstances: {
    [type: string]: FactoryType
  } = Object.create(null);

  registerFactory(type: string, ctor: IConstructorSignature0<FactoryType>): void {
    const instance = new ctor();
    this.factoryInstances[type] = instance;
  }

  getFactory(type: string): FactoryType {
    const factory = this.factoryInstances[type];
    if (!factory) console.warn('No Effect Factory found. ' + type);
    return factory;
  }

}