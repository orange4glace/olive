/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as browser from 'base/browser/browser';
import * as DOM from 'base/browser/dom';
import * as strings from 'base/common/strings';
import * as nls from 'nls';
import { domEvent } from 'base/browser/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { EventType, Gesture } from 'base/browser/touch';
import { cleanMnemonic, Menu, MENU_ESCAPED_MNEMONIC_REGEX, MENU_MNEMONIC_REGEX, SubmenuAction } from 'base/browser/ui/menu/menu';
import { ActionRunner } from 'base/common/actions';
import { RunOnceScheduler } from 'base/common/async';
import { Emitter } from 'base/common/event';
import { KeyCode } from 'base/common/keyCodes';
import { Disposable, dispose } from 'base/common/lifecycle';
import { withNullAsUndefined } from 'base/common/types';
import { asArray } from 'base/common/arrays';
const $ = DOM.$;
var MenubarState;
(function (MenubarState) {
    MenubarState[MenubarState["HIDDEN"] = 0] = "HIDDEN";
    MenubarState[MenubarState["VISIBLE"] = 1] = "VISIBLE";
    MenubarState[MenubarState["FOCUSED"] = 2] = "FOCUSED";
    MenubarState[MenubarState["OPEN"] = 3] = "OPEN";
})(MenubarState || (MenubarState = {}));
export class MenuBar extends Disposable {
    constructor(container, options = {}) {
        super();
        this.container = container;
        this.options = options;
        this.container.setAttribute('role', 'menubar');
        this.menuCache = [];
        this.mnemonics = new Map();
        this._focusState = MenubarState.VISIBLE;
        this._onVisibilityChange = this._register(new Emitter());
        this._onFocusStateChange = this._register(new Emitter());
        this.createOverflowMenu();
        this.menuUpdater = this._register(new RunOnceScheduler(() => this.update(), 200));
        this.actionRunner = this._register(new ActionRunner());
        this._register(this.actionRunner.onDidBeforeRun(() => {
            this.setUnfocusedState();
        }));
        this._register(ModifierKeyEmitter.getInstance().event(this.onModifierKeyToggled, this));
        this._register(DOM.addDisposableListener(this.container, DOM.EventType.KEY_DOWN, (e) => {
            let event = new StandardKeyboardEvent(e);
            let eventHandled = true;
            const key = !!e.key ? e.key.toLocaleLowerCase() : '';
            if (event.equals(KeyCode.LeftArrow)) {
                this.focusPrevious();
            }
            else if (event.equals(KeyCode.RightArrow)) {
                this.focusNext();
            }
            else if (event.equals(KeyCode.Escape) && this.isFocused && !this.isOpen) {
                this.setUnfocusedState();
            }
            else if (!this.isOpen && !event.ctrlKey && this.options.enableMnemonics && this.mnemonicsInUse && this.mnemonics.has(key)) {
                const menuIndex = this.mnemonics.get(key);
                this.onMenuTriggered(menuIndex, false);
            }
            else {
                eventHandled = false;
            }
            if (eventHandled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }));
        this._register(DOM.addDisposableListener(window, DOM.EventType.MOUSE_DOWN, () => {
            // This mouse event is outside the menubar so it counts as a focus out
            if (this.isFocused) {
                this.setUnfocusedState();
            }
        }));
        this._register(DOM.addDisposableListener(this.container, DOM.EventType.FOCUS_IN, (e) => {
            let event = e;
            if (event.relatedTarget) {
                if (!this.container.contains(event.relatedTarget)) {
                    this.focusToReturn = event.relatedTarget;
                }
            }
        }));
        this._register(DOM.addDisposableListener(this.container, DOM.EventType.FOCUS_OUT, (e) => {
            let event = e;
            // We are losing focus and there is no related target, e.g. webview case
            if (!event.relatedTarget) {
                this.setUnfocusedState();
            }
            // We are losing focus and there is a target, reset focusToReturn value as not to redirect
            else if (event.relatedTarget && !this.container.contains(event.relatedTarget)) {
                this.focusToReturn = undefined;
                this.setUnfocusedState();
            }
        }));
        this._register(DOM.addDisposableListener(window, DOM.EventType.KEY_DOWN, (e) => {
            if (!this.options.enableMnemonics || !e.altKey || e.ctrlKey || e.defaultPrevented) {
                return;
            }
            const key = e.key.toLocaleLowerCase();
            if (!this.mnemonics.has(key)) {
                return;
            }
            this.mnemonicsInUse = true;
            this.updateMnemonicVisibility(true);
            const menuIndex = this.mnemonics.get(key);
            this.onMenuTriggered(menuIndex, false);
        }));
        this.setUnfocusedState();
    }
    push(arg) {
        const menus = asArray(arg);
        menus.forEach((menuBarMenu) => {
            const menuIndex = this.menuCache.length;
            const cleanMenuLabel = cleanMnemonic(menuBarMenu.label);
            const buttonElement = $('div.menubar-menu-button', { 'role': 'menuitem', 'tabindex': -1, 'aria-label': cleanMenuLabel, 'aria-haspopup': true });
            const titleElement = $('div.menubar-menu-title', { 'role': 'none', 'aria-hidden': true });
            buttonElement.appendChild(titleElement);
            this.container.insertBefore(buttonElement, this.overflowMenu.buttonElement);
            let mnemonicMatches = MENU_MNEMONIC_REGEX.exec(menuBarMenu.label);
            // Register mnemonics
            if (mnemonicMatches) {
                let mnemonic = !!mnemonicMatches[1] ? mnemonicMatches[1] : mnemonicMatches[2];
                this.registerMnemonic(this.menuCache.length, mnemonic);
            }
            this.updateLabels(titleElement, buttonElement, menuBarMenu.label);
            this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.KEY_UP, (e) => {
                let event = new StandardKeyboardEvent(e);
                let eventHandled = true;
                if ((event.equals(KeyCode.DownArrow) || event.equals(KeyCode.Enter)) && !this.isOpen) {
                    this.focusedMenu = { index: menuIndex };
                    this.openedViaKeyboard = true;
                    this.focusState = MenubarState.OPEN;
                }
                else {
                    eventHandled = false;
                }
                if (eventHandled) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }));
            Gesture.addTarget(buttonElement);
            this._register(DOM.addDisposableListener(buttonElement, EventType.Tap, (e) => {
                // Ignore this touch if the menu is touched
                if (this.isOpen && this.focusedMenu && this.focusedMenu.holder && DOM.isAncestor(e.initialTarget, this.focusedMenu.holder)) {
                    return;
                }
                this.ignoreNextMouseUp = false;
                this.onMenuTriggered(menuIndex, true);
                e.preventDefault();
                e.stopPropagation();
            }));
            this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_DOWN, (e) => {
                if (!this.isOpen) {
                    // Open the menu with mouse down and ignore the following mouse up event
                    this.ignoreNextMouseUp = true;
                    this.onMenuTriggered(menuIndex, true);
                }
                else {
                    this.ignoreNextMouseUp = false;
                }
                e.preventDefault();
                e.stopPropagation();
            }));
            this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_UP, (e) => {
                if (!this.ignoreNextMouseUp) {
                    if (this.isFocused) {
                        this.onMenuTriggered(menuIndex, true);
                    }
                }
                else {
                    this.ignoreNextMouseUp = false;
                }
            }));
            this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_ENTER, () => {
                if (this.isOpen && !this.isCurrentMenu(menuIndex)) {
                    this.menuCache[menuIndex].buttonElement.focus();
                    this.cleanupCustomMenu();
                    this.showCustomMenu(menuIndex, false);
                }
                else if (this.isFocused && !this.isOpen) {
                    this.focusedMenu = { index: menuIndex };
                    buttonElement.focus();
                }
            }));
            this.menuCache.push({
                label: menuBarMenu.label,
                actions: menuBarMenu.actions,
                buttonElement: buttonElement,
                titleElement: titleElement
            });
        });
    }
    createOverflowMenu() {
        const label = nls.localize('mMore', "...");
        const buttonElement = $('div.menubar-menu-button', { 'role': 'menuitem', 'tabindex': -1, 'aria-label': label, 'aria-haspopup': true });
        const titleElement = $('div.menubar-menu-title.toolbar-toggle-more', { 'role': 'none', 'aria-hidden': true });
        buttonElement.appendChild(titleElement);
        this.container.appendChild(buttonElement);
        buttonElement.style.visibility = 'hidden';
        this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.KEY_UP, (e) => {
            let event = new StandardKeyboardEvent(e);
            let eventHandled = true;
            if ((event.equals(KeyCode.DownArrow) || event.equals(KeyCode.Enter)) && !this.isOpen) {
                this.focusedMenu = { index: MenuBar.OVERFLOW_INDEX };
                this.openedViaKeyboard = true;
                this.focusState = MenubarState.OPEN;
            }
            else {
                eventHandled = false;
            }
            if (eventHandled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }));
        Gesture.addTarget(buttonElement);
        this._register(DOM.addDisposableListener(buttonElement, EventType.Tap, (e) => {
            // Ignore this touch if the menu is touched
            if (this.isOpen && this.focusedMenu && this.focusedMenu.holder && DOM.isAncestor(e.initialTarget, this.focusedMenu.holder)) {
                return;
            }
            this.ignoreNextMouseUp = false;
            this.onMenuTriggered(MenuBar.OVERFLOW_INDEX, true);
            e.preventDefault();
            e.stopPropagation();
        }));
        this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_DOWN, (e) => {
            if (!this.isOpen) {
                // Open the menu with mouse down and ignore the following mouse up event
                this.ignoreNextMouseUp = true;
                this.onMenuTriggered(MenuBar.OVERFLOW_INDEX, true);
            }
            else {
                this.ignoreNextMouseUp = false;
            }
            e.preventDefault();
            e.stopPropagation();
        }));
        this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_UP, (e) => {
            if (!this.ignoreNextMouseUp) {
                if (this.isFocused) {
                    this.onMenuTriggered(MenuBar.OVERFLOW_INDEX, true);
                }
            }
            else {
                this.ignoreNextMouseUp = false;
            }
        }));
        this._register(DOM.addDisposableListener(buttonElement, DOM.EventType.MOUSE_ENTER, () => {
            if (this.isOpen && !this.isCurrentMenu(MenuBar.OVERFLOW_INDEX)) {
                this.overflowMenu.buttonElement.focus();
                this.cleanupCustomMenu();
                this.showCustomMenu(MenuBar.OVERFLOW_INDEX, false);
            }
            else if (this.isFocused && !this.isOpen) {
                this.focusedMenu = { index: MenuBar.OVERFLOW_INDEX };
                buttonElement.focus();
            }
        }));
        this.overflowMenu = {
            buttonElement: buttonElement,
            titleElement: titleElement,
            label: 'More'
        };
    }
    updateMenu(menu) {
        const menuToUpdate = this.menuCache.filter(menuBarMenu => menuBarMenu.label === menu.label);
        if (menuToUpdate && menuToUpdate.length) {
            menuToUpdate[0].actions = menu.actions;
        }
    }
    dispose() {
        super.dispose();
        this.menuCache.forEach(menuBarMenu => {
            DOM.removeNode(menuBarMenu.titleElement);
            DOM.removeNode(menuBarMenu.buttonElement);
        });
        DOM.removeNode(this.overflowMenu.titleElement);
        DOM.removeNode(this.overflowMenu.buttonElement);
        if (this.overflowLayoutScheduled) {
            this.overflowLayoutScheduled = dispose(this.overflowLayoutScheduled);
        }
    }
    blur() {
        this.setUnfocusedState();
    }
    getWidth() {
        if (this.menuCache) {
            const left = this.menuCache[0].buttonElement.getBoundingClientRect().left;
            const right = this.hasOverflow ? this.overflowMenu.buttonElement.getBoundingClientRect().right : this.menuCache[this.menuCache.length - 1].buttonElement.getBoundingClientRect().right;
            return right - left;
        }
        return 0;
    }
    getHeight() {
        return this.container.clientHeight;
    }
    updateOverflowAction() {
        if (!this.menuCache || !this.menuCache.length) {
            return;
        }
        const sizeAvailable = this.container.offsetWidth;
        let currentSize = 0;
        let full = false;
        const prevNumMenusShown = this.numMenusShown;
        this.numMenusShown = 0;
        for (let menuBarMenu of this.menuCache) {
            if (!full) {
                const size = menuBarMenu.buttonElement.offsetWidth;
                if (currentSize + size > sizeAvailable) {
                    full = true;
                }
                else {
                    currentSize += size;
                    this.numMenusShown++;
                    if (this.numMenusShown > prevNumMenusShown) {
                        menuBarMenu.buttonElement.style.visibility = 'visible';
                    }
                }
            }
            if (full) {
                menuBarMenu.buttonElement.style.visibility = 'hidden';
            }
        }
        // Overflow
        if (full) {
            // Can't fit the more button, need to remove more menus
            while (currentSize + this.overflowMenu.buttonElement.offsetWidth > sizeAvailable && this.numMenusShown > 0) {
                this.numMenusShown--;
                const size = this.menuCache[this.numMenusShown].buttonElement.offsetWidth;
                this.menuCache[this.numMenusShown].buttonElement.style.visibility = 'hidden';
                currentSize -= size;
            }
            this.overflowMenu.actions = [];
            for (let idx = this.numMenusShown; idx < this.menuCache.length; idx++) {
                this.overflowMenu.actions.push(new SubmenuAction(this.menuCache[idx].label, this.menuCache[idx].actions || []));
            }
            DOM.removeNode(this.overflowMenu.buttonElement);
            this.container.insertBefore(this.overflowMenu.buttonElement, this.menuCache[this.numMenusShown].buttonElement);
            this.overflowMenu.buttonElement.style.visibility = 'visible';
        }
        else {
            DOM.removeNode(this.overflowMenu.buttonElement);
            this.container.appendChild(this.overflowMenu.buttonElement);
            this.overflowMenu.buttonElement.style.visibility = 'hidden';
        }
    }
    updateLabels(titleElement, buttonElement, label) {
        const cleanMenuLabel = cleanMnemonic(label);
        // Update the button label to reflect mnemonics
        titleElement.innerHTML = this.options.enableMnemonics ?
            strings.escape(label).replace(MENU_ESCAPED_MNEMONIC_REGEX, '<mnemonic aria-hidden="true">$1</mnemonic>').replace(/&amp;&amp;/g, '&amp;') :
            cleanMenuLabel.replace(/&&/g, '&');
        let mnemonicMatches = MENU_MNEMONIC_REGEX.exec(label);
        // Register mnemonics
        if (mnemonicMatches) {
            let mnemonic = !!mnemonicMatches[1] ? mnemonicMatches[1] : mnemonicMatches[2];
            if (this.options.enableMnemonics) {
                buttonElement.setAttribute('aria-keyshortcuts', 'Alt+' + mnemonic.toLocaleLowerCase());
            }
            else {
                buttonElement.removeAttribute('aria-keyshortcuts');
            }
        }
    }
    style(style) {
        this.menuStyle = style;
    }
    update(options) {
        if (options) {
            this.options = options;
        }
        // Don't update while using the menu
        if (this.isFocused) {
            this.updatePending = true;
            return;
        }
        this.menuCache.forEach(menuBarMenu => {
            this.updateLabels(menuBarMenu.titleElement, menuBarMenu.buttonElement, menuBarMenu.label);
        });
        if (!this.overflowLayoutScheduled) {
            this.overflowLayoutScheduled = DOM.scheduleAtNextAnimationFrame(() => {
                this.updateOverflowAction();
                this.overflowLayoutScheduled = null;
            });
        }
        this.setUnfocusedState();
    }
    registerMnemonic(menuIndex, mnemonic) {
        this.mnemonics.set(mnemonic.toLocaleLowerCase(), menuIndex);
    }
    hideMenubar() {
        if (this.container.style.display !== 'none') {
            this.container.style.display = 'none';
            this._onVisibilityChange.fire(false);
        }
    }
    showMenubar() {
        if (this.container.style.display !== 'flex') {
            this.container.style.display = 'flex';
            this._onVisibilityChange.fire(true);
            this.updateOverflowAction();
        }
    }
    get focusState() {
        return this._focusState;
    }
    set focusState(value) {
        if (this._focusState >= MenubarState.FOCUSED && value < MenubarState.FOCUSED) {
            // Losing focus, update the menu if needed
            if (this.updatePending) {
                this.menuUpdater.schedule();
                this.updatePending = false;
            }
        }
        if (value === this._focusState) {
            return;
        }
        const isVisible = this.isVisible;
        const isOpen = this.isOpen;
        const isFocused = this.isFocused;
        this._focusState = value;
        switch (value) {
            case MenubarState.HIDDEN:
                if (isVisible) {
                    this.hideMenubar();
                }
                if (isOpen) {
                    this.cleanupCustomMenu();
                }
                if (isFocused) {
                    this.focusedMenu = undefined;
                    if (this.focusToReturn) {
                        this.focusToReturn.focus();
                        this.focusToReturn = undefined;
                    }
                }
                break;
            case MenubarState.VISIBLE:
                if (!isVisible) {
                    this.showMenubar();
                }
                if (isOpen) {
                    this.cleanupCustomMenu();
                }
                if (isFocused) {
                    if (this.focusedMenu) {
                        if (this.focusedMenu.index === MenuBar.OVERFLOW_INDEX) {
                            this.overflowMenu.buttonElement.blur();
                        }
                        else {
                            this.menuCache[this.focusedMenu.index].buttonElement.blur();
                        }
                    }
                    this.focusedMenu = undefined;
                    if (this.focusToReturn) {
                        this.focusToReturn.focus();
                        this.focusToReturn = undefined;
                    }
                }
                break;
            case MenubarState.FOCUSED:
                if (!isVisible) {
                    this.showMenubar();
                }
                if (isOpen) {
                    this.cleanupCustomMenu();
                }
                if (this.focusedMenu) {
                    if (this.focusedMenu.index === MenuBar.OVERFLOW_INDEX) {
                        this.overflowMenu.buttonElement.focus();
                    }
                    else {
                        this.menuCache[this.focusedMenu.index].buttonElement.focus();
                    }
                }
                break;
            case MenubarState.OPEN:
                if (!isVisible) {
                    this.showMenubar();
                }
                if (this.focusedMenu) {
                    this.showCustomMenu(this.focusedMenu.index, this.openedViaKeyboard);
                }
                break;
        }
        this._focusState = value;
        this._onFocusStateChange.fire(this.focusState >= MenubarState.FOCUSED);
    }
    get isVisible() {
        return this.focusState >= MenubarState.VISIBLE;
    }
    get isFocused() {
        return this.focusState >= MenubarState.FOCUSED;
    }
    get isOpen() {
        return this.focusState >= MenubarState.OPEN;
    }
    get hasOverflow() {
        return this.numMenusShown < this.menuCache.length;
    }
    setUnfocusedState() {
        if (this.options.visibility === 'toggle' || this.options.visibility === 'hidden') {
            this.focusState = MenubarState.HIDDEN;
        }
        else if (this.options.visibility === 'default' && browser.isFullscreen()) {
            this.focusState = MenubarState.HIDDEN;
        }
        else {
            this.focusState = MenubarState.VISIBLE;
        }
        this.ignoreNextMouseUp = false;
        this.mnemonicsInUse = false;
        this.updateMnemonicVisibility(false);
    }
    focusPrevious() {
        if (!this.focusedMenu) {
            return;
        }
        let newFocusedIndex = (this.focusedMenu.index - 1 + this.numMenusShown) % this.numMenusShown;
        if (this.focusedMenu.index === MenuBar.OVERFLOW_INDEX) {
            newFocusedIndex = this.numMenusShown - 1;
        }
        else if (this.focusedMenu.index === 0 && this.hasOverflow) {
            newFocusedIndex = MenuBar.OVERFLOW_INDEX;
        }
        if (newFocusedIndex === this.focusedMenu.index) {
            return;
        }
        if (this.isOpen) {
            this.cleanupCustomMenu();
            this.showCustomMenu(newFocusedIndex);
        }
        else if (this.isFocused) {
            this.focusedMenu.index = newFocusedIndex;
            if (newFocusedIndex === MenuBar.OVERFLOW_INDEX) {
                this.overflowMenu.buttonElement.focus();
            }
            else {
                this.menuCache[newFocusedIndex].buttonElement.focus();
            }
        }
    }
    focusNext() {
        if (!this.focusedMenu) {
            return;
        }
        let newFocusedIndex = (this.focusedMenu.index + 1) % this.numMenusShown;
        if (this.focusedMenu.index === MenuBar.OVERFLOW_INDEX) {
            newFocusedIndex = 0;
        }
        else if (this.focusedMenu.index === this.numMenusShown - 1) {
            newFocusedIndex = MenuBar.OVERFLOW_INDEX;
        }
        if (newFocusedIndex === this.focusedMenu.index) {
            return;
        }
        if (this.isOpen) {
            this.cleanupCustomMenu();
            this.showCustomMenu(newFocusedIndex);
        }
        else if (this.isFocused) {
            this.focusedMenu.index = newFocusedIndex;
            if (newFocusedIndex === MenuBar.OVERFLOW_INDEX) {
                this.overflowMenu.buttonElement.focus();
            }
            else {
                this.menuCache[newFocusedIndex].buttonElement.focus();
            }
        }
    }
    updateMnemonicVisibility(visible) {
        if (this.menuCache) {
            this.menuCache.forEach(menuBarMenu => {
                if (menuBarMenu.titleElement.children.length) {
                    let child = menuBarMenu.titleElement.children.item(0);
                    if (child) {
                        child.style.textDecoration = (this.options.alwaysOnMnemonics || visible) ? 'underline' : null;
                    }
                }
            });
        }
    }
    get mnemonicsInUse() {
        return this._mnemonicsInUse;
    }
    set mnemonicsInUse(value) {
        this._mnemonicsInUse = value;
    }
    get onVisibilityChange() {
        return this._onVisibilityChange.event;
    }
    get onFocusStateChange() {
        return this._onFocusStateChange.event;
    }
    onMenuTriggered(menuIndex, clicked) {
        if (this.isOpen) {
            if (this.isCurrentMenu(menuIndex)) {
                this.setUnfocusedState();
            }
            else {
                this.cleanupCustomMenu();
                this.showCustomMenu(menuIndex, this.openedViaKeyboard);
            }
        }
        else {
            this.focusedMenu = { index: menuIndex };
            this.openedViaKeyboard = !clicked;
            this.focusState = MenubarState.OPEN;
        }
    }
    onModifierKeyToggled(modifierKeyStatus) {
        const allModifiersReleased = !modifierKeyStatus.altKey && !modifierKeyStatus.ctrlKey && !modifierKeyStatus.shiftKey;
        if (this.options.visibility === 'hidden') {
            return;
        }
        // Alt key pressed while menu is focused. This should return focus away from the menubar
        if (this.isFocused && modifierKeyStatus.lastKeyPressed === 'alt' && modifierKeyStatus.altKey) {
            this.setUnfocusedState();
            this.mnemonicsInUse = false;
            this.awaitingAltRelease = true;
        }
        // Clean alt key press and release
        if (allModifiersReleased && modifierKeyStatus.lastKeyPressed === 'alt' && modifierKeyStatus.lastKeyReleased === 'alt') {
            if (!this.awaitingAltRelease) {
                if (!this.isFocused) {
                    this.mnemonicsInUse = true;
                    this.focusedMenu = { index: this.numMenusShown > 0 ? 0 : MenuBar.OVERFLOW_INDEX };
                    this.focusState = MenubarState.FOCUSED;
                }
                else if (!this.isOpen) {
                    this.setUnfocusedState();
                }
            }
        }
        // Alt key released
        if (!modifierKeyStatus.altKey && modifierKeyStatus.lastKeyReleased === 'alt') {
            this.awaitingAltRelease = false;
        }
        if (this.options.enableMnemonics && this.menuCache && !this.isOpen) {
            this.updateMnemonicVisibility((!this.awaitingAltRelease && modifierKeyStatus.altKey) || this.mnemonicsInUse);
        }
    }
    isCurrentMenu(menuIndex) {
        if (!this.focusedMenu) {
            return false;
        }
        return this.focusedMenu.index === menuIndex;
    }
    cleanupCustomMenu() {
        if (this.focusedMenu) {
            // Remove focus from the menus first
            if (this.focusedMenu.index === MenuBar.OVERFLOW_INDEX) {
                this.overflowMenu.buttonElement.focus();
            }
            else {
                this.menuCache[this.focusedMenu.index].buttonElement.focus();
            }
            if (this.focusedMenu.holder) {
                if (this.focusedMenu.holder.parentElement) {
                    DOM.removeClass(this.focusedMenu.holder.parentElement, 'open');
                }
                this.focusedMenu.holder.remove();
            }
            if (this.focusedMenu.widget) {
                this.focusedMenu.widget.dispose();
            }
            this.focusedMenu = { index: this.focusedMenu.index };
        }
    }
    showCustomMenu(menuIndex, selectFirst = true) {
        const actualMenuIndex = menuIndex >= this.numMenusShown ? MenuBar.OVERFLOW_INDEX : menuIndex;
        const customMenu = actualMenuIndex === MenuBar.OVERFLOW_INDEX ? this.overflowMenu : this.menuCache[actualMenuIndex];
        if (!customMenu.actions) {
            return;
        }
        const menuHolder = $('div.menubar-menu-items-holder');
        DOM.addClass(customMenu.buttonElement, 'open');
        menuHolder.style.top = `${this.container.clientHeight}px`;
        menuHolder.style.left = `${customMenu.buttonElement.getBoundingClientRect().left}px`;
        customMenu.buttonElement.appendChild(menuHolder);
        let menuOptions = {
            getKeyBinding: this.options.getKeybinding,
            actionRunner: this.actionRunner,
            enableMnemonics: this.options.alwaysOnMnemonics || (this.mnemonicsInUse && this.options.enableMnemonics),
            ariaLabel: withNullAsUndefined(customMenu.buttonElement.getAttribute('aria-label'))
        };
        let menuWidget = this._register(new Menu(menuHolder, customMenu.actions, menuOptions));
        menuWidget.style(this.menuStyle);
        this._register(menuWidget.onDidCancel(() => {
            this.focusState = MenubarState.FOCUSED;
        }));
        if (actualMenuIndex !== menuIndex) {
            menuWidget.trigger(menuIndex - this.numMenusShown);
        }
        else {
            menuWidget.focus(selectFirst);
        }
        this.focusedMenu = {
            index: actualMenuIndex,
            holder: menuHolder,
            widget: menuWidget
        };
    }
}
MenuBar.OVERFLOW_INDEX = -1;
class ModifierKeyEmitter extends Emitter {
    constructor() {
        super();
        this._subscriptions = [];
        this._keyStatus = {
            altKey: false,
            shiftKey: false,
            ctrlKey: false
        };
        this._subscriptions.push(domEvent(document.body, 'keydown', true)(e => {
            const event = new StandardKeyboardEvent(e);
            if (e.altKey && !this._keyStatus.altKey) {
                this._keyStatus.lastKeyPressed = 'alt';
            }
            else if (e.ctrlKey && !this._keyStatus.ctrlKey) {
                this._keyStatus.lastKeyPressed = 'ctrl';
            }
            else if (e.shiftKey && !this._keyStatus.shiftKey) {
                this._keyStatus.lastKeyPressed = 'shift';
            }
            else if (event.keyCode !== KeyCode.Alt) {
                this._keyStatus.lastKeyPressed = undefined;
            }
            else {
                return;
            }
            this._keyStatus.altKey = e.altKey;
            this._keyStatus.ctrlKey = e.ctrlKey;
            this._keyStatus.shiftKey = e.shiftKey;
            if (this._keyStatus.lastKeyPressed) {
                this.fire(this._keyStatus);
            }
        }));
        this._subscriptions.push(domEvent(document.body, 'keyup', true)(e => {
            if (!e.altKey && this._keyStatus.altKey) {
                this._keyStatus.lastKeyReleased = 'alt';
            }
            else if (!e.ctrlKey && this._keyStatus.ctrlKey) {
                this._keyStatus.lastKeyReleased = 'ctrl';
            }
            else if (!e.shiftKey && this._keyStatus.shiftKey) {
                this._keyStatus.lastKeyReleased = 'shift';
            }
            else {
                this._keyStatus.lastKeyReleased = undefined;
            }
            if (this._keyStatus.lastKeyPressed !== this._keyStatus.lastKeyReleased) {
                this._keyStatus.lastKeyPressed = undefined;
            }
            this._keyStatus.altKey = e.altKey;
            this._keyStatus.ctrlKey = e.ctrlKey;
            this._keyStatus.shiftKey = e.shiftKey;
            if (this._keyStatus.lastKeyReleased) {
                this.fire(this._keyStatus);
            }
        }));
        this._subscriptions.push(domEvent(document.body, 'mousedown', true)(e => {
            this._keyStatus.lastKeyPressed = undefined;
        }));
        this._subscriptions.push(domEvent(document.body, 'mouseup', true)(e => {
            this._keyStatus.lastKeyPressed = undefined;
        }));
        this._subscriptions.push(domEvent(document.body, 'mousemove', true)(e => {
            if (e.buttons) {
                this._keyStatus.lastKeyPressed = undefined;
            }
        }));
        this._subscriptions.push(domEvent(window, 'blur')(e => {
            this._keyStatus.lastKeyPressed = undefined;
            this._keyStatus.lastKeyReleased = undefined;
            this._keyStatus.altKey = false;
            this._keyStatus.shiftKey = false;
            this._keyStatus.shiftKey = false;
            this.fire(this._keyStatus);
        }));
    }
    static getInstance() {
        if (!ModifierKeyEmitter.instance) {
            ModifierKeyEmitter.instance = new ModifierKeyEmitter();
        }
        return ModifierKeyEmitter.instance;
    }
    dispose() {
        super.dispose();
        this._subscriptions = dispose(this._subscriptions);
    }
}
//# sourceMappingURL=menubar.js.map