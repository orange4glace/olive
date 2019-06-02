import { IAction, IActionRunner, ActionRunner } from "base/common/actions";
import { Disposable } from "base/common/lifecycle";
import { Emitter } from "base/common/event";
import { RunOnceScheduler } from "base/common/async";
import { asArray } from "base/common/arrays";

export interface IMenuBarOptions {

}

export interface MenuBarMenu {
  actions: IAction[];
  label: string;
}

enum MenubarState {
  HIDDEN,
  VISIBLE,
  FOCUSED,
  OPEN
}

export class MenuBar extends Disposable {

  static readonly OVERFLOW_INDEX: number = -1;

  private readonly onVisibilityChanged_: Emitter<boolean>;
  private readonly onFocusStateChanged_: Emitter<boolean>;

  private menuCache_: {
    label: string;
    actions?: IAction[];
  }[];

  private focusState_: MenubarState;
	private menuUpdater_: RunOnceScheduler;
  private actionRunner_: IActionRunner;

  constructor(options: IMenuBarOptions = {}) {
    super();

    this.menuCache_ = [];

    this.focusState_ = MenubarState.VISIBLE;

    this.onVisibilityChanged_ = this._register(new Emitter<boolean>());
    this.onFocusStateChanged_ = this._register(new Emitter<boolean>());

    // this.createOverflowMenu();

    this.menuUpdater_ = this._register(new RunOnceScheduler(() => this.update(), 200));
    this.actionRunner_ = this._register(new ActionRunner());
  }

  push(arg: MenuBarMenu | MenuBarMenu[]): void {
    const menus: MenuBarMenu[] = asArray(arg);

    menus.forEach(menuBarMenu => {
      const menuIndex = this.menuCache_.length;
      
    })
  }

}