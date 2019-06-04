import { Widget } from "window/view/widget";
import { IWidgetProvider } from "window/view/widget-service";

interface IWidgetRegistry {

  readonly widgets: ReadonlyMap<string, IWidgetProvider<any>>;
  
  registerWidget<T extends Widget>(
      name: string,
      provider: IWidgetProvider<T>): void;

}

class WidgetRegistryImpl implements IWidgetRegistry {

  widgets: Map<string, IWidgetProvider<any>> = new Map();

  registerWidget<T extends Widget>(
      name: string,
      provider: IWidgetProvider<T>): void {
    this.widgets.set(name, provider);
  }

}

export const WidgetRegistry: IWidgetRegistry = new WidgetRegistryImpl();