import { Event } from "base/common/event";
import { IWidget } from "window/workbench/common/editor/widget";
import { IWidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { createDecorator, ServiceIdentifier } from "platform/instantiation/common/instantiation";

export const IWidgetService = createDecorator<IWidgetService>('olive.service.WidgetService')

export interface IWidgetService {

	_serviceBrand: ServiceIdentifier<any>;

  readonly onDidActiveEditorChange: Event<void>;

  readonly activeWidget: IWidget;

  readonly widgets: ReadonlyArray<IWidget>;

  openWidget(widget: IWidget, group?: IWidgetGroup): void;

}