/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './inputBox.css';
import * as nls from 'nls';
import * as Bal from 'base/browser/browser';
import * as dom from 'base/browser/dom';
import { renderFormattedText, renderText } from 'base/browser/htmlContentRenderer';
import * as aria from 'base/browser/ui/aria/aria';
import { ActionBar } from 'base/browser/ui/actionbar/actionbar';
import { AnchorAlignment } from 'base/browser/ui/contextview/contextview';
import { Emitter } from 'base/common/event';
import { Widget } from 'base/browser/ui/widget';
import { Color } from 'base/common/color';
import { mixin } from 'base/common/objects';
import { HistoryNavigator } from 'base/common/history';
const $ = dom.$;
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["INFO"] = 1] = "INFO";
    MessageType[MessageType["WARNING"] = 2] = "WARNING";
    MessageType[MessageType["ERROR"] = 3] = "ERROR";
})(MessageType || (MessageType = {}));
const defaultOpts = {
    inputBackground: Color.fromHex('#3C3C3C'),
    inputForeground: Color.fromHex('#CCCCCC'),
    inputValidationInfoBorder: Color.fromHex('#55AAFF'),
    inputValidationInfoBackground: Color.fromHex('#063B49'),
    inputValidationWarningBorder: Color.fromHex('#B89500'),
    inputValidationWarningBackground: Color.fromHex('#352A05'),
    inputValidationErrorBorder: Color.fromHex('#BE1100'),
    inputValidationErrorBackground: Color.fromHex('#5A1D1D')
};
export class InputBox extends Widget {
    constructor(container, contextViewProvider, options) {
        super();
        this.state = 'idle';
        this._onDidChange = this._register(new Emitter());
        this.onDidChange = this._onDidChange.event;
        this._onDidHeightChange = this._register(new Emitter());
        this.onDidHeightChange = this._onDidHeightChange.event;
        this.contextViewProvider = contextViewProvider;
        this.options = options || Object.create(null);
        mixin(this.options, defaultOpts, false);
        this.message = null;
        this.cachedHeight = null;
        this.placeholder = this.options.placeholder || '';
        this.ariaLabel = this.options.ariaLabel || '';
        this.inputBackground = this.options.inputBackground;
        this.inputForeground = this.options.inputForeground;
        this.inputBorder = this.options.inputBorder;
        this.inputValidationInfoBorder = this.options.inputValidationInfoBorder;
        this.inputValidationInfoBackground = this.options.inputValidationInfoBackground;
        this.inputValidationInfoForeground = this.options.inputValidationInfoForeground;
        this.inputValidationWarningBorder = this.options.inputValidationWarningBorder;
        this.inputValidationWarningBackground = this.options.inputValidationWarningBackground;
        this.inputValidationWarningForeground = this.options.inputValidationWarningForeground;
        this.inputValidationErrorBorder = this.options.inputValidationErrorBorder;
        this.inputValidationErrorBackground = this.options.inputValidationErrorBackground;
        this.inputValidationErrorForeground = this.options.inputValidationErrorForeground;
        if (this.options.validationOptions) {
            this.validation = this.options.validationOptions.validation;
        }
        this.element = dom.append(container, $('.monaco-inputbox.idle'));
        let tagName = this.options.flexibleHeight ? 'textarea' : 'input';
        let wrapper = dom.append(this.element, $('.wrapper'));
        this.input = dom.append(wrapper, $(tagName + '.input'));
        this.input.setAttribute('autocorrect', 'off');
        this.input.setAttribute('autocapitalize', 'off');
        this.input.setAttribute('spellcheck', 'false');
        this.onfocus(this.input, () => dom.addClass(this.element, 'synthetic-focus'));
        this.onblur(this.input, () => dom.removeClass(this.element, 'synthetic-focus'));
        if (this.options.flexibleHeight) {
            this.mirror = dom.append(wrapper, $('div.mirror'));
            this.mirror.innerHTML = '&nbsp;';
        }
        else {
            this.input.type = this.options.type || 'text';
            this.input.setAttribute('wrap', 'off');
        }
        if (this.ariaLabel) {
            this.input.setAttribute('aria-label', this.ariaLabel);
        }
        if (this.placeholder) {
            this.setPlaceHolder(this.placeholder);
        }
        this.oninput(this.input, () => this.onValueChange());
        this.onblur(this.input, () => this.onBlur());
        this.onfocus(this.input, () => this.onFocus());
        // Add placeholder shim for IE because IE decides to hide the placeholder on focus (we dont want that!)
        if (this.placeholder && Bal.isIE) {
            this.onclick(this.input, (e) => {
                dom.EventHelper.stop(e, true);
                this.input.focus();
            });
        }
        setTimeout(() => {
            if (!this.input) {
                return;
            }
            this.updateMirror();
        }, 0);
        // Support actions
        if (this.options.actions) {
            this.actionbar = this._register(new ActionBar(this.element));
            this.actionbar.push(this.options.actions, { icon: true, label: false });
        }
        this.applyStyles();
    }
    onBlur() {
        this._hideMessage();
    }
    onFocus() {
        this._showMessage();
    }
    setPlaceHolder(placeHolder) {
        if (this.input) {
            this.input.setAttribute('placeholder', placeHolder);
            this.input.title = placeHolder;
        }
    }
    setAriaLabel(label) {
        this.ariaLabel = label;
        if (this.input) {
            if (label) {
                this.input.setAttribute('aria-label', this.ariaLabel);
            }
            else {
                this.input.removeAttribute('aria-label');
            }
        }
    }
    get mirrorElement() {
        return this.mirror;
    }
    get inputElement() {
        return this.input;
    }
    get value() {
        return this.input.value;
    }
    set value(newValue) {
        if (this.input.value !== newValue) {
            this.input.value = newValue;
            this.onValueChange();
        }
    }
    get height() {
        return this.cachedHeight === null ? dom.getTotalHeight(this.element) : this.cachedHeight;
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    hasFocus() {
        return document.activeElement === this.input;
    }
    select(range = null) {
        this.input.select();
        if (range) {
            this.input.setSelectionRange(range.start, range.end);
        }
    }
    enable() {
        this.input.removeAttribute('disabled');
    }
    disable() {
        this.input.disabled = true;
        this._hideMessage();
    }
    setEnabled(enabled) {
        if (enabled) {
            this.enable();
        }
        else {
            this.disable();
        }
    }
    get width() {
        return dom.getTotalWidth(this.input);
    }
    set width(width) {
        this.input.style.width = width + 'px';
        if (this.mirror) {
            this.mirror.style.width = width + 'px';
        }
    }
    showMessage(message, force) {
        this.message = message;
        dom.removeClass(this.element, 'idle');
        dom.removeClass(this.element, 'info');
        dom.removeClass(this.element, 'warning');
        dom.removeClass(this.element, 'error');
        dom.addClass(this.element, this.classForType(message.type));
        const styles = this.stylesForType(this.message.type);
        this.element.style.border = styles.border ? `1px solid ${styles.border}` : null;
        // ARIA Support
        let alertText;
        if (message.type === MessageType.ERROR) {
            alertText = nls.localize('alertErrorMessage', "Error: {0}", message.content);
        }
        else if (message.type === MessageType.WARNING) {
            alertText = nls.localize('alertWarningMessage', "Warning: {0}", message.content);
        }
        else {
            alertText = nls.localize('alertInfoMessage', "Info: {0}", message.content);
        }
        aria.alert(alertText);
        if (this.hasFocus() || force) {
            this._showMessage();
        }
    }
    hideMessage() {
        this.message = null;
        dom.removeClass(this.element, 'info');
        dom.removeClass(this.element, 'warning');
        dom.removeClass(this.element, 'error');
        dom.addClass(this.element, 'idle');
        this._hideMessage();
        this.applyStyles();
    }
    isInputValid() {
        return !!this.validation && !this.validation(this.value);
    }
    validate() {
        let errorMsg = null;
        if (this.validation) {
            errorMsg = this.validation(this.value);
            if (errorMsg) {
                this.inputElement.setAttribute('aria-invalid', 'true');
                this.showMessage(errorMsg);
            }
            else if (this.inputElement.hasAttribute('aria-invalid')) {
                this.inputElement.removeAttribute('aria-invalid');
                this.hideMessage();
            }
        }
        return !errorMsg;
    }
    stylesForType(type) {
        switch (type) {
            case MessageType.INFO: return { border: this.inputValidationInfoBorder, background: this.inputValidationInfoBackground, foreground: this.inputValidationInfoForeground };
            case MessageType.WARNING: return { border: this.inputValidationWarningBorder, background: this.inputValidationWarningBackground, foreground: this.inputValidationWarningForeground };
            default: return { border: this.inputValidationErrorBorder, background: this.inputValidationErrorBackground, foreground: this.inputValidationErrorForeground };
        }
    }
    classForType(type) {
        switch (type) {
            case MessageType.INFO: return 'info';
            case MessageType.WARNING: return 'warning';
            default: return 'error';
        }
    }
    _showMessage() {
        if (!this.contextViewProvider || !this.message) {
            return;
        }
        let div;
        let layout = () => div.style.width = dom.getTotalWidth(this.element) + 'px';
        this.state = 'open';
        this.contextViewProvider.showContextView({
            getAnchor: () => this.element,
            anchorAlignment: AnchorAlignment.RIGHT,
            render: (container) => {
                if (!this.message) {
                    return null;
                }
                div = dom.append(container, $('.monaco-inputbox-container'));
                layout();
                const renderOptions = {
                    inline: true,
                    className: 'monaco-inputbox-message'
                };
                const spanElement = (this.message.formatContent
                    ? renderFormattedText(this.message.content, renderOptions)
                    : renderText(this.message.content, renderOptions));
                dom.addClass(spanElement, this.classForType(this.message.type));
                const styles = this.stylesForType(this.message.type);
                spanElement.style.backgroundColor = styles.background ? styles.background.toString() : null;
                spanElement.style.color = styles.foreground ? styles.foreground.toString() : null;
                spanElement.style.border = styles.border ? `1px solid ${styles.border}` : null;
                dom.append(div, spanElement);
                return null;
            },
            layout: layout
        });
    }
    _hideMessage() {
        if (!this.contextViewProvider || this.state !== 'open') {
            return;
        }
        this.state = 'idle';
        this.contextViewProvider.hideContextView();
    }
    onValueChange() {
        this._onDidChange.fire(this.value);
        this.validate();
        this.updateMirror();
        if (this.state === 'open' && this.contextViewProvider) {
            this.contextViewProvider.layout();
        }
    }
    updateMirror() {
        if (!this.mirror) {
            return;
        }
        const value = this.value || this.placeholder;
        const lastCharCode = value.charCodeAt(value.length - 1);
        const suffix = lastCharCode === 10 ? ' ' : '';
        const mirrorTextContent = value + suffix;
        if (mirrorTextContent) {
            this.mirror.textContent = value + suffix;
        }
        else {
            this.mirror.innerHTML = '&nbsp;';
        }
        this.layout();
    }
    style(styles) {
        this.inputBackground = styles.inputBackground;
        this.inputForeground = styles.inputForeground;
        this.inputBorder = styles.inputBorder;
        this.inputValidationInfoBackground = styles.inputValidationInfoBackground;
        this.inputValidationInfoForeground = styles.inputValidationInfoForeground;
        this.inputValidationInfoBorder = styles.inputValidationInfoBorder;
        this.inputValidationWarningBackground = styles.inputValidationWarningBackground;
        this.inputValidationWarningForeground = styles.inputValidationWarningForeground;
        this.inputValidationWarningBorder = styles.inputValidationWarningBorder;
        this.inputValidationErrorBackground = styles.inputValidationErrorBackground;
        this.inputValidationErrorForeground = styles.inputValidationErrorForeground;
        this.inputValidationErrorBorder = styles.inputValidationErrorBorder;
        this.applyStyles();
    }
    applyStyles() {
        if (this.element) {
            const background = this.inputBackground ? this.inputBackground.toString() : null;
            const foreground = this.inputForeground ? this.inputForeground.toString() : null;
            const border = this.inputBorder ? this.inputBorder.toString() : null;
            this.element.style.backgroundColor = background;
            this.element.style.color = foreground;
            this.input.style.backgroundColor = background;
            this.input.style.color = foreground;
            this.element.style.borderWidth = border ? '1px' : null;
            this.element.style.borderStyle = border ? 'solid' : null;
            this.element.style.borderColor = border;
        }
    }
    layout() {
        if (!this.mirror) {
            return;
        }
        const previousHeight = this.cachedHeight;
        this.cachedHeight = dom.getTotalHeight(this.mirror);
        if (previousHeight !== this.cachedHeight) {
            this.input.style.height = this.cachedHeight + 'px';
            this._onDidHeightChange.fire(this.cachedHeight);
        }
    }
    dispose() {
        this._hideMessage();
        this.element = null; // StrictNullOverride: nulling out ok in dispose
        this.input = null; // StrictNullOverride: nulling out ok in dispose
        this.contextViewProvider = undefined;
        this.message = null;
        this.validation = undefined;
        this.state = null;
        this.actionbar = undefined;
        super.dispose();
    }
}
export class HistoryInputBox extends InputBox {
    constructor(container, contextViewProvider, options) {
        super(container, contextViewProvider, options);
        this.history = new HistoryNavigator(options.history, 100);
    }
    addToHistory() {
        if (this.value && this.value !== this.getCurrentValue()) {
            this.history.add(this.value);
        }
    }
    getHistory() {
        return this.history.getHistory();
    }
    showNextValue() {
        if (!this.history.has(this.value)) {
            this.addToHistory();
        }
        let next = this.getNextValue();
        if (next) {
            next = next === this.value ? this.getNextValue() : next;
        }
        if (next) {
            this.value = next;
            aria.status(this.value);
        }
    }
    showPreviousValue() {
        if (!this.history.has(this.value)) {
            this.addToHistory();
        }
        let previous = this.getPreviousValue();
        if (previous) {
            previous = previous === this.value ? this.getPreviousValue() : previous;
        }
        if (previous) {
            this.value = previous;
            aria.status(this.value);
        }
    }
    clearHistory() {
        this.history.clear();
    }
    getCurrentValue() {
        let currentValue = this.history.current();
        if (!currentValue) {
            currentValue = this.history.last();
            this.history.next();
        }
        return currentValue;
    }
    getPreviousValue() {
        return this.history.previous() || this.history.first();
    }
    getNextValue() {
        return this.history.next() || this.history.last();
    }
}
//# sourceMappingURL=inputBox.js.map