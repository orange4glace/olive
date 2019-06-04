import { IDisposable, Disposable } from "base/common/lifecycle";
import { Component } from "window/workbench/common/component";
import { IStorageService } from "platform/storage/common/storage";

export function isSerializedWidget(widget: any): widget is ISerializedWidget {
  if (widget.serializedWidgetType) return true;
  return false;
}

export interface ISerializedWidget {

  /**
   * Unique type of widget
   */
  serializedWidgetType: string;

}

export interface IWidget extends Component {

  readonly type: string;

  matches(obj: unknown): boolean;

}

export abstract class Widget extends Component implements IWidget {

  readonly type: string;

  constructor(
    type: string,
    id: string,
    @IStorageService protected readonly storageService: IStorageService) {
    super(id, storageService);
    this.type = type;
  }

  abstract matches(obj: unknown): boolean;

}