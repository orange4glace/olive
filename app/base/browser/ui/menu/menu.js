/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './menu.css';
import * as nls from 'nls';
import * as strings from 'base/common/strings';
import { Action } from 'base/common/actions';
import { ActionBar, ActionsOrientation, Separator, ActionItem, BaseActionItem } from 'base/browser/ui/actionbar/actionbar';
import { KeyCode } from 'base/common/keyCodes';
import { addClass, EventType, EventHelper, removeTabIndexAndUpdateFocus, isAncestor, hasClass, addDisposableListener, removeClass, append, $, addClasses, removeClasses } from 'base/browser/dom';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { RunOnceScheduler } from 'base/common/async';
import { dispose } from 'base/common/lifecycle';
import { DomScrollableElement } from 'base/browser/ui/scrollbar/scrollableElement';
import { ScrollbarVisibility } from 'base/common/scrollable';
import { Emitter } from 'base/common/event';
import { isLinux } from 'base/common/platform';
function createMenuMnemonicRegExp() {
    try {
        return new RegExp('\\(&([^\\s&])\\)|(?<!&)&([^\\s&])');
    }
    catch (err) {
        return new RegExp('\uFFFF'); // never match please
    }
}
export const MENU_MNEMONIC_REGEX = createMenuMnemonicRegExp();
function createMenuEscapedMnemonicRegExp() {
    try {
        return new RegExp('(?<!&amp;)(?:&amp;)([^\\s&])');
    }
    catch (err) {
        return new RegExp('\uFFFF'); // never match please
    }
}
export const MENU_ESCAPED_MNEMONIC_REGEX = createMenuEscapedMnemonicRegExp();
export class SubmenuAction extends Action {
    constructor(label, entries, cssClass) {
        super(!!cssClass ? cssClass : 'submenu', label, '', true);
        this.entries = entries;
    }
}
export class Menu extends ActionBar {
    constructor(container, actions, options = {}) {
        addClass(container, 'monaco-menu-container');
        container.setAttribute('role', 'presentation');
        const menuElement = document.createElement('div');
        addClass(menuElement, 'monaco-menu');
        menuElement.setAttribute('role', 'presentation');
        super(menuElement, {
            orientation: ActionsOrientation.VERTICAL,
            actionItemProvider: action => this.doGetActionItem(action, options, parentData),
            context: options.context,
            actionRunner: options.actionRunner,
            ariaLabel: options.ariaLabel,
            triggerKeys: { keys: [KeyCode.Enter], keyDown: true }
        });
        this.menuElement = menuElement;
        this._onScroll = this._register(new Emitter());
        this.actionsList.setAttribute('role', 'menu');
        this.actionsList.tabIndex = 0;
        this.menuDisposables = [];
        if (options.enableMnemonics) {
            this.menuDisposables.push(addDisposableListener(menuElement, EventType.KEY_DOWN, (e) => {
                const key = e.key.toLocaleLowerCase();
                if (this.mnemonics.has(key)) {
                    EventHelper.stop(e, true);
                    const actions = this.mnemonics.get(key);
                    if (actions.length === 1) {
                        if (actions[0] instanceof SubmenuActionItem) {
                            this.focusItemByElement(actions[0].container);
                        }
                        actions[0].onClick(e);
                    }
                    if (actions.length > 1) {
                        const action = actions.shift();
                        if (action) {
                            this.focusItemByElement(action.container);
                            actions.push(action);
                        }
                        this.mnemonics.set(key, actions);
                    }
                }
            }));
        }
        if (isLinux) {
            this._register(addDisposableListener(menuElement, EventType.KEY_DOWN, e => {
                const event = new StandardKeyboardEvent(e);
                if (event.equals(KeyCode.Home) || event.equals(KeyCode.PageUp)) {
                    this.focusedItem = this.items.length - 1;
                    this.focusNext();
                    EventHelper.stop(e, true);
                }
                else if (event.equals(KeyCode.End) || event.equals(KeyCode.PageDown)) {
                    this.focusedItem = 0;
                    this.focusPrevious();
                    EventHelper.stop(e, true);
                }
            }));
        }
        this._register(addDisposableListener(this.domNode, EventType.MOUSE_OUT, e => {
            let relatedTarget = e.relatedTarget;
            if (!isAncestor(relatedTarget, this.domNode)) {
                this.focusedItem = undefined;
                this.scrollTopHold = this.menuElement.scrollTop;
                this.updateFocus();
                e.stopPropagation();
            }
        }));
        this._register(addDisposableListener(this.domNode, EventType.MOUSE_UP, e => {
            // Absorb clicks in menu dead space https://github.com/Microsoft/vscode/issues/63575
            EventHelper.stop(e, true);
        }));
        this._register(addDisposableListener(this.actionsList, EventType.MOUSE_OVER, e => {
            let target = e.target;
            if (!target || !isAncestor(target, this.actionsList) || target === this.actionsList) {
                return;
            }
            while (target.parentElement !== this.actionsList && target.parentElement !== null) {
                target = target.parentElement;
            }
            if (hasClass(target, 'action-item')) {
                const lastFocusedItem = this.focusedItem;
                this.scrollTopHold = this.menuElement.scrollTop;
                this.setFocusedItem(target);
                if (lastFocusedItem !== this.focusedItem) {
                    this.updateFocus();
                }
            }
        }));
        let parentData = {
            parent: this
        };
        this.mnemonics = new Map();
        this.push(actions, { icon: true, label: true, isMenu: true });
        // Scroll Logic
        this.scrollableElement = this._register(new DomScrollableElement(menuElement, {
            alwaysConsumeMouseWheel: true,
            horizontal: ScrollbarVisibility.Hidden,
            vertical: ScrollbarVisibility.Visible,
            verticalScrollbarSize: 7,
            handleMouseWheel: true,
            useShadows: true
        }));
        const scrollElement = this.scrollableElement.getDomNode();
        scrollElement.style.position = null;
        menuElement.style.maxHeight = `${Math.max(10, window.innerHeight - container.getBoundingClientRect().top - 30)}px`;
        this.scrollableElement.onScroll(() => {
            this._onScroll.fire();
        }, this, this.menuDisposables);
        this._register(addDisposableListener(this.menuElement, EventType.SCROLL, (e) => {
            if (this.scrollTopHold !== undefined) {
                this.menuElement.scrollTop = this.scrollTopHold;
                this.scrollTopHold = undefined;
            }
            this.scrollableElement.scanDomNode();
        }));
        container.appendChild(this.scrollableElement.getDomNode());
        this.scrollableElement.scanDomNode();
        this.items.filter(item => !(item instanceof MenuSeparatorActionItem)).forEach((item, index, array) => {
            item.updatePositionInSet(index + 1, array.length);
        });
    }
    style(style) {
        const container = this.getContainer();
        const fgColor = style.foregroundColor ? `${style.foregroundColor}` : null;
        const bgColor = style.backgroundColor ? `${style.backgroundColor}` : null;
        const border = style.borderColor ? `2px solid ${style.borderColor}` : null;
        const shadow = style.shadowColor ? `0 2px 4px ${style.shadowColor}` : null;
        container.style.border = border;
        this.domNode.style.color = fgColor;
        this.domNode.style.backgroundColor = bgColor;
        container.style.boxShadow = shadow;
        if (this.items) {
            this.items.forEach(item => {
                if (item instanceof MenuActionItem || item instanceof MenuSeparatorActionItem) {
                    item.style(style);
                }
            });
        }
    }
    getContainer() {
        return this.scrollableElement.getDomNode();
    }
    get onScroll() {
        return this._onScroll.event;
    }
    get scrollOffset() {
        return this.menuElement.scrollTop;
    }
    trigger(index) {
        if (index <= this.items.length && index >= 0) {
            const item = this.items[index];
            if (item instanceof SubmenuActionItem) {
                super.focus(index);
                item.open(true);
            }
            else if (item instanceof MenuActionItem) {
                super.run(item._action, item._context);
            }
            else {
                return;
            }
        }
    }
    focusItemByElement(element) {
        const lastFocusedItem = this.focusedItem;
        this.setFocusedItem(element);
        if (lastFocusedItem !== this.focusedItem) {
            this.updateFocus();
        }
    }
    setFocusedItem(element) {
        for (let i = 0; i < this.actionsList.children.length; i++) {
            let elem = this.actionsList.children[i];
            if (element === elem) {
                this.focusedItem = i;
                break;
            }
        }
    }
    doGetActionItem(action, options, parentData) {
        if (action instanceof Separator) {
            return new MenuSeparatorActionItem(options.context, action, { icon: true });
        }
        else if (action instanceof SubmenuAction) {
            const menuActionItem = new SubmenuActionItem(action, action.entries, parentData, options);
            if (options.enableMnemonics) {
                const mnemonic = menuActionItem.getMnemonic();
                if (mnemonic && menuActionItem.isEnabled()) {
                    let actionItems = [];
                    if (this.mnemonics.has(mnemonic)) {
                        actionItems = this.mnemonics.get(mnemonic);
                    }
                    actionItems.push(menuActionItem);
                    this.mnemonics.set(mnemonic, actionItems);
                }
            }
            return menuActionItem;
        }
        else {
            const menuItemOptions = { enableMnemonics: options.enableMnemonics };
            if (options.getKeyBinding) {
                const keybinding = options.getKeyBinding(action);
                if (keybinding) {
                    const keybindingLabel = keybinding.getLabel();
                    if (keybindingLabel) {
                        menuItemOptions.keybinding = keybindingLabel;
                    }
                }
            }
            const menuActionItem = new MenuActionItem(options.context, action, menuItemOptions);
            if (options.enableMnemonics) {
                const mnemonic = menuActionItem.getMnemonic();
                if (mnemonic && menuActionItem.isEnabled()) {
                    let actionItems = [];
                    if (this.mnemonics.has(mnemonic)) {
                        actionItems = this.mnemonics.get(mnemonic);
                    }
                    actionItems.push(menuActionItem);
                    this.mnemonics.set(mnemonic, actionItems);
                }
            }
            return menuActionItem;
        }
    }
}
class MenuActionItem extends BaseActionItem {
    constructor(ctx, action, options = {}) {
        options.isMenu = true;
        super(action, action, options);
        this.options = options;
        this.options.icon = options.icon !== undefined ? options.icon : false;
        this.options.label = options.label !== undefined ? options.label : true;
        this.cssClass = '';
        // Set mnemonic
        if (this.options.label && options.enableMnemonics) {
            let label = this.getAction().label;
            if (label) {
                let matches = MENU_MNEMONIC_REGEX.exec(label);
                if (matches) {
                    this.mnemonic = (!!matches[1] ? matches[1] : matches[2]).toLocaleLowerCase();
                }
            }
        }
    }
    render(container) {
        super.render(container);
        if (!this.element) {
            return;
        }
        this.container = container;
        this.item = append(this.element, $('a.action-menu-item'));
        if (this._action.id === Separator.ID) {
            // A separator is a presentation item
            this.item.setAttribute('role', 'presentation');
        }
        else {
            this.item.setAttribute('role', 'menuitem');
            if (this.mnemonic) {
                this.item.setAttribute('aria-keyshortcuts', `${this.mnemonic}`);
            }
        }
        this.check = append(this.item, $('span.menu-item-check'));
        this.check.setAttribute('role', 'none');
        this.label = append(this.item, $('span.action-label'));
        if (this.options.label && this.options.keybinding) {
            append(this.item, $('span.keybinding')).textContent = this.options.keybinding;
        }
        this._register(addDisposableListener(this.element, EventType.MOUSE_UP, e => {
            EventHelper.stop(e, true);
            this.onClick(e);
        }));
        this.updateClass();
        this.updateLabel();
        this.updateTooltip();
        this.updateEnabled();
        this.updateChecked();
    }
    blur() {
        super.blur();
        this.applyStyle();
    }
    focus() {
        super.focus();
        this.item.focus();
        this.applyStyle();
    }
    updatePositionInSet(pos, setSize) {
        this.item.setAttribute('aria-posinset', `${pos}`);
        this.item.setAttribute('aria-setsize', `${setSize}`);
    }
    updateLabel() {
        if (this.options.label) {
            let label = this.getAction().label;
            if (label) {
                const cleanLabel = cleanMnemonic(label);
                if (!this.options.enableMnemonics) {
                    label = cleanLabel;
                }
                this.label.setAttribute('aria-label', cleanLabel.replace(/&&/g, '&'));
                const matches = MENU_MNEMONIC_REGEX.exec(label);
                if (matches) {
                    label = strings.escape(label).replace(MENU_ESCAPED_MNEMONIC_REGEX, '<u aria-hidden="true">$1</u>');
                    label = label.replace(/&amp;&amp;/g, '&amp;');
                    this.item.setAttribute('aria-keyshortcuts', (!!matches[1] ? matches[1] : matches[2]).toLocaleLowerCase());
                }
                else {
                    label = label.replace(/&&/g, '&');
                }
            }
            this.label.innerHTML = label.trim();
        }
    }
    updateTooltip() {
        let title = null;
        if (this.getAction().tooltip) {
            title = this.getAction().tooltip;
        }
        else if (!this.options.label && this.getAction().label && this.options.icon) {
            title = this.getAction().label;
            if (this.options.keybinding) {
                title = nls.localize({ key: 'titleLabel', comment: ['action title', 'action keybinding'] }, "{0} ({1})", title, this.options.keybinding);
            }
        }
        if (title) {
            this.item.title = title;
        }
    }
    updateClass() {
        if (this.cssClass) {
            removeClasses(this.item, this.cssClass);
        }
        if (this.options.icon) {
            this.cssClass = this.getAction().class || '';
            addClass(this.label, 'icon');
            if (this.cssClass) {
                addClasses(this.label, this.cssClass);
            }
            this.updateEnabled();
        }
        else {
            removeClass(this.label, 'icon');
        }
    }
    updateEnabled() {
        if (this.getAction().enabled) {
            if (this.element) {
                removeClass(this.element, 'disabled');
            }
            removeClass(this.item, 'disabled');
            this.item.tabIndex = 0;
        }
        else {
            if (this.element) {
                addClass(this.element, 'disabled');
            }
            addClass(this.item, 'disabled');
            removeTabIndexAndUpdateFocus(this.item);
        }
    }
    updateChecked() {
        if (this.getAction().checked) {
            addClass(this.item, 'checked');
            this.item.setAttribute('role', 'menuitemcheckbox');
            this.item.setAttribute('aria-checked', 'true');
        }
        else {
            removeClass(this.item, 'checked');
            this.item.setAttribute('role', 'menuitem');
            this.item.setAttribute('aria-checked', 'false');
        }
    }
    getMnemonic() {
        return this.mnemonic;
    }
    applyStyle() {
        if (!this.menuStyle) {
            return;
        }
        const isSelected = this.element && hasClass(this.element, 'focused');
        const fgColor = isSelected && this.menuStyle.selectionForegroundColor ? this.menuStyle.selectionForegroundColor : this.menuStyle.foregroundColor;
        const bgColor = isSelected && this.menuStyle.selectionBackgroundColor ? this.menuStyle.selectionBackgroundColor : this.menuStyle.backgroundColor;
        const border = isSelected && this.menuStyle.selectionBorderColor ? `1px solid ${this.menuStyle.selectionBorderColor}` : null;
        this.item.style.color = fgColor ? `${fgColor}` : null;
        this.check.style.backgroundColor = fgColor ? `${fgColor}` : null;
        this.item.style.backgroundColor = bgColor ? `${bgColor}` : null;
        this.container.style.border = border;
    }
    style(style) {
        this.menuStyle = style;
        this.applyStyle();
    }
}
class SubmenuActionItem extends MenuActionItem {
    constructor(action, submenuActions, parentData, submenuOptions) {
        super(action, action, submenuOptions);
        this.submenuActions = submenuActions;
        this.parentData = parentData;
        this.submenuOptions = submenuOptions;
        this.submenuDisposables = [];
        this.showScheduler = new RunOnceScheduler(() => {
            if (this.mouseOver) {
                this.cleanupExistingSubmenu(false);
                this.createSubmenu(false);
            }
        }, 250);
        this.hideScheduler = new RunOnceScheduler(() => {
            if (this.element && (!isAncestor(document.activeElement, this.element) && this.parentData.submenu === this.mysubmenu)) {
                this.parentData.parent.focus(false);
                this.cleanupExistingSubmenu(true);
            }
        }, 750);
    }
    render(container) {
        super.render(container);
        if (!this.element) {
            return;
        }
        addClass(this.item, 'monaco-submenu-item');
        this.item.setAttribute('aria-haspopup', 'true');
        this.submenuIndicator = append(this.item, $('span.submenu-indicator'));
        this.submenuIndicator.setAttribute('aria-hidden', 'true');
        this._register(addDisposableListener(this.element, EventType.KEY_UP, e => {
            let event = new StandardKeyboardEvent(e);
            if (event.equals(KeyCode.RightArrow) || event.equals(KeyCode.Enter)) {
                EventHelper.stop(e, true);
                this.createSubmenu(true);
            }
        }));
        this._register(addDisposableListener(this.element, EventType.KEY_DOWN, e => {
            let event = new StandardKeyboardEvent(e);
            if (event.equals(KeyCode.RightArrow) || event.equals(KeyCode.Enter)) {
                EventHelper.stop(e, true);
            }
        }));
        this._register(addDisposableListener(this.element, EventType.MOUSE_OVER, e => {
            if (!this.mouseOver) {
                this.mouseOver = true;
                this.showScheduler.schedule();
            }
        }));
        this._register(addDisposableListener(this.element, EventType.MOUSE_LEAVE, e => {
            this.mouseOver = false;
        }));
        this._register(addDisposableListener(this.element, EventType.FOCUS_OUT, e => {
            if (this.element && !isAncestor(document.activeElement, this.element)) {
                this.hideScheduler.schedule();
            }
        }));
        this._register(this.parentData.parent.onScroll(() => {
            this.parentData.parent.focus(false);
            this.cleanupExistingSubmenu(false);
        }));
    }
    open(selectFirst) {
        this.cleanupExistingSubmenu(false);
        this.createSubmenu(selectFirst);
    }
    onClick(e) {
        // stop clicking from trying to run an action
        EventHelper.stop(e, true);
        this.cleanupExistingSubmenu(false);
        this.createSubmenu(false);
    }
    cleanupExistingSubmenu(force) {
        if (this.parentData.submenu && (force || (this.parentData.submenu !== this.mysubmenu))) {
            this.parentData.submenu.dispose();
            this.parentData.submenu = undefined;
            if (this.submenuContainer) {
                this.submenuDisposables = dispose(this.submenuDisposables);
                this.submenuContainer = undefined;
            }
        }
    }
    createSubmenu(selectFirstItem = true) {
        if (!this.element) {
            return;
        }
        if (!this.parentData.submenu) {
            this.submenuContainer = append(this.element, $('div.monaco-submenu'));
            addClasses(this.submenuContainer, 'menubar-menu-items-holder', 'context-view');
            this.parentData.submenu = new Menu(this.submenuContainer, this.submenuActions, this.submenuOptions);
            if (this.menuStyle) {
                this.parentData.submenu.style(this.menuStyle);
            }
            const boundingRect = this.element.getBoundingClientRect();
            const childBoundingRect = this.submenuContainer.getBoundingClientRect();
            const computedStyles = getComputedStyle(this.parentData.parent.domNode);
            const paddingTop = parseFloat(computedStyles.paddingTop || '0') || 0;
            if (window.innerWidth <= boundingRect.right + childBoundingRect.width) {
                this.submenuContainer.style.left = '10px';
                this.submenuContainer.style.top = `${this.element.offsetTop - this.parentData.parent.scrollOffset + boundingRect.height}px`;
            }
            else {
                this.submenuContainer.style.left = `${this.element.offsetWidth}px`;
                this.submenuContainer.style.top = `${this.element.offsetTop - this.parentData.parent.scrollOffset - paddingTop}px`;
            }
            this.submenuDisposables.push(addDisposableListener(this.submenuContainer, EventType.KEY_UP, e => {
                let event = new StandardKeyboardEvent(e);
                if (event.equals(KeyCode.LeftArrow)) {
                    EventHelper.stop(e, true);
                    this.parentData.parent.focus();
                    if (this.parentData.submenu) {
                        this.parentData.submenu.dispose();
                        this.parentData.submenu = undefined;
                    }
                    this.submenuDisposables = dispose(this.submenuDisposables);
                    this.submenuContainer = undefined;
                }
            }));
            this.submenuDisposables.push(addDisposableListener(this.submenuContainer, EventType.KEY_DOWN, e => {
                let event = new StandardKeyboardEvent(e);
                if (event.equals(KeyCode.LeftArrow)) {
                    EventHelper.stop(e, true);
                }
            }));
            this.submenuDisposables.push(this.parentData.submenu.onDidCancel(() => {
                this.parentData.parent.focus();
                if (this.parentData.submenu) {
                    this.parentData.submenu.dispose();
                    this.parentData.submenu = undefined;
                }
                this.submenuDisposables = dispose(this.submenuDisposables);
                this.submenuContainer = undefined;
            }));
            this.parentData.submenu.focus(selectFirstItem);
            this.mysubmenu = this.parentData.submenu;
        }
        else {
            this.parentData.submenu.focus(false);
        }
    }
    applyStyle() {
        super.applyStyle();
        if (!this.menuStyle) {
            return;
        }
        const isSelected = this.element && hasClass(this.element, 'focused');
        const fgColor = isSelected && this.menuStyle.selectionForegroundColor ? this.menuStyle.selectionForegroundColor : this.menuStyle.foregroundColor;
        this.submenuIndicator.style.backgroundColor = fgColor ? `${fgColor}` : null;
        if (this.parentData.submenu) {
            this.parentData.submenu.style(this.menuStyle);
        }
    }
    dispose() {
        super.dispose();
        this.hideScheduler.dispose();
        if (this.mysubmenu) {
            this.mysubmenu.dispose();
            this.mysubmenu = null;
        }
        if (this.submenuContainer) {
            this.submenuDisposables = dispose(this.submenuDisposables);
            this.submenuContainer = undefined;
        }
    }
}
class MenuSeparatorActionItem extends ActionItem {
    style(style) {
        this.label.style.borderBottomColor = style.separatorColor ? `${style.separatorColor}` : null;
    }
}
export function cleanMnemonic(label) {
    const regex = MENU_MNEMONIC_REGEX;
    const matches = regex.exec(label);
    if (!matches) {
        return label;
    }
    const mnemonicInText = matches[0].charAt(0) === '&';
    return label.replace(regex, mnemonicInText ? '$2' : '').trim();
}
//# sourceMappingURL=menu.js.map