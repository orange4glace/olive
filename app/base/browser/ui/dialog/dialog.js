/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './dialog.css';
import * as nls from 'nls';
import { Disposable } from 'base/common/lifecycle';
import { $, hide, show, EventHelper, clearNode, removeClasses, addClass, removeNode } from 'base/browser/dom';
import { domEvent } from 'base/browser/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { KeyCode, KeyMod } from 'base/common/keyCodes';
import { ButtonGroup } from 'base/browser/ui/button/button';
import { ActionBar } from 'base/browser/ui/actionbar/actionbar';
import { Action } from 'base/common/actions';
import { mnemonicButtonLabel } from 'base/common/labels';
export class Dialog extends Disposable {
    constructor(container, message, buttons, options) {
        super();
        this.container = container;
        this.message = message;
        this.buttons = buttons;
        this.options = options;
        this.modal = this.container.appendChild($(`.dialog-modal-block${options.type === 'pending' ? '.dimmed' : ''}`));
        this.element = this.modal.appendChild($('.dialog-box'));
        hide(this.element);
        const buttonsRowElement = this.element.appendChild($('.dialog-buttons-row'));
        this.buttonsContainer = buttonsRowElement.appendChild($('.dialog-buttons'));
        const messageRowElement = this.element.appendChild($('.dialog-message-row'));
        this.iconElement = messageRowElement.appendChild($('.dialog-icon'));
        const messageContainer = messageRowElement.appendChild($('.dialog-message-container'));
        if (this.options.detail) {
            const messageElement = messageContainer.appendChild($('.dialog-message'));
            messageElement.innerText = this.message;
        }
        this.messageDetailElement = messageContainer.appendChild($('.dialog-message-detail'));
        this.messageDetailElement.innerText = this.options.detail ? this.options.detail : message;
        const toolbarRowElement = this.element.appendChild($('.dialog-toolbar-row'));
        this.toolbarContainer = toolbarRowElement.appendChild($('.dialog-toolbar'));
    }
    updateMessage(message) {
        if (this.messageDetailElement) {
            this.messageDetailElement.innerText = message;
        }
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (!this.element || !this.buttonsContainer || !this.iconElement || !this.toolbarContainer) {
                    resolve(0);
                    return;
                }
                if (this.modal) {
                    this._register(domEvent(this.modal, 'mousedown')(e => {
                        // Used to stop focusing of modal with mouse
                        EventHelper.stop(e, true);
                    }));
                }
                clearNode(this.buttonsContainer);
                let focusedButton = 0;
                this.buttonGroup = new ButtonGroup(this.buttonsContainer, this.buttons.length, { title: true });
                this.buttonGroup.buttons.forEach((button, index) => {
                    button.label = mnemonicButtonLabel(this.buttons[index], true);
                    this._register(button.onDidClick(e => {
                        EventHelper.stop(e);
                        resolve(index);
                    }));
                });
                this._register(domEvent(window, 'keydown', true)((e) => {
                    const evt = new StandardKeyboardEvent(e);
                    if (evt.equals(KeyCode.Enter) || evt.equals(KeyCode.Space)) {
                        return;
                    }
                    let eventHandled = false;
                    if (this.buttonGroup) {
                        if (evt.equals(KeyMod.Shift | KeyCode.Tab) || evt.equals(KeyCode.LeftArrow)) {
                            focusedButton = focusedButton + this.buttonGroup.buttons.length - 1;
                            focusedButton = focusedButton % this.buttonGroup.buttons.length;
                            this.buttonGroup.buttons[focusedButton].focus();
                            eventHandled = true;
                        }
                        else if (evt.equals(KeyCode.Tab) || evt.equals(KeyCode.RightArrow)) {
                            focusedButton++;
                            focusedButton = focusedButton % this.buttonGroup.buttons.length;
                            this.buttonGroup.buttons[focusedButton].focus();
                            eventHandled = true;
                        }
                    }
                    if (eventHandled) {
                        EventHelper.stop(e, true);
                    }
                    else if (this.options.keyEventProcessor) {
                        this.options.keyEventProcessor(evt);
                    }
                }));
                this._register(domEvent(window, 'keyup', true)((e) => {
                    EventHelper.stop(e, true);
                    const evt = new StandardKeyboardEvent(e);
                    if (evt.equals(KeyCode.Escape)) {
                        resolve(this.options.cancelId || 0);
                    }
                }));
                removeClasses(this.iconElement, 'icon-error', 'icon-warning', 'icon-info');
                switch (this.options.type) {
                    case 'error':
                        addClass(this.iconElement, 'icon-error');
                        break;
                    case 'warning':
                        addClass(this.iconElement, 'icon-warning');
                        break;
                    case 'pending':
                        addClass(this.iconElement, 'icon-pending');
                        break;
                    case 'none':
                    case 'info':
                    case 'question':
                    default:
                        addClass(this.iconElement, 'icon-info');
                        break;
                }
                const actionBar = new ActionBar(this.toolbarContainer, {});
                const action = new Action('dialog.close', nls.localize('dialogClose', "Close Dialog"), 'dialog-close-action', true, () => {
                    resolve(this.options.cancelId || 0);
                    return Promise.resolve();
                });
                actionBar.push(action, { icon: true, label: false, });
                this.applyStyles();
                show(this.element);
                // Focus first element
                this.buttonGroup.buttons[focusedButton].focus();
            });
        });
    }
    applyStyles() {
        if (this.styles) {
            const style = this.styles;
            const fgColor = style.dialogForeground ? `${style.dialogForeground}` : null;
            const bgColor = style.dialogBackground ? `${style.dialogBackground}` : null;
            const shadowColor = style.dialogShadow ? `0 0px 8px ${style.dialogShadow}` : null;
            const border = style.dialogBorder ? `1px solid ${style.dialogBorder}` : null;
            if (this.element) {
                this.element.style.color = fgColor;
                this.element.style.backgroundColor = bgColor;
                this.element.style.boxShadow = shadowColor;
                this.element.style.border = border;
                if (this.buttonGroup) {
                    this.buttonGroup.buttons.forEach(button => button.style(style));
                }
            }
        }
    }
    style(style) {
        this.styles = style;
        this.applyStyles();
    }
    dispose() {
        super.dispose();
        if (this.modal) {
            removeNode(this.modal);
            this.modal = undefined;
        }
    }
}
//# sourceMappingURL=dialog.js.map