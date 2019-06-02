/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './actionbar.css';
import * as platform from 'base/common/platform';
import * as nls from 'nls';
import { Disposable, dispose } from 'base/common/lifecycle';
import { SelectBox } from 'base/browser/ui/selectBox/selectBox';
import { Action, ActionRunner } from 'base/common/actions';
import * as DOM from 'base/browser/dom';
import * as types from 'base/common/types';
import { EventType, Gesture } from 'base/browser/touch';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { KeyCode, KeyMod } from 'base/common/keyCodes';
import { Emitter } from 'base/common/event';
import { asArray } from 'base/common/arrays';
export class BaseActionItem extends Disposable {
    constructor(context, action, options) {
        super();
        this.options = options;
        this._context = context || this;
        this._action = action;
        if (action instanceof Action) {
            this._register(action.onDidChange(event => {
                if (!this.element) {
                    // we have not been rendered yet, so there
                    // is no point in updating the UI
                    return;
                }
                this.handleActionChangeEvent(event);
            }));
        }
    }
    handleActionChangeEvent(event) {
        if (event.enabled !== undefined) {
            this.updateEnabled();
        }
        if (event.checked !== undefined) {
            this.updateChecked();
        }
        if (event.class !== undefined) {
            this.updateClass();
        }
        if (event.label !== undefined) {
            this.updateLabel();
            this.updateTooltip();
        }
        if (event.tooltip !== undefined) {
            this.updateTooltip();
        }
    }
    set actionRunner(actionRunner) {
        this._actionRunner = actionRunner;
    }
    get actionRunner() {
        return this._actionRunner;
    }
    getAction() {
        return this._action;
    }
    isEnabled() {
        return this._action.enabled;
    }
    setActionContext(newContext) {
        this._context = newContext;
    }
    render(container) {
        this.element = container;
        Gesture.addTarget(container);
        const enableDragging = this.options && this.options.draggable;
        if (enableDragging) {
            container.draggable = true;
        }
        this._register(DOM.addDisposableListener(this.element, EventType.Tap, e => this.onClick(e)));
        this._register(DOM.addDisposableListener(this.element, DOM.EventType.MOUSE_DOWN, e => {
            if (!enableDragging) {
                DOM.EventHelper.stop(e, true); // do not run when dragging is on because that would disable it
            }
            if (this._action.enabled && e.button === 0 && this.element) {
                DOM.addClass(this.element, 'active');
            }
        }));
        this._register(DOM.addDisposableListener(this.element, DOM.EventType.CLICK, e => {
            DOM.EventHelper.stop(e, true);
            // See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard
            // > Writing to the clipboard
            // > You can use the "cut" and "copy" commands without any special
            // permission if you are using them in a short-lived event handler
            // for a user action (for example, a click handler).
            // => to get the Copy and Paste context menu actions working on Firefox,
            // there should be no timeout here
            if (this.options && this.options.isMenu) {
                this.onClick(e);
            }
            else {
                platform.setImmediate(() => this.onClick(e));
            }
        }));
        this._register(DOM.addDisposableListener(this.element, DOM.EventType.DBLCLICK, e => {
            DOM.EventHelper.stop(e, true);
        }));
        [DOM.EventType.MOUSE_UP, DOM.EventType.MOUSE_OUT].forEach(event => {
            this._register(DOM.addDisposableListener(this.element, event, e => {
                DOM.EventHelper.stop(e);
                DOM.removeClass(this.element, 'active');
            }));
        });
    }
    onClick(event) {
        DOM.EventHelper.stop(event, true);
        let context;
        if (types.isUndefinedOrNull(this._context)) {
            context = event;
        }
        else {
            context = this._context;
            if (types.isObject(context)) {
                context.event = event;
            }
        }
        this._actionRunner.run(this._action, context);
    }
    focus() {
        if (this.element) {
            this.element.focus();
            DOM.addClass(this.element, 'focused');
        }
    }
    blur() {
        if (this.element) {
            this.element.blur();
            DOM.removeClass(this.element, 'focused');
        }
    }
    updateEnabled() {
        // implement in subclass
    }
    updateLabel() {
        // implement in subclass
    }
    updateTooltip() {
        // implement in subclass
    }
    updateClass() {
        // implement in subclass
    }
    updateChecked() {
        // implement in subclass
    }
    dispose() {
        if (this.element) {
            DOM.removeNode(this.element);
            this.element = undefined;
        }
        super.dispose();
    }
}
export class Separator extends Action {
    constructor(label) {
        super(Separator.ID, label, label ? 'separator text' : 'separator');
        this.checked = false;
        this.radio = false;
        this.enabled = false;
    }
}
Separator.ID = 'vs.actions.separator';
export class ActionItem extends BaseActionItem {
    constructor(context, action, options = {}) {
        super(context, action, options);
        this.options = options;
        this.options.icon = options.icon !== undefined ? options.icon : false;
        this.options.label = options.label !== undefined ? options.label : true;
        this.cssClass = '';
    }
    render(container) {
        super.render(container);
        if (this.element) {
            this.label = DOM.append(this.element, DOM.$('a.action-label'));
        }
        if (this._action.id === Separator.ID) {
            this.label.setAttribute('role', 'presentation'); // A separator is a presentation item
        }
        else {
            if (this.options.isMenu) {
                this.label.setAttribute('role', 'menuitem');
            }
            else {
                this.label.setAttribute('role', 'button');
            }
        }
        if (this.options.label && this.options.keybinding && this.element) {
        }
        this.updateClass();
        this.updateLabel();
        this.updateTooltip();
        this.updateEnabled();
        this.updateChecked();
    }
    focus() {
        super.focus();
        this.label.focus();
    }
    updateLabel() {
        if (this.options.label) {
            this.label.textContent = this.getAction().label;
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
            this.label.title = title;
        }
    }
    updateClass() {
        if (this.cssClass) {
            DOM.removeClasses(this.label, this.cssClass);
        }
        if (this.options.icon) {
            this.cssClass = this.getAction().class;
            DOM.addClass(this.label, 'icon');
            if (this.cssClass) {
                DOM.addClasses(this.label, this.cssClass);
            }
            this.updateEnabled();
        }
        else {
            DOM.removeClass(this.label, 'icon');
        }
    }
    updateEnabled() {
        if (this.getAction().enabled) {
            this.label.removeAttribute('aria-disabled');
            if (this.element) {
                DOM.removeClass(this.element, 'disabled');
            }
            DOM.removeClass(this.label, 'disabled');
            this.label.tabIndex = 0;
        }
        else {
            this.label.setAttribute('aria-disabled', 'true');
            if (this.element) {
                DOM.addClass(this.element, 'disabled');
            }
            DOM.addClass(this.label, 'disabled');
            DOM.removeTabIndexAndUpdateFocus(this.label);
        }
    }
    updateChecked() {
        if (this.getAction().checked) {
            DOM.addClass(this.label, 'checked');
        }
        else {
            DOM.removeClass(this.label, 'checked');
        }
    }
}
export var ActionsOrientation;
(function (ActionsOrientation) {
    ActionsOrientation[ActionsOrientation["HORIZONTAL"] = 0] = "HORIZONTAL";
    ActionsOrientation[ActionsOrientation["HORIZONTAL_REVERSE"] = 1] = "HORIZONTAL_REVERSE";
    ActionsOrientation[ActionsOrientation["VERTICAL"] = 2] = "VERTICAL";
    ActionsOrientation[ActionsOrientation["VERTICAL_REVERSE"] = 3] = "VERTICAL_REVERSE";
})(ActionsOrientation || (ActionsOrientation = {}));
const defaultOptions = {
    orientation: ActionsOrientation.HORIZONTAL,
    context: null,
    triggerKeys: {
        keys: [KeyCode.Enter, KeyCode.Space],
        keyDown: false
    }
};
export class ActionBar extends Disposable {
    constructor(container, options = defaultOptions) {
        super();
        this._onDidBlur = this._register(new Emitter());
        this._onDidCancel = this._register(new Emitter());
        this._onDidRun = this._register(new Emitter());
        this._onDidBeforeRun = this._register(new Emitter());
        this.options = options;
        this._context = options.context;
        if (!this.options.triggerKeys) {
            this.options.triggerKeys = defaultOptions.triggerKeys;
        }
        if (this.options.actionRunner) {
            this._actionRunner = this.options.actionRunner;
        }
        else {
            this._actionRunner = new ActionRunner();
            this._register(this._actionRunner);
        }
        this._register(this._actionRunner.onDidRun(e => this._onDidRun.fire(e)));
        this._register(this._actionRunner.onDidBeforeRun(e => this._onDidBeforeRun.fire(e)));
        this.items = [];
        this.focusedItem = undefined;
        this.domNode = document.createElement('div');
        this.domNode.className = 'monaco-action-bar';
        if (options.animated !== false) {
            DOM.addClass(this.domNode, 'animated');
        }
        let previousKey;
        let nextKey;
        switch (this.options.orientation) {
            case ActionsOrientation.HORIZONTAL:
                previousKey = KeyCode.LeftArrow;
                nextKey = KeyCode.RightArrow;
                break;
            case ActionsOrientation.HORIZONTAL_REVERSE:
                previousKey = KeyCode.RightArrow;
                nextKey = KeyCode.LeftArrow;
                this.domNode.className += ' reverse';
                break;
            case ActionsOrientation.VERTICAL:
                previousKey = KeyCode.UpArrow;
                nextKey = KeyCode.DownArrow;
                this.domNode.className += ' vertical';
                break;
            case ActionsOrientation.VERTICAL_REVERSE:
                previousKey = KeyCode.DownArrow;
                nextKey = KeyCode.UpArrow;
                this.domNode.className += ' vertical reverse';
                break;
        }
        this._register(DOM.addDisposableListener(this.domNode, DOM.EventType.KEY_DOWN, e => {
            const event = new StandardKeyboardEvent(e);
            let eventHandled = true;
            if (event.equals(previousKey)) {
                this.focusPrevious();
            }
            else if (event.equals(nextKey)) {
                this.focusNext();
            }
            else if (event.equals(KeyCode.Escape)) {
                this.cancel();
            }
            else if (this.isTriggerKeyEvent(event)) {
                // Staying out of the else branch even if not triggered
                if (this.options.triggerKeys && this.options.triggerKeys.keyDown) {
                    this.doTrigger(event);
                }
            }
            else {
                eventHandled = false;
            }
            if (eventHandled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }));
        this._register(DOM.addDisposableListener(this.domNode, DOM.EventType.KEY_UP, e => {
            const event = new StandardKeyboardEvent(e);
            // Run action on Enter/Space
            if (this.isTriggerKeyEvent(event)) {
                if (this.options.triggerKeys && !this.options.triggerKeys.keyDown) {
                    this.doTrigger(event);
                }
                event.preventDefault();
                event.stopPropagation();
            }
            // Recompute focused item
            else if (event.equals(KeyCode.Tab) || event.equals(KeyMod.Shift | KeyCode.Tab)) {
                this.updateFocusedItem();
            }
        }));
        this.focusTracker = this._register(DOM.trackFocus(this.domNode));
        this._register(this.focusTracker.onDidBlur(() => {
            if (document.activeElement === this.domNode || !DOM.isAncestor(document.activeElement, this.domNode)) {
                this._onDidBlur.fire();
                this.focusedItem = undefined;
            }
        }));
        this._register(this.focusTracker.onDidFocus(() => this.updateFocusedItem()));
        this.actionsList = document.createElement('ul');
        this.actionsList.className = 'actions-container';
        this.actionsList.setAttribute('role', 'toolbar');
        if (this.options.ariaLabel) {
            this.actionsList.setAttribute('aria-label', this.options.ariaLabel);
        }
        this.domNode.appendChild(this.actionsList);
        container.appendChild(this.domNode);
    }
    get onDidBlur() { return this._onDidBlur.event; }
    get onDidCancel() { return this._onDidCancel.event; }
    get onDidRun() { return this._onDidRun.event; }
    get onDidBeforeRun() { return this._onDidBeforeRun.event; }
    setAriaLabel(label) {
        if (label) {
            this.actionsList.setAttribute('aria-label', label);
        }
        else {
            this.actionsList.removeAttribute('aria-label');
        }
    }
    isTriggerKeyEvent(event) {
        let ret = false;
        if (this.options.triggerKeys) {
            this.options.triggerKeys.keys.forEach(keyCode => {
                ret = ret || event.equals(keyCode);
            });
        }
        return ret;
    }
    updateFocusedItem() {
        for (let i = 0; i < this.actionsList.children.length; i++) {
            const elem = this.actionsList.children[i];
            if (DOM.isAncestor(document.activeElement, elem)) {
                this.focusedItem = i;
                break;
            }
        }
    }
    get context() {
        return this._context;
    }
    set context(context) {
        this._context = context;
        this.items.forEach(i => i.setActionContext(context));
    }
    get actionRunner() {
        return this._actionRunner;
    }
    set actionRunner(actionRunner) {
        if (actionRunner) {
            this._actionRunner = actionRunner;
            this.items.forEach(item => item.actionRunner = actionRunner);
        }
    }
    getContainer() {
        return this.domNode;
    }
    push(arg, options = {}) {
        const actions = asArray(arg);
        let index = types.isNumber(options.index) ? options.index : null;
        actions.forEach((action) => {
            const actionItemElement = document.createElement('li');
            actionItemElement.className = 'action-item';
            actionItemElement.setAttribute('role', 'presentation');
            // Prevent native context menu on actions
            this._register(DOM.addDisposableListener(actionItemElement, DOM.EventType.CONTEXT_MENU, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }));
            let item;
            if (this.options.actionItemProvider) {
                item = this.options.actionItemProvider(action);
            }
            if (!item) {
                item = new ActionItem(this.context, action, options);
            }
            item.actionRunner = this._actionRunner;
            item.setActionContext(this.context);
            item.render(actionItemElement);
            if (index === null || index < 0 || index >= this.actionsList.children.length) {
                this.actionsList.appendChild(actionItemElement);
                this.items.push(item);
            }
            else {
                this.actionsList.insertBefore(actionItemElement, this.actionsList.children[index]);
                this.items.splice(index, 0, item);
                index++;
            }
        });
    }
    getWidth(index) {
        if (index >= 0 && index < this.actionsList.children.length) {
            const item = this.actionsList.children.item(index);
            if (item) {
                return item.clientWidth;
            }
        }
        return 0;
    }
    getHeight(index) {
        if (index >= 0 && index < this.actionsList.children.length) {
            const item = this.actionsList.children.item(index);
            if (item) {
                return item.clientHeight;
            }
        }
        return 0;
    }
    pull(index) {
        if (index >= 0 && index < this.items.length) {
            this.actionsList.removeChild(this.actionsList.childNodes[index]);
            dispose(this.items.splice(index, 1));
        }
    }
    clear() {
        this.items = dispose(this.items);
        DOM.clearNode(this.actionsList);
    }
    length() {
        return this.items.length;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    focus(arg) {
        let selectFirst = false;
        let index = undefined;
        if (arg === undefined) {
            selectFirst = true;
        }
        else if (typeof arg === 'number') {
            index = arg;
        }
        else if (typeof arg === 'boolean') {
            selectFirst = arg;
        }
        if (selectFirst && typeof this.focusedItem === 'undefined') {
            // Focus the first enabled item
            this.focusedItem = this.items.length - 1;
            this.focusNext();
        }
        else {
            if (index !== undefined) {
                this.focusedItem = index;
            }
            this.updateFocus();
        }
    }
    focusNext() {
        if (typeof this.focusedItem === 'undefined') {
            this.focusedItem = this.items.length - 1;
        }
        const startIndex = this.focusedItem;
        let item;
        do {
            this.focusedItem = (this.focusedItem + 1) % this.items.length;
            item = this.items[this.focusedItem];
        } while (this.focusedItem !== startIndex && !item.isEnabled());
        if (this.focusedItem === startIndex && !item.isEnabled()) {
            this.focusedItem = undefined;
        }
        this.updateFocus();
    }
    focusPrevious() {
        if (typeof this.focusedItem === 'undefined') {
            this.focusedItem = 0;
        }
        const startIndex = this.focusedItem;
        let item;
        do {
            this.focusedItem = this.focusedItem - 1;
            if (this.focusedItem < 0) {
                this.focusedItem = this.items.length - 1;
            }
            item = this.items[this.focusedItem];
        } while (this.focusedItem !== startIndex && !item.isEnabled());
        if (this.focusedItem === startIndex && !item.isEnabled()) {
            this.focusedItem = undefined;
        }
        this.updateFocus(true);
    }
    updateFocus(fromRight) {
        if (typeof this.focusedItem === 'undefined') {
            this.actionsList.focus();
        }
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const actionItem = item;
            if (i === this.focusedItem) {
                if (types.isFunction(actionItem.isEnabled)) {
                    if (actionItem.isEnabled() && types.isFunction(actionItem.focus)) {
                        actionItem.focus(fromRight);
                    }
                    else {
                        this.actionsList.focus();
                    }
                }
            }
            else {
                if (types.isFunction(actionItem.blur)) {
                    actionItem.blur();
                }
            }
        }
    }
    doTrigger(event) {
        if (typeof this.focusedItem === 'undefined') {
            return; //nothing to focus
        }
        // trigger action
        const actionItem = this.items[this.focusedItem];
        if (actionItem instanceof BaseActionItem) {
            const context = (actionItem._context === null || actionItem._context === undefined) ? event : actionItem._context;
            this.run(actionItem._action, context);
        }
    }
    cancel() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur(); // remove focus from focused action
        }
        this._onDidCancel.fire();
    }
    run(action, context) {
        return this._actionRunner.run(action, context);
    }
    dispose() {
        dispose(this.items);
        this.items = [];
        DOM.removeNode(this.getContainer());
        super.dispose();
    }
}
export class SelectActionItem extends BaseActionItem {
    constructor(ctx, action, options, selected, contextViewProvider, selectBoxOptions) {
        super(ctx, action);
        this.selectBox = new SelectBox(options, selected, contextViewProvider, undefined, selectBoxOptions);
        this._register(this.selectBox);
        this.registerListeners();
    }
    setOptions(options, selected) {
        this.selectBox.setOptions(options, selected);
    }
    select(index) {
        this.selectBox.select(index);
    }
    registerListeners() {
        this._register(this.selectBox.onDidSelect(e => {
            this.actionRunner.run(this._action, this.getActionContext(e.selected, e.index));
        }));
    }
    getActionContext(option, index) {
        return option;
    }
    focus() {
        if (this.selectBox) {
            this.selectBox.focus();
        }
    }
    blur() {
        if (this.selectBox) {
            this.selectBox.blur();
        }
    }
    render(container) {
        this.selectBox.render(container);
    }
}
//# sourceMappingURL=actionbar.js.map