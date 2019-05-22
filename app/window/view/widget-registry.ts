import { Widget } from "window/view/widget";
import { assert } from "base/common/assert";
import { IServiceProvider, ServiceProvider } from "window/service/provider";
import { ServicesAccessor, IInstantiationService } from "platform/instantiation/common/instantiation";
import app from "internal/app";

interface WidgetClass<T extends Widget> {
  new(): T;
}

interface IWidgetRegistryItem<T extends Widget> {
  readonly name: string;

  create(initializationData: any, internalServices: IInstantiationService, serviceProvider: IServiceProvider): T;
  deserialize(obj: any, internalServices: IInstantiationService, serviceProvider: IServiceProvider): T;
}

class WidgetRegistryItem<T extends Widget> implements IWidgetRegistryItem<T> {
  constructor(
      readonly name: string, 
      private readonly provider: IWidgetProvider<T>) {
  }

  create(initializationData: any, internalServices: IInstantiationService, serviceProvider: IServiceProvider): T {
    let widget: T;
    internalServices.invokeFunction(accessor => {
      widget = this.provider.create(initializationData, accessor, serviceProvider);
    })
    return widget;
  }

  deserialize(obj: any, internalServices: IInstantiationService, serviceProvider: IServiceProvider): T {
    let widget: T;
    internalServices.invokeFunction(accessor => {
      widget = this.provider.deserialize(obj, accessor, serviceProvider);
    })
    return widget;
  }
}

export interface IWidgetProvider<T extends Widget> {

  create(initializationData: any, internalAccessor: ServicesAccessor, serviceProvider: IServiceProvider): T;
  serialize(widget: Widget): any;
  deserialize(obj: any, internalAccessor: ServicesAccessor, serviceProvider: IServiceProvider): T;

}

interface IWidgetRegistry {

  registerWidget<T extends Widget>(name: string, provider: IWidgetProvider<T>): void;
  createWidget<T extends Widget>(name: string, initializationData: any): T;

  serialize(widget: Widget): Object;
  deserialize(obj: any): Widget;

}

class WidgetRegistryImpl implements IWidgetRegistry {

  private widgets_: Map<string, WidgetRegistryItem<any>>;

  constructor(
    @IInstantiationService private readonly internalServices: IInstantiationService,
    private readonly serviceProvider_: IServiceProvider
  ) {
    this.widgets_ = new Map();
  }

  registerWidget<T extends Widget>(
      name: string,
      provider: IWidgetProvider<T>): void {
    const item = new WidgetRegistryItem<T>(name, provider);
    this.widgets_.set(name, item);
  }

  createWidget<T extends Widget>(
      name: string, 
      initializationData: any
  ): T {
    const widgetRegistryItem = this.widgets_.get(name);
    return widgetRegistryItem.create(initializationData, this.internalServices, this.serviceProvider_);
  }

  getWidget<T extends Widget>(name: string): WidgetRegistryItem<T> {
    assert(this.widgets_.has(name), '[WidgetRegistry] No widget ' + name);
    return this.widgets_.get(name);
  }

  serialize(widget: Widget): {
    name: string;
    value: any;
  } {
    return {
      name: widget.name,
      value: widget.serialize()
    }
  }

  deserialize<T extends Widget>(obj: any): T {
    const widgetName = obj.name;
    const registry = this.getWidget<T>(widgetName);
    return registry.deserialize(obj.value, this.internalServices, this.serviceProvider_);
  }

}

export const WidgetRegistry: IWidgetRegistry = new WidgetRegistryImpl(app.services, ServiceProvider);