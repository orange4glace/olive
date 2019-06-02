/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './toolbar.css';
import * as nls from 'nls';
import { Action } from 'base/common/actions';
import { ActionBar, ActionsOrientation } from 'base/browser/ui/actionbar/actionbar';
import { DropdownMenuActionItem } from 'base/browser/ui/dropdown/dropdown';
import { Disposable } from 'base/common/lifecycle';
import { withNullAsUndefined } from 'base/common/types';
export const CONTEXT = 'context.toolbar';
/**
 * A widget that combines an action bar for primary actions and a dropdown for secondary actions.
 */
export class ToolBar extends Disposable {
    constructor(container, contextMenuProvider, options = { orientation: ActionsOrientation.HORIZONTAL }) {
        super();
        this.options = options;
        this.lookupKeybindings = typeof this.options.getKeyBinding === 'function';
        this.toggleMenuAction = this._register(new ToggleMenuAction(() => this.toggleMenuActionItem && this.toggleMenuActionItem.show(), options.toggleMenuTitle));
        let element = document.createElement('div');
        element.className = 'monaco-toolbar';
        container.appendChild(element);
        this.actionBar = this._register(new ActionBar(element, {
            orientation: options.orientation,
            ariaLabel: options.ariaLabel,
            actionRunner: options.actionRunner,
            actionItemProvider: (action) => {
                // Return special action item for the toggle menu action
                if (action.id === ToggleMenuAction.ID) {
                    // Dispose old
                    if (this.toggleMenuActionItem) {
                        this.toggleMenuActionItem.dispose();
                    }
                    // Create new
                    this.toggleMenuActionItem = new DropdownMenuActionItem(action, action.menuActions, contextMenuProvider, this.options.actionItemProvider, this.actionRunner, this.options.getKeyBinding, 'toolbar-toggle-more', this.options.anchorAlignmentProvider);
                    this.toggleMenuActionItem.setActionContext(this.actionBar.context);
                    return this.toggleMenuActionItem;
                }
                return options.actionItemProvider ? options.actionItemProvider(action) : undefined;
            }
        }));
    }
    set actionRunner(actionRunner) {
        this.actionBar.actionRunner = actionRunner;
    }
    get actionRunner() {
        return this.actionBar.actionRunner;
    }
    set context(context) {
        this.actionBar.context = context;
        if (this.toggleMenuActionItem) {
            this.toggleMenuActionItem.setActionContext(context);
        }
    }
    getContainer() {
        return this.actionBar.getContainer();
    }
    getItemsWidth() {
        let itemsWidth = 0;
        for (let i = 0; i < this.actionBar.length(); i++) {
            itemsWidth += this.actionBar.getWidth(i);
        }
        return itemsWidth;
    }
    setAriaLabel(label) {
        this.actionBar.setAriaLabel(label);
    }
    setActions(primaryActions, secondaryActions) {
        return () => {
            let primaryActionsToSet = primaryActions ? primaryActions.slice(0) : [];
            // Inject additional action to open secondary actions if present
            this.hasSecondaryActions = !!(secondaryActions && secondaryActions.length > 0);
            if (this.hasSecondaryActions && secondaryActions) {
                this.toggleMenuAction.menuActions = secondaryActions.slice(0);
                primaryActionsToSet.push(this.toggleMenuAction);
            }
            this.actionBar.clear();
            primaryActionsToSet.forEach(action => {
                this.actionBar.push(action, { icon: true, label: false, keybinding: this.getKeybindingLabel(action) });
            });
        };
    }
    getKeybindingLabel(action) {
        const key = this.lookupKeybindings && this.options.getKeyBinding ? this.options.getKeyBinding(action) : undefined;
        return withNullAsUndefined(key && key.getLabel());
    }
    addPrimaryAction(primaryAction) {
        return () => {
            // Add after the "..." action if we have secondary actions
            if (this.hasSecondaryActions) {
                let itemCount = this.actionBar.length();
                this.actionBar.push(primaryAction, { icon: true, label: false, index: itemCount, keybinding: this.getKeybindingLabel(primaryAction) });
            }
            // Otherwise just add to the end
            else {
                this.actionBar.push(primaryAction, { icon: true, label: false, keybinding: this.getKeybindingLabel(primaryAction) });
            }
        };
    }
    dispose() {
        if (this.toggleMenuActionItem) {
            this.toggleMenuActionItem.dispose();
            this.toggleMenuActionItem = undefined;
        }
        super.dispose();
    }
}
class ToggleMenuAction extends Action {
    constructor(toggleDropdownMenu, title) {
        title = title || nls.localize('moreActions', "More Actions...");
        super(ToggleMenuAction.ID, title, undefined, true);
        this.toggleDropdownMenu = toggleDropdownMenu;
    }
    run() {
        this.toggleDropdownMenu();
        return Promise.resolve(true);
    }
    get menuActions() {
        return this._menuActions;
    }
    set menuActions(actions) {
        this._menuActions = actions;
    }
}
ToggleMenuAction.ID = 'toolbar.toggle.more';
//# sourceMappingURL=toolbar.js.map