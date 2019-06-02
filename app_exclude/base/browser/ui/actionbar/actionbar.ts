import { IActionRunner, IAction, Action } from "base/common/actions";
import { Disposable } from "base/common/lifecycle";
import { KeyCode } from "base/common/keyCodes";
import { IActionItemOptions } from "window/ui/action-bar/action-item";

export interface IActionItem {
  actionRunner: IActionRunner;
  setActionContext(context: any): void;
  render(): React.ReactNode;
  isEnabled(): boolean;
  focus(fromRight?: boolean): void;
  blur(): void;
  dispose(): void;
}

export interface IBaseActionItemOptions {
  draggable?: boolean;
  isMenu?: boolean;
}

export class BaseActionItem extends Disposable implements IActionItem {

  private context_: any;
  private action_: IAction;

  private actionRunner_: IActionRunner;

  constructor(context: any, action: IAction, protected options?: IBaseActionItemOptions) {
    super();

    this.context_ = context || this;
    this.action_ = action;
  }

	set actionRunner(actionRunner: IActionRunner) {
		this.actionRunner_ = actionRunner;
	}

	get actionRunner(): IActionRunner {
		return this.actionRunner_;
	}

  getAction(): IAction {
    return this.action_;
  }

  isEnabled(): boolean {
    return this.action_.enabled;
  }

  setActionContext(newContext: any): void {
    this.context_ = newContext;
  }

  render(): React.ReactNode {
    return null;
  }

  focus(): void {

  }

  blur(): void {

  }

}

export enum ActionsOrientation {
  HORIZONTAL,
  HORIZONTAL_REVERSE,
  VERTICAL,
  VERTICAL_REVERSE,
}

export interface ActionTrigger {
  keys: KeyCode[];
  keyDown: boolean;
}

export interface IActionItemProvider {
  (action: IAction): IActionItem | undefined;
}

export interface IActionBarOptions {
  orientation?: ActionsOrientation;
  context?: any;
  actionItemProvider?: IActionItemProvider;
  actionRunner?: IActionRunner;
  ariaLabel?: string;
  animated?: boolean;
  triggerKeys?: ActionTrigger;
}

const defaultOptions: IActionBarOptions = {
  orientation: ActionsOrientation.HORIZONTAL,
  context: null,
  triggerKeys: {
    keys: [KeyCode.Enter, KeyCode.Space],
    keyDown: false
  }
}

export interface IActionOptions extends IActionItemOptions {
  index?: number;
}

export interface IActionBar {
  /*@observable*/ items: ReadonlyArray<IActionItem>;
}

export class ActionBar extends Disposable implements IActionBar, IActionRunner {

  options: IActionBarOptions;

  private actionRunner_: IActionRunner;
  private context_: any;

  items: IActionItem[];
  protected focusedItem?: number;

  constructor(options: IActionBarOptions = defaultOptions) {
    super();

    this.options = options;
    this.context_ = options.context;

    this.items = [];
    this.focusedItem = undefined;
  }

}