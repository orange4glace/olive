import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ISerializableView } from "base/browser/ui/grid/grid";
import { IDisposable, Disposable } from "base/common/lifecycle";
import { IWidget } from "window/workbench/common/editor/widget";
import { Relay, Event } from "base/common/event";

export interface IWidgetView extends IDisposable, ISerializableView {

  readonly widget: IWidget;

}

export class WidgetView extends Disposable implements IWidgetView {

  //#region IView

  element: HTMLElement;
	private _onDidChange = this._register(new Relay<{ width: number; height: number; } | undefined>());
	readonly onDidChange: Event<{ width: number; height: number; } | undefined> = this._onDidChange.event;
  layout() {}

  readonly minimumWidth = 10;
  readonly minimumHeight = 10;
  readonly maximumWidth = Infinity;
  readonly maximumHeight = Infinity;

  //#end region

  private widget_: IWidget;
  public get widget() { return this.widget_; }

  constructor(widget: IWidget) {
    super();

    this.element = document.createElement('div');
    ReactDOM.render(this.widget_.render() as React.ReactElement, this.element);
    this.widget_ = widget;
  }

  toJSON(): any {
    return null;
  }

}