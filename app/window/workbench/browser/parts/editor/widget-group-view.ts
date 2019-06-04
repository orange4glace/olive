// import { ISerializableView } from "base/browser/ui/grid/grid";
// import { IWidgetGroup, WidgetGroup, ISerializedWidgetGroup, isSerializedWidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
// import { IDisposable, Disposable } from "base/common/lifecycle";
// import { Event, Emitter } from "base/common/event";
// import { IWidgetView, WidgetView } from "window/workbench/browser/parts/editor/widget-view";
// import { IInstantiationService } from "platform/instantiation/common/instantiation";

// export interface IWidgetGroupView extends IDisposable, ISerializableView {

// }

// export class WidgetGroupView extends Disposable implements IWidgetGroupView {

//   //#region IView

//   element: HTMLElement;
//   onDidChange: any;
//   layout() {}

//   readonly minimumWidth = 10;
//   readonly minimumHeight = 10;
//   readonly maximumWidth = Infinity;
//   readonly maximumHeight = Infinity;

//   //#end region

//   group: WidgetGroup;

//   constructor(
//     readonly widgetGroup: WidgetGroup,
//     @IInstantiationService private readonly instantiationService: IInstantiationService) {
//     super();

//     this.group = widgetGroup;
//   }

//   toJSON(): ISerializedWidgetGroup {
//     return this.widgetGroup.serialize();
//   }

// }