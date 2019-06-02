import './dropdown.css';
import { ActionRunner, IAction, IActionRunner } from 'base/common/actions';
import { BaseActionItem, IActionItemProvider } from 'base/browser/ui/actionbar/actionbar';
import { IDisposable } from 'base/common/lifecycle';
import { IContextViewProvider, IAnchor, AnchorAlignment } from 'base/browser/ui/contextview/contextview';
import { IMenuOptions } from 'base/browser/ui/menu/menu';
import { ResolvedKeybinding } from 'base/common/keyCodes';
import { IContextMenuDelegate } from 'base/browser/contextmenu';
export interface ILabelRenderer {
    (container: HTMLElement): IDisposable | null;
}
export interface IBaseDropdownOptions {
    label?: string;
    labelRenderer?: ILabelRenderer;
}
export declare class BaseDropdown extends ActionRunner {
    private _element;
    private boxContainer?;
    private _label?;
    private contents?;
    private visible;
    constructor(container: HTMLElement, options: IBaseDropdownOptions);
    readonly element: HTMLElement;
    readonly label: HTMLElement;
    tooltip: string;
    show(): void;
    hide(): void;
    protected onEvent(e: Event, activeElement: HTMLElement): void;
    dispose(): void;
}
export interface IDropdownOptions extends IBaseDropdownOptions {
    contextViewProvider: IContextViewProvider;
}
export declare class Dropdown extends BaseDropdown {
    private contextViewProvider;
    constructor(container: HTMLElement, options: IDropdownOptions);
    show(): void;
    protected getAnchor(): HTMLElement | IAnchor;
    protected onHide(): void;
    hide(): void;
    protected renderContents(container: HTMLElement): IDisposable | null;
}
export interface IContextMenuProvider {
    showContextMenu(delegate: IContextMenuDelegate): void;
}
export interface IActionProvider {
    getActions(): IAction[];
}
export interface IDropdownMenuOptions extends IBaseDropdownOptions {
    contextMenuProvider: IContextMenuProvider;
    actions?: IAction[];
    actionProvider?: IActionProvider;
    menuClassName?: string;
}
export declare class DropdownMenu extends BaseDropdown {
    private _contextMenuProvider;
    private _menuOptions;
    private _actions;
    private actionProvider?;
    private menuClassName;
    constructor(container: HTMLElement, options: IDropdownMenuOptions);
    menuOptions: IMenuOptions;
    private actions;
    show(): void;
    hide(): void;
    private onHide;
}
export declare class DropdownMenuActionItem extends BaseActionItem {
    private menuActionsOrProvider;
    private dropdownMenu;
    private contextMenuProvider;
    private actionItemProvider?;
    private keybindings?;
    private clazz;
    private anchorAlignmentProvider;
    constructor(action: IAction, menuActions: IAction[], contextMenuProvider: IContextMenuProvider, actionItemProvider: IActionItemProvider | undefined, actionRunner: IActionRunner, keybindings: ((action: IAction) => ResolvedKeybinding | undefined) | undefined, clazz: string | undefined, anchorAlignmentProvider?: () => AnchorAlignment);
    constructor(action: IAction, actionProvider: IActionProvider, contextMenuProvider: IContextMenuProvider, actionItemProvider: IActionItemProvider | undefined, actionRunner: IActionRunner, keybindings: ((action: IAction) => ResolvedKeybinding) | undefined, clazz: string | undefined, anchorAlignmentProvider?: () => AnchorAlignment);
    render(container: HTMLElement): void;
    setActionContext(newContext: any): void;
    show(): void;
}
