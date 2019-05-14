import { Widget } from "window/view/widget";
import { assert } from "base/common/assert";
import { IServiceProvider, ServiceProvider } from "window/service/provider";

interface WidgetClass<T extends Widget> {
  new(): T;
}

interface IWidgetRegistryItem<T extends Widget> {
  readonly name: string;

  deserialize(obj: any, serviceProvider: IServiceProvider): T;
}

class WidgetRegistryItem<T extends Widget> implements IWidgetRegistryItem<T> {
  name: string;
  provider: IWidgetProvider<T>;
  
  constructor(name: string, provider: IWidgetProvider<T>) {
    this.name = name;
    this.provider = provider;
  }

  deserialize(obj: any, serviceProvider: IServiceProvider): T {
    return this.provider.deserialize(obj, serviceProvider);
  }
}

export interface IWidgetProvider<T extends Widget> {

  create(initializationData: any, serviceProvider: IServiceProvider): void;
  serialize(widget: Widget): any;
  deserialize(obj: any, serviceProvider: IServiceProvider): T;

}

interface IWidgetRegistry {

  registerWidget<T extends Widget>(name: string, provider: IWidgetProvider<T>): void;

  serialize(widget: Widget): Object;
  deserialize(obj: any): Widget;

}

class WidgetRegistryImpl implements IWidgetRegistry {

  private widgets_: Map<string, WidgetRegistryItem<any>>;

  constructor(
    private readonly serviceProvider_: IServiceProvider
  ) {
    this.widgets_ = new Map();
  }

  registerWidget<T extends Widget>(name: string, provider: IWidgetProvider<T>): void {
    const item = new WidgetRegistryItem<T>(name, provider);
    this.widgets_.set(name, item);
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
    return registry.deserialize(obj.value, this.serviceProvider_);
  }

}

export const WidgetRegistry: IWidgetRegistry = new WidgetRegistryImpl(ServiceProvider);