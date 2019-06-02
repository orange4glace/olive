import { IHistoryCommand } from "internal/history/command";
import { observable, computed } from "mobx";
import { assert } from "base/olive/assert";
import { createDecorator } from "platform/instantiation/common/instantiation";

export const IHistoryService = createDecorator<IHistoryService>('olive.HistoryService');

export interface IHistoryService {

  /*@observable*/ readonly canUndo: boolean;
  /*@observable*/ readonly canRedo: boolean;

  open(): IHistoryStackElement;
  close(): void;
  push(command: IHistoryCommand): void;
  execute(command: IHistoryCommand): void;

  undo(): void;
  redo(): void;

}

interface IHistoryStackElement {

  /*@observable*/ readonly isEmpty: boolean;
  /*@observable*/ readonly closed: boolean;
  /*@observable*/ readonly commands: ReadonlyArray<IHistoryCommand>;

  push(command: IHistoryCommand): void;
  close(): void;

}

class HistoryStackElement implements IHistoryStackElement{

  @computed get isEmpty(): boolean {
    return this.commands.length == 0; }
  @observable closed: boolean = false;
  @observable commands: IHistoryCommand[] = [];

  push(command: IHistoryCommand) {
    assert(!this.closed, 'StackElement is closed.')
    this.commands.push(command);
  }

  close() {
    this.closed = true;
  }

}

export class HistoryService implements IHistoryService {

  @computed get canUndo(): boolean {
    if (this.undoStack_.length == 0) return false;
    if (this.undoStack_.length == 1 && this.undoStack_[0].isEmpty) return false;
    return true;
  }
  @computed get canRedo(): boolean {
    return this.redoStack_.length != 0;
  }

  @observable private undoStack_: IHistoryStackElement[];
  @observable private redoStack_: IHistoryStackElement[];

  constructor() {
    this.undoStack_ = [];
    this.redoStack_ = [];
  }

  open() {
    if (this.undoStack_.length == 0) {
      const stack = new HistoryStackElement();
      this.undoStack_.push(stack);
      return stack;
    }
    const top = this.undoStack_[this.undoStack_.length - 1];
    if (top.isEmpty) return top;
    if (!top.closed) return top;
    const stack = new HistoryStackElement();
    this.undoStack_.push(stack);
    return stack;
  }

  close() {
    if (this.undoStack_.length == 0) {
      this.undoStack_.push(new HistoryStackElement());
      return;
    }
    const top = this.undoStack_[this.undoStack_.length - 1];
    if (top.isEmpty) return;
    this.undoStack_.push(new HistoryStackElement());
  }

  push(command: IHistoryCommand) {
    let top = this.undoStack_[this.undoStack_.length - 1];
    if (!top || top.closed) top = this.open();
    top.push(command);
  }

  execute(command: IHistoryCommand) {
    command.execute();
    this.push(command);
    this.redoStack_ = [];
  }

  undo() {
    if (!this.canUndo) return;
    let top = this.undoStack_[this.undoStack_.length - 1];
    if (top.isEmpty) this.undoStack_.pop();
    top = this.undoStack_[this.undoStack_.length - 1];
    top.commands.forEach(command => command.undo());
    this.undoStack_.pop();
    this.redoStack_.push(top);
  }

  redo() {
    if (!this.canRedo) return;
    let top = this.redoStack_[this.redoStack_.length - 1];
    for (let i = top.commands.length - 1; i >= 0; i --) {
      const command = top.commands[i];
      command.redo();
    }
    this.redoStack_.pop();
    this.undoStack_.push(top);
  }

}