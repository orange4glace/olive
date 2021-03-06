import * as React from 'react'
import { IStorageService } from "platform/storage/common/storage";
import { Event, Emitter } from "base/common/event";
import { Disposable } from 'base/common/lifecycle';

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

export interface IWidget {

  readonly onDragEnter: Event<React.DragEvent>;
  readonly onDragLeave: Event<React.DragEvent>;

  readonly id: string;
  readonly type: string;
  readonly name: string;

  focus(): void;

  matches(obj: unknown): boolean;
	render(): React.ReactNode;
  
  serialize(): ISerializedWidget;

}

export abstract class Widget extends Disposable implements IWidget {

  private readonly onDragEnter_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDragEnter: Event<React.DragEvent> = this.onDragEnter_.event;
  private readonly onDragLeave_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDragLeave: Event<React.DragEvent> = this.onDragLeave_.event;

  private readonly onDidFocus_: Emitter<void> = new Emitter();
  public readonly onDidFocus: Event<void> = this.onDidFocus_.event;

  readonly id: string;
  readonly type: string;
  abstract name: string;

  constructor(
    type: string,
    id: string,
    @IStorageService protected readonly storageService: IStorageService) {
    super();
    this.id = id;
    this.type = type;
  }

  public focus() {
    this.onDidFocus_.fire();
  }

  abstract matches(obj: unknown): boolean;
	abstract render(): React.ReactNode;

  abstract serialize(): ISerializedWidget;

}