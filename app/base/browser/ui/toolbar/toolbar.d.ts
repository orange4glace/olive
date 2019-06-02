import './toolbar.css';
import { IActionRunner, IAction } from 'base/common/actions';
import { ActionsOrientation, IActionItemProvider } from 'base/browser/ui/actionbar/actionbar';
import { IContextMenuProvider } from 'base/browser/ui/dropdown/dropdown';
import { ResolvedKeybinding } from 'base/common/keyCodes';
import { Disposable } from 'base/common/lifecycle';
import { AnchorAlignment } from 'base/browser/ui/contextview/contextview';
export declare const CONTEXT = "context.toolbar";
export interface IToolBarOptions {
    orientation?: ActionsOrientation;
    actionItemProvider?: IActionItemProvider;
    ariaLabel?: string;
    getKeyBinding?: (action: IAction) => ResolvedKeybinding | undefined;
    actionRunner?: IActionRunner;
    toggleMenuTitle?: string;
    anchorAlignmentProvider?: () => AnchorAlignment;
}
/**
 * A widget that combines an action bar for primary actions and a dropdown for secondary actions.
 */
export declare class ToolBar extends Disposable {
    private options;
    private actionBar;
    private toggleMenuAction;
    private toggleMenuActionItem?;
    private hasSecondaryActions;
    private lookupKeybindings;
    constructor(container: HTMLElement, contextMenuProvider: IContextMenuProvider, options?: IToolBarOptions);
    actionRunner: IActionRunner;
    context: any;
    getContainer(): HTMLElement;
    getItemsWidth(): number;
    setAriaLabel(label: string): void;
    setActions(primaryActions: IAction[], secondaryActions?: IAction[]): () => void;
    private getKeybindingLabel;
    addPrimaryAction(primaryAction: IAction): () => void;
    dispose(): void;
}
