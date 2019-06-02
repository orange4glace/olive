/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as dom from 'base/browser/dom';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { Disposable } from 'base/common/lifecycle';
export class Widget extends Disposable {
    onclick(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.CLICK, (e) => listener(new StandardMouseEvent(e))));
    }
    onmousedown(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.MOUSE_DOWN, (e) => listener(new StandardMouseEvent(e))));
    }
    onmouseover(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.MOUSE_OVER, (e) => listener(new StandardMouseEvent(e))));
    }
    onnonbubblingmouseout(domNode, listener) {
        this._register(dom.addDisposableNonBubblingMouseOutListener(domNode, (e) => listener(new StandardMouseEvent(e))));
    }
    onkeydown(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.KEY_DOWN, (e) => listener(new StandardKeyboardEvent(e))));
    }
    onkeyup(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.KEY_UP, (e) => listener(new StandardKeyboardEvent(e))));
    }
    oninput(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.INPUT, listener));
    }
    onblur(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.BLUR, listener));
    }
    onfocus(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.FOCUS, listener));
    }
    onchange(domNode, listener) {
        this._register(dom.addDisposableListener(domNode, dom.EventType.CHANGE, listener));
    }
}
//# sourceMappingURL=widget.js.map