import { Widget } from "window/view/widget";
import { assert } from "base/common/assert";
import { ServicesAccessor, IInstantiationService, createDecorator } from "platform/instantiation/common/instantiation";

interface WidgetClass<T extends Widget> {
  new(): T;
}

interface IWidgetRegistryItem<T extends Widget> {
  readonly name: string;

  create(initializationData: any, windowServices: IInstantiationService): T;
  deserialize(obj: any, windowServices: IInstantiationService): T;
}

class WidgetRegistryItem<T extends Widget> implements IWidgetRegistryItem<T> {
  constructor(
      readonly name: string, 
      private readonly provider: IWidgetProvider<T>) {
  }

  create(initializationData: any, windowServices: IInstantiationService): T {
    let widget: T;
    windowServices.invokeFunction(windowAccessor => {
      widget = this.provider.create(initializationData, windowAccessor);
    })
    return widget;
  }

  deserialize(obj: any, windowServices: IInstantiationService): T {
    let widget: T;
    windowServices.invokeFunction(windowAccessor => {
      widget = this.provider.deserialize(obj, windowAccessor);
    })
    return widget;
  }
}

export interface IWidgetProvider<T extends Widget> {

  create(initializationData: any, windowAccessor: ServicesAccessor): T;
  serialize(widget: Widget): any;
  deserialize(obj: any, windowAccessor: ServicesAccessor): T;

}

export const IWidgetService = createDecorator<IWidgetService>('olive.WidgetService');

export interface IWidgetService {

  registerWidget<T extends Widget>(name: string, provider: IWidgetProvider<T>): void;
  createWidget<T extends Widget>(name: string, initializationData: any): T;

  serialize(widget: Widget): Object;
  deserialize(obj: any): Widget;

}

export class WidgetService implements IWidgetService {

  private widgets_: Map<string, WidgetRegistryItem<any>>;

  constructor(
    @IInstantiationService private readonly windowServices: IInstantiationService,
  ) {
    this.widgets_ = new Map();
  }

  registerWidget<T extends Widget>(
      name: string,
      provider: IWidgetProvider<T>): void {
    console.warn('Register widegt', name, provider);
    const item = new WidgetRegistryItem<T>(name, provider);
    this.widgets_.set(name, item);
  }

  createWidget<T extends Widget>(
      name: string, 
      initializationData: any
  ): T {
    const widgetRegistryItem = this.widgets_.get(name);
    assert(widgetRegistryItem, 'No such widget ' + name);
    return widgetRegistryItem.create(initializationData, this.windowServices);
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
    return registry.deserialize(obj.value, this.windowServices);
  }

}