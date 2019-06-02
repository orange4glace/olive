/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './button.css';
import * as DOM from 'base/browser/dom';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { KeyCode } from 'base/common/keyCodes';
import { Color } from 'base/common/color';
import { mixin } from 'base/common/objects';
import { Emitter } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
import { Gesture, EventType } from 'base/browser/touch';
const defaultOptions = {
    buttonBackground: Color.fromHex('#0E639C'),
    buttonHoverBackground: Color.fromHex('#006BB3'),
    buttonForeground: Color.white
};
export class Button extends Disposable {
    constructor(container, options) {
        super();
        this._onDidClick = this._register(new Emitter());
        this.options = options || Object.create(null);
        mixin(this.options, defaultOptions, false);
        this.buttonBackground = this.options.buttonBackground;
        this.buttonHoverBackground = this.options.buttonHoverBackground;
        this.buttonForeground = this.options.buttonForeground;
        this.buttonBorder = this.options.buttonBorder;
        this._element = document.createElement('a');
        DOM.addClass(this._element, 'monaco-button');
        this._element.tabIndex = 0;
        this._element.setAttribute('role', 'button');
        container.appendChild(this._element);
        Gesture.addTarget(this._element);
        [DOM.EventType.CLICK, EventType.Tap].forEach(eventType => {
            this._register(DOM.addDisposableListener(this._element, eventType, e => {
                if (!this.enabled) {
                    DOM.EventHelper.stop(e);
                    return;
                }
                this._onDidClick.fire(e);
            }));
        });
        this._register(DOM.addDisposableListener(this._element, DOM.EventType.KEY_DOWN, e => {
            const event = new StandardKeyboardEvent(e);
            let eventHandled = false;
            if (this.enabled && event.equals(KeyCode.Enter) || event.equals(KeyCode.Space)) {
                this._onDidClick.fire(e);
                eventHandled = true;
            }
            else if (event.equals(KeyCode.Escape)) {
                this._element.blur();
                eventHandled = true;
            }
            if (eventHandled) {
                DOM.EventHelper.stop(event, true);
            }
        }));
        this._register(DOM.addDisposableListener(this._element, DOM.EventType.MOUSE_OVER, e => {
            if (!DOM.hasClass(this._element, 'disabled')) {
                this.setHoverBackground();
            }
        }));
        this._register(DOM.addDisposableListener(this._element, DOM.EventType.MOUSE_OUT, e => {
            this.applyStyles(); // restore standard styles
        }));
        // Also set hover background when button is focused for feedback
        this.focusTracker = this._register(DOM.trackFocus(this._element));
        this._register(this.focusTracker.onDidFocus(() => this.setHoverBackground()));
        this._register(this.focusTracker.onDidBlur(() => this.applyStyles())); // restore standard styles
        this.applyStyles();
    }
    get onDidClick() { return this._onDidClick.event; }
    setHoverBackground() {
        const hoverBackground = this.buttonHoverBackground ? this.buttonHoverBackground.toString() : null;
        if (hoverBackground) {
            this._element.style.backgroundColor = hoverBackground;
        }
    }
    style(styles) {
        this.buttonForeground = styles.buttonForeground;
        this.buttonBackground = styles.buttonBackground;
        this.buttonHoverBackground = styles.buttonHoverBackground;
        this.buttonBorder = styles.buttonBorder;
        this.applyStyles();
    }
    applyStyles() {
        if (this._element) {
            const background = this.buttonBackground ? this.buttonBackground.toString() : null;
            const foreground = this.buttonForeground ? this.buttonForeground.toString() : null;
            const border = this.buttonBorder ? this.buttonBorder.toString() : null;
            this._element.style.color = foreground;
            this._element.style.backgroundColor = background;
            this._element.style.borderWidth = border ? '1px' : null;
            this._element.style.borderStyle = border ? 'solid' : null;
            this._element.style.borderColor = border;
        }
    }
    get element() {
        return this._element;
    }
    set label(value) {
        if (!DOM.hasClass(this._element, 'monaco-text-button')) {
            DOM.addClass(this._element, 'monaco-text-button');
        }
        this._element.textContent = value;
        if (this.options.title) {
            this._element.title = value;
        }
    }
    set icon(iconClassName) {
        DOM.addClass(this._element, iconClassName);
    }
    set enabled(value) {
        if (value) {
            DOM.removeClass(this._element, 'disabled');
            this._element.setAttribute('aria-disabled', String(false));
            this._element.tabIndex = 0;
        }
        else {
            DOM.addClass(this._element, 'disabled');
            this._element.setAttribute('aria-disabled', String(true));
            DOM.removeTabIndexAndUpdateFocus(this._element);
        }
    }
    get enabled() {
        return !DOM.hasClass(this._element, 'disabled');
    }
    focus() {
        this._element.focus();
    }
}
export class ButtonGroup extends Disposable {
    constructor(container, count, options) {
        super();
        this._buttons = [];
        this.create(container, count, options);
    }
    get buttons() {
        return this._buttons;
    }
    create(container, count, options) {
        for (let index = 0; index < count; index++) {
            const button = this._register(new Button(container, options));
            this._buttons.push(button);
            // Implement keyboard access in buttons if there are multiple
            if (count > 1) {
                this._register(DOM.addDisposableListener(button.element, DOM.EventType.KEY_DOWN, e => {
                    const event = new StandardKeyboardEvent(e);
                    let eventHandled = true;
                    // Next / Previous Button
                    let buttonIndexToFocus;
                    if (event.equals(KeyCode.LeftArrow)) {
                        buttonIndexToFocus = index > 0 ? index - 1 : this._buttons.length - 1;
                    }
                    else if (event.equals(KeyCode.RightArrow)) {
                        buttonIndexToFocus = index === this._buttons.length - 1 ? 0 : index + 1;
                    }
                    else {
                        eventHandled = false;
                    }
                    if (eventHandled && typeof buttonIndexToFocus === 'number') {
                        this._buttons[buttonIndexToFocus].focus();
                        DOM.EventHelper.stop(e, true);
                    }
                }));
            }
        }
    }
}
//# sourceMappingURL=button.js.map