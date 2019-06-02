/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './dropdown.css';
import { Gesture, EventType as GestureEventType } from 'base/browser/touch';
import { ActionRunner } from 'base/common/actions';
import { BaseActionItem } from 'base/browser/ui/actionbar/actionbar';
import { KeyCode } from 'base/common/keyCodes';
import { EventHelper, EventType, removeClass, addClass, append, $, addDisposableListener, addClasses } from 'base/browser/dom';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
export class BaseDropdown extends ActionRunner {
    constructor(container, options) {
        super();
        this._element = append(container, $('.monaco-dropdown'));
        this._label = append(this._element, $('.dropdown-label'));
        let labelRenderer = options.labelRenderer;
        if (!labelRenderer) {
            labelRenderer = (container) => {
                container.textContent = options.label || '';
                return null;
            };
        }
        for (const event of [EventType.CLICK, EventType.MOUSE_DOWN, GestureEventType.Tap]) {
            this._register(addDisposableListener(this._label, event, e => EventHelper.stop(e, true))); // prevent default click behaviour to trigger
        }
        for (const event of [EventType.MOUSE_DOWN, GestureEventType.Tap]) {
            this._register(addDisposableListener(this._label, event, e => {
                if (e instanceof MouseEvent && e.detail > 1) {
                    return; // prevent multiple clicks to open multiple context menus (https://github.com/Microsoft/vscode/issues/41363)
                }
                if (this.visible) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }));
        }
        this._register(addDisposableListener(this._label, EventType.KEY_UP, e => {
            const event = new StandardKeyboardEvent(e);
            if (event.equals(KeyCode.Enter) || event.equals(KeyCode.Space)) {
                EventHelper.stop(e, true); // https://github.com/Microsoft/vscode/issues/57997
                if (this.visible) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }
        }));
        const cleanupFn = labelRenderer(this._label);
        if (cleanupFn) {
            this._register(cleanupFn);
        }
        Gesture.addTarget(this._label);
    }
    get element() {
        return this._element;
    }
    get label() {
        return this._label;
    }
    set tooltip(tooltip) {
        if (this._label) {
            this._label.title = tooltip;
        }
    }
    show() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
    onEvent(e, activeElement) {
        this.hide();
    }
    dispose() {
        super.dispose();
        this.hide();
        if (this.boxContainer) {
            this.boxContainer.remove();
            this.boxContainer = undefined;
        }
        if (this.contents) {
            this.contents.remove();
            this.contents = undefined;
        }
        if (this._label) {
            this._label.remove();
            this._label = undefined;
        }
    }
}
export class Dropdown extends BaseDropdown {
    constructor(container, options) {
        super(container, options);
        this.contextViewProvider = options.contextViewProvider;
    }
    show() {
        super.show();
        addClass(this.element, 'active');
        this.contextViewProvider.showContextView({
            getAnchor: () => this.getAnchor(),
            render: (container) => {
                return this.renderContents(container);
            },
            onDOMEvent: (e, activeElement) => {
                this.onEvent(e, activeElement);
            },
            onHide: () => this.onHide()
        });
    }
    getAnchor() {
        return this.element;
    }
    onHide() {
        removeClass(this.element, 'active');
    }
    hide() {
        super.hide();
        if (this.contextViewProvider) {
            this.contextViewProvider.hideContextView();
        }
    }
    renderContents(container) {
        return null;
    }
}
export class DropdownMenu extends BaseDropdown {
    constructor(container, options) {
        super(container, options);
        this._contextMenuProvider = options.contextMenuProvider;
        this.actions = options.actions || [];
        this.actionProvider = options.actionProvider;
        this.menuClassName = options.menuClassName || '';
    }
    set menuOptions(options) {
        this._menuOptions = options;
    }
    get menuOptions() {
        return this._menuOptions;
    }
    get actions() {
        if (this.actionProvider) {
            return this.actionProvider.getActions();
        }
        return this._actions;
    }
    set actions(actions) {
        this._actions = actions;
    }
    show() {
        super.show();
        addClass(this.element, 'active');
        this._contextMenuProvider.showContextMenu({
            getAnchor: () => this.element,
            getActions: () => this.actions,
            getActionsContext: () => this.menuOptions ? this.menuOptions.context : null,
            getActionItem: action => this.menuOptions && this.menuOptions.actionItemProvider ? this.menuOptions.actionItemProvider(action) : undefined,
            getKeyBinding: action => this.menuOptions && this.menuOptions.getKeyBinding ? this.menuOptions.getKeyBinding(action) : undefined,
            getMenuClassName: () => this.menuClassName,
            onHide: () => this.onHide(),
            actionRunner: this.menuOptions ? this.menuOptions.actionRunner : undefined,
            anchorAlignment: this.menuOptions.anchorAlignment
        });
    }
    hide() {
        super.hide();
    }
    onHide() {
        this.hide();
        removeClass(this.element, 'active');
    }
}
export class DropdownMenuActionItem extends BaseActionItem {
    constructor(action, menuActionsOrProvider, contextMenuProvider, actionItemProvider, actionRunner, keybindings, clazz, anchorAlignmentProvider) {
        super(null, action);
        this.menuActionsOrProvider = menuActionsOrProvider;
        this.contextMenuProvider = contextMenuProvider;
        this.actionItemProvider = actionItemProvider;
        this.actionRunner = actionRunner;
        this.keybindings = keybindings;
        this.clazz = clazz;
        this.anchorAlignmentProvider = anchorAlignmentProvider;
    }
    render(container) {
        const labelRenderer = (el) => {
            this.element = append(el, $('a.action-label.icon'));
            if (this.clazz) {
                addClasses(this.element, this.clazz);
            }
            this.element.tabIndex = 0;
            this.element.setAttribute('role', 'button');
            this.element.setAttribute('aria-haspopup', 'true');
            this.element.title = this._action.label || '';
            return null;
        };
        const options = {
            contextMenuProvider: this.contextMenuProvider,
            labelRenderer: labelRenderer
        };
        // Render the DropdownMenu around a simple action to toggle it
        if (Array.isArray(this.menuActionsOrProvider)) {
            options.actions = this.menuActionsOrProvider;
        }
        else {
            options.actionProvider = this.menuActionsOrProvider;
        }
        this.dropdownMenu = this._register(new DropdownMenu(container, options));
        this.dropdownMenu.menuOptions = {
            actionItemProvider: this.actionItemProvider,
            actionRunner: this.actionRunner,
            getKeyBinding: this.keybindings,
            context: this._context
        };
        if (this.anchorAlignmentProvider) {
            const that = this;
            this.dropdownMenu.menuOptions = Object.assign({}, this.dropdownMenu.menuOptions, { get anchorAlignment() {
                    return that.anchorAlignmentProvider();
                } });
        }
    }
    setActionContext(newContext) {
        super.setActionContext(newContext);
        if (this.dropdownMenu) {
            this.dropdownMenu.menuOptions.context = newContext;
        }
    }
    show() {
        if (this.dropdownMenu) {
            this.dropdownMenu.show();
        }
    }
}
//# sourceMappingURL=dropdown.js.map