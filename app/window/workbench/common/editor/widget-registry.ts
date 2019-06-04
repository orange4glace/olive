import { IWidget, ISerializedWidget } from "window/workbench/common/editor/widget";
import { IInstantiationService, IConstructorSignature0, ServicesAccessor } from "platform/instantiation/common/instantiation";
import { Registry } from "platform/registry/common/platform";

export interface IWidgetFactoryRegistry {

  registerWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory>): void;

  getWidgetFactory(widgetType: string): IWidgetFactory;

}

export interface IWidgetFactory {

  serialize(widget: IWidget): ISerializedWidget | undefined;

  deserialize(instantiationService: IInstantiationService, serializedWidget: ISerializedWidget): IWidget | undefined;

}

class WidgetFactoryRegistry implements IWidgetFactoryRegistry {

  private instantiationService: IInstantiationService;
  private factoryConstructors: {
    [widgetType: string]: IConstructorSignature0<IWidgetFactory>
  } = Object.create(null);
  private factoryInstances: {
    [widgetType: string]: IWidgetFactory
  } = Object.create(null);

  start(accessor: ServicesAccessor): void {
    this.instantiationService = accessor.get(IInstantiationService);
  }

  private createWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory>): void {
    const instance = this.instantiationService.createInstance(ctor);
    this.factoryInstances[widgetType] = instance;
  }

  registerWidgetFactory(widgetType: string, ctor: IConstructorSignature0<IWidgetFactory>): void {
    if (!this.instantiationService)
      this.factoryConstructors[widgetType] = ctor;
    else
      this.createWidgetFactory(widgetType, ctor);
  }

  getWidgetFactory(widgetType: string): IWidgetFactory {
    return this.factoryInstances[widgetType];
  }

}

export const Extensions = {
  WidgetFactoryRegistry: 'olive.workbench.WidgetFactoryRegistry'
}

Registry.add(Extensions.WidgetFactoryRegistry, new WidgetFactoryRegistry())