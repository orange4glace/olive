import { IAction, IActionRunner } from 'base/common/actions';
import { IActionItem } from 'base/browser/ui/actionbar/actionbar';
import { ResolvedKeybinding } from 'base/common/keyCodes';
import { SubmenuAction } from 'base/browser/ui/menu/menu';
import { AnchorAlignment } from 'base/browser/ui/contextview/contextview';
export interface IContextMenuEvent {
    shiftKey?: boolean;
    ctrlKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
}
export declare class ContextSubMenu extends SubmenuAction {
    entries: Array<ContextSubMenu | IAction>;
    constructor(label: string, entries: Array<ContextSubMenu | IAction>);
}
export interface IContextMenuDelegate {
    getAnchor(): HTMLElement | {
        x: number;
        y: number;
        width?: number;
        height?: number;
    };
    getActions(): Array<IAction | ContextSubMenu>;
    getActionItem?(action: IAction): IActionItem | undefined;
    getActionsContext?(event?: IContextMenuEvent): any;
    getKeyBinding?(action: IAction): ResolvedKeybinding | undefined;
    getMenuClassName?(): string;
    onHide?(didCancel: boolean): void;
    actionRunner?: IActionRunner;
    autoSelectFirstItem?: boolean;
    anchorAlignment?: AnchorAlignment;
}
