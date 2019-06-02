import './actionbar.css';
import { Disposable } from 'base/common/lifecycle';
import { SelectBox, ISelectOptionItem, ISelectBoxOptions } from 'base/browser/ui/selectBox/selectBox';
import { IAction, IActionRunner, Action, IRunEvent } from 'base/common/actions';
import * as DOM from 'base/browser/dom';
import { KeyCode } from 'base/common/keyCodes';
import { IContextViewProvider } from 'base/browser/ui/contextview/contextview';
import { Event } from 'base/common/event';
export interface IActionItem {
    actionRunner: IActionRunner;
    setActionContext(context: any): void;
    render(element: HTMLElement): void;
    isEnabled(): boolean;
    focus(fromRight?: boolean): void;
    blur(): void;
    dispose(): void;
}
export interface IBaseActionItemOptions {
    draggable?: boolean;
    isMenu?: boolean;
}
export declare class BaseActionItem extends Disposable implements IActionItem {
    protected options?: IBaseActionItemOptions;
    element?: HTMLElement;
    _context: any;
    _action: IAction;
    private _actionRunner;
    constructor(context: any, action: IAction, options?: IBaseActionItemOptions);
    private handleActionChangeEvent;
    actionRunner: IActionRunner;
    getAction(): IAction;
    isEnabled(): boolean;
    setActionContext(newContext: any): void;
    render(container: HTMLElement): void;
    onClick(event: DOM.EventLike): void;
    focus(): void;
    blur(): void;
    protected updateEnabled(): void;
    protected updateLabel(): void;
    protected updateTooltip(): void;
    protected updateClass(): void;
    protected updateChecked(): void;
    dispose(): void;
}
export declare class Separator extends Action {
    static readonly ID = "vs.actions.separator";
    constructor(label?: string);
}
export interface IActionItemOptions extends IBaseActionItemOptions {
    icon?: boolean;
    label?: boolean;
    keybinding?: string | null;
}
export declare class ActionItem extends BaseActionItem {
    protected label: HTMLElement;
    protected options: IActionItemOptions;
    private cssClass?;
    constructor(context: any, action: IAction, options?: IActionItemOptions);
    render(container: HTMLElement): void;
    focus(): void;
    updateLabel(): void;
    updateTooltip(): void;
    updateClass(): void;
    updateEnabled(): void;
    updateChecked(): void;
}
export declare enum ActionsOrientation {
    HORIZONTAL = 0,
    HORIZONTAL_REVERSE = 1,
    VERTICAL = 2,
    VERTICAL_REVERSE = 3
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
export interface IActionOptions extends IActionItemOptions {
    index?: number;
}
export declare class ActionBar extends Disposable implements IActionRunner {
    options: IActionBarOptions;
    private _actionRunner;
    private _context;
    items: IActionItem[];
    protected focusedItem?: number;
    private focusTracker;
    domNode: HTMLElement;
    protected actionsList: HTMLElement;
    private _onDidBlur;
    readonly onDidBlur: Event<void>;
    private _onDidCancel;
    readonly onDidCancel: Event<void>;
    private _onDidRun;
    readonly onDidRun: Event<IRunEvent>;
    private _onDidBeforeRun;
    readonly onDidBeforeRun: Event<IRunEvent>;
    constructor(container: HTMLElement, options?: IActionBarOptions);
    setAriaLabel(label: string): void;
    private isTriggerKeyEvent;
    private updateFocusedItem;
    context: any;
    actionRunner: IActionRunner;
    getContainer(): HTMLElement;
    push(arg: IAction | IAction[], options?: IActionOptions): void;
    getWidth(index: number): number;
    getHeight(index: number): number;
    pull(index: number): void;
    clear(): void;
    length(): number;
    isEmpty(): boolean;
    focus(index?: number): void;
    focus(selectFirst?: boolean): void;
    protected focusNext(): void;
    protected focusPrevious(): void;
    protected updateFocus(fromRight?: boolean): void;
    private doTrigger;
    private cancel;
    run(action: IAction, context?: any): Promise<void>;
    dispose(): void;
}
export declare class SelectActionItem extends BaseActionItem {
    protected selectBox: SelectBox;
    constructor(ctx: any, action: IAction, options: ISelectOptionItem[], selected: number, contextViewProvider: IContextViewProvider, selectBoxOptions?: ISelectBoxOptions);
    setOptions(options: ISelectOptionItem[], selected?: number): void;
    select(index: number): void;
    private registerListeners;
    protected getActionContext(option: string, index: number): string;
    focus(): void;
    blur(): void;
    render(container: HTMLElement): void;
}
