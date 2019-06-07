import { IWidget, ISerializedWidget } from "window/workbench/common/editor/widget";
import { IInstantiationService, IConstructorSignature0, ServicesAccessor } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";

export interface IWidgetFactoryRegistry {

  start(accessor: ServicesAccessor): void;

  registerWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory<any>>): void;

  getWidgetFactory(widgetType: string): IWidgetFactory<any>;

}

export interface IWidgetFactory<T extends IWidget> {

  serialize(widget: T): ISerializedWidget | undefined;

  deserialize(instantiationService: IInstantiationService, serializedWidget: ISerializedWidget): T | undefined;

}

export class WidgetFactoryRegistry implements IWidgetFactoryRegistry {

  static readonly ID = 'olive.workbench.registry.WidgetFactoryRegistry'

  private instantiationService: IInstantiationService;
  private factoryConstructors: {
    [widgetType: string]: IConstructorSignature0<IWidgetFactory<any>>
  } = Object.create(null);
  private factoryInstances: {
    [widgetType: string]: IWidgetFactory<any>
  } = Object.create(null);

  start(accessor: ServicesAccessor): void {
    this.instantiationService = accessor.get(IInstantiationService);
    for (const ctor in this.factoryConstructors)
      this.createWidgetFactory(ctor, this.factoryConstructors[ctor]);
  }

  private createWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory<any>>): void {
    const instance = this.instantiationService.createInstance(ctor);
    this.factoryInstances[widgetType] = instance;
  }

  registerWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory<any>>): void {
    if (!this.instantiationService)
      this.factoryConstructors[widgetType] = ctor;
    else
      this.createWidgetFactory(widgetType, ctor);
  }

  getWidgetFactory(widgetType: string): IWidgetFactory<any> {
    return this.factoryInstances[widgetType];
  }

}

Registry.add(WidgetFactoryRegistry.ID, new WidgetFactoryRegistry())