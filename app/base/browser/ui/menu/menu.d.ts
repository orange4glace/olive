import './menu.css';
import { IActionRunner, IAction, Action } from 'base/common/actions';
import { ActionBar, IActionItemProvider } from 'base/browser/ui/actionbar/actionbar';
import { ResolvedKeybinding } from 'base/common/keyCodes';
import { Color } from 'base/common/color';
import { Event } from 'base/common/event';
import { AnchorAlignment } from 'base/browser/ui/contextview/contextview';
export declare const MENU_MNEMONIC_REGEX: RegExp;
export declare const MENU_ESCAPED_MNEMONIC_REGEX: RegExp;
export interface IMenuOptions {
    context?: any;
    actionItemProvider?: IActionItemProvider;
    actionRunner?: IActionRunner;
    getKeyBinding?: (action: IAction) => ResolvedKeybinding | undefined;
    ariaLabel?: string;
    enableMnemonics?: boolean;
    anchorAlignment?: AnchorAlignment;
}
export interface IMenuStyles {
    shadowColor?: Color;
    borderColor?: Color;
    foregroundColor?: Color;
    backgroundColor?: Color;
    selectionForegroundColor?: Color;
    selectionBackgroundColor?: Color;
    selectionBorderColor?: Color;
    separatorColor?: Color;
}
export declare class SubmenuAction extends Action {
    entries: Array<SubmenuAction | IAction>;
    constructor(label: string, entries: Array<SubmenuAction | IAction>, cssClass?: string);
}
export declare class Menu extends ActionBar {
    private mnemonics;
    private menuDisposables;
    private scrollableElement;
    private menuElement;
    private scrollTopHold;
    private readonly _onScroll;
    constructor(container: HTMLElement, actions: IAction[], options?: IMenuOptions);
    style(style: IMenuStyles): void;
    getContainer(): HTMLElement;
    readonly onScroll: Event<void>;
    readonly scrollOffset: number;
    trigger(index: number): void;
    private focusItemByElement;
    private setFocusedItem;
    private doGetActionItem;
}
export declare function cleanMnemonic(label: string): string;
