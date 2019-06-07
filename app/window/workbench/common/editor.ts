import { IDisposable, Disposable } from "base/common/lifecycle";
import { Event, Emitter } from "base/common/event";
import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
import { IWidget } from "window/workbench/common/editor/widget";

export interface IWidgetIdentifier {
  groupId: WidgetGroupIdentifier;
  widget: IWidget;
}

export interface IWidgetOpenCloseEvent extends IWidgetIdentifier {
  replaced: boolean;
  index: number;
}