/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './sash.css';
import { dispose, Disposable } from 'base/common/lifecycle';
import { isIPad } from 'base/browser/browser';
import { isMacintosh } from 'base/common/platform';
import * as types from 'base/common/types';
import { EventType, Gesture } from 'base/browser/touch';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { Emitter } from 'base/common/event';
import { getElementsByTagName, EventHelper, createStyleSheet, addDisposableListener, append, $, addClass, removeClass, toggleClass } from 'base/browser/dom';
import { domEvent } from 'base/browser/event';
const DEBUG = false;
export var Orientation;
(function (Orientation) {
    Orientation[Orientation["VERTICAL"] = 0] = "VERTICAL";
    Orientation[Orientation["HORIZONTAL"] = 1] = "HORIZONTAL";
})(Orientation || (Orientation = {}));
export var SashState;
(function (SashState) {
    SashState[SashState["Disabled"] = 0] = "Disabled";
    SashState[SashState["Minimum"] = 1] = "Minimum";
    SashState[SashState["Maximum"] = 2] = "Maximum";
    SashState[SashState["Enabled"] = 3] = "Enabled";
})(SashState || (SashState = {}));
export class Sash extends Disposable {
    constructor(container, layoutProvider, options = {}) {
        super();
        this._state = SashState.Enabled;
        this._onDidEnablementChange = this._register(new Emitter());
        this.onDidEnablementChange = this._onDidEnablementChange.event;
        this._onDidStart = this._register(new Emitter());
        this.onDidStart = this._onDidStart.event;
        this._onDidChange = this._register(new Emitter());
        this.onDidChange = this._onDidChange.event;
        this._onDidReset = this._register(new Emitter());
        this.onDidReset = this._onDidReset.event;
        this._onDidEnd = this._register(new Emitter());
        this.onDidEnd = this._onDidEnd.event;
        this.linkedSash = undefined;
        this.orthogonalStartSashDisposables = [];
        this.orthogonalEndSashDisposables = [];
        this.el = append(container, $('.monaco-sash'));
        if (isMacintosh) {
            addClass(this.el, 'mac');
        }
        this._register(domEvent(this.el, 'mousedown')(this.onMouseDown, this));
        this._register(domEvent(this.el, 'dblclick')(this.onMouseDoubleClick, this));
        Gesture.addTarget(this.el);
        this._register(domEvent(this.el, EventType.Start)(this.onTouchStart, this));
        if (isIPad) {
            // see also http://ux.stackexchange.com/questions/39023/what-is-the-optimum-button-size-of-touch-screen-applications
            addClass(this.el, 'touch');
        }
        this.setOrientation(options.orientation || Orientation.VERTICAL);
        this.hidden = false;
        this.layoutProvider = layoutProvider;
        this.orthogonalStartSash = options.orthogonalStartSash;
        this.orthogonalEndSash = options.orthogonalEndSash;
        toggleClass(this.el, 'debug', DEBUG);
    }
    get state() { return this._state; }
    set state(state) {
        if (this._state === state) {
            return;
        }
        toggleClass(this.el, 'disabled', state === SashState.Disabled);
        toggleClass(this.el, 'minimum', state === SashState.Minimum);
        toggleClass(this.el, 'maximum', state === SashState.Maximum);
        this._state = state;
        this._onDidEnablementChange.fire(state);
    }
    get orthogonalStartSash() { return this._orthogonalStartSash; }
    set orthogonalStartSash(sash) {
        this.orthogonalStartSashDisposables = dispose(this.orthogonalStartSashDisposables);
        if (sash) {
            sash.onDidEnablementChange(this.onOrthogonalStartSashEnablementChange, this, this.orthogonalStartSashDisposables);
            this.onOrthogonalStartSashEnablementChange(sash.state);
        }
        else {
            this.onOrthogonalStartSashEnablementChange(SashState.Disabled);
        }
        this._orthogonalStartSash = sash;
    }
    get orthogonalEndSash() { return this._orthogonalEndSash; }
    set orthogonalEndSash(sash) {
        this.orthogonalEndSashDisposables = dispose(this.orthogonalEndSashDisposables);
        if (sash) {
            sash.onDidEnablementChange(this.onOrthogonalEndSashEnablementChange, this, this.orthogonalEndSashDisposables);
            this.onOrthogonalEndSashEnablementChange(sash.state);
        }
        else {
            this.onOrthogonalEndSashEnablementChange(SashState.Disabled);
        }
        this._orthogonalEndSash = sash;
    }
    setOrientation(orientation) {
        this.orientation = orientation;
        if (this.orientation === Orientation.HORIZONTAL) {
            addClass(this.el, 'horizontal');
            removeClass(this.el, 'vertical');
        }
        else {
            removeClass(this.el, 'horizontal');
            addClass(this.el, 'vertical');
        }
        if (this.layoutProvider) {
            this.layout();
        }
    }
    onMouseDown(e) {
        EventHelper.stop(e, false);
        let isMultisashResize = false;
        if (this.linkedSash && !e.__linkedSashEvent) {
            e.__linkedSashEvent = true;
            this.linkedSash.onMouseDown(e);
        }
        if (!e.__orthogonalSashEvent) {
            let orthogonalSash;
            if (this.orientation === Orientation.VERTICAL) {
                if (e.offsetY <= 4) {
                    orthogonalSash = this.orthogonalStartSash;
                }
                else if (e.offsetY >= this.el.clientHeight - 4) {
                    orthogonalSash = this.orthogonalEndSash;
                }
            }
            else {
                if (e.offsetX <= 4) {
                    orthogonalSash = this.orthogonalStartSash;
                }
                else if (e.offsetX >= this.el.clientWidth - 4) {
                    orthogonalSash = this.orthogonalEndSash;
                }
            }
            if (orthogonalSash) {
                isMultisashResize = true;
                e.__orthogonalSashEvent = true;
                orthogonalSash.onMouseDown(e);
            }
        }
        if (!this.state) {
            return;
        }
        const iframes = getElementsByTagName('iframe');
        for (const iframe of iframes) {
            iframe.style.pointerEvents = 'none'; // disable mouse events on iframes as long as we drag the sash
        }
        const mouseDownEvent = new StandardMouseEvent(e);
        const startX = mouseDownEvent.posx;
        const startY = mouseDownEvent.posy;
        const altKey = mouseDownEvent.altKey;
        const startEvent = { startX, currentX: startX, startY, currentY: startY, altKey };
        addClass(this.el, 'active');
        this._onDidStart.fire(startEvent);
        // fix https://github.com/Microsoft/vscode/issues/21675
        const style = createStyleSheet(this.el);
        const updateStyle = () => {
            let cursor = '';
            if (isMultisashResize) {
                cursor = 'all-scroll';
            }
            else if (this.orientation === Orientation.HORIZONTAL) {
                if (this.state === SashState.Minimum) {
                    cursor = 's-resize';
                }
                else if (this.state === SashState.Maximum) {
                    cursor = 'n-resize';
                }
                else {
                    cursor = isMacintosh ? 'row-resize' : 'ns-resize';
                }
            }
            else {
                if (this.state === SashState.Minimum) {
                    cursor = 'e-resize';
                }
                else if (this.state === SashState.Maximum) {
                    cursor = 'w-resize';
                }
                else {
                    cursor = isMacintosh ? 'col-resize' : 'ew-resize';
                }
            }
            style.innerHTML = `* { cursor: ${cursor} !important; }`;
        };
        const disposables = [];
        updateStyle();
        if (!isMultisashResize) {
            this.onDidEnablementChange(updateStyle, null, disposables);
        }
        const onMouseMove = (e) => {
            EventHelper.stop(e, false);
            const mouseMoveEvent = new StandardMouseEvent(e);
            const event = { startX, currentX: mouseMoveEvent.posx, startY, currentY: mouseMoveEvent.posy, altKey };
            this._onDidChange.fire(event);
        };
        const onMouseUp = (e) => {
            EventHelper.stop(e, false);
            this.el.removeChild(style);
            removeClass(this.el, 'active');
            this._onDidEnd.fire();
            dispose(disposables);
            const iframes = getElementsByTagName('iframe');
            for (const iframe of iframes) {
                iframe.style.pointerEvents = 'auto';
            }
        };
        domEvent(window, 'mousemove')(onMouseMove, null, disposables);
        domEvent(window, 'mouseup')(onMouseUp, null, disposables);
    }
    onMouseDoubleClick(event) {
        this._onDidReset.fire();
    }
    onTouchStart(event) {
        EventHelper.stop(event);
        const listeners = [];
        const startX = event.pageX;
        const startY = event.pageY;
        const altKey = event.altKey;
        this._onDidStart.fire({
            startX: startX,
            currentX: startX,
            startY: startY,
            currentY: startY,
            altKey
        });
        listeners.push(addDisposableListener(this.el, EventType.Change, (event) => {
            if (types.isNumber(event.pageX) && types.isNumber(event.pageY)) {
                this._onDidChange.fire({
                    startX: startX,
                    currentX: event.pageX,
                    startY: startY,
                    currentY: event.pageY,
                    altKey
                });
            }
        }));
        listeners.push(addDisposableListener(this.el, EventType.End, (event) => {
            this._onDidEnd.fire();
            dispose(listeners);
        }));
    }
    layout() {
        const size = isIPad ? 20 : 4;
        if (this.orientation === Orientation.VERTICAL) {
            const verticalProvider = this.layoutProvider;
            this.el.style.left = verticalProvider.getVerticalSashLeft(this) - (size / 2) + 'px';
            if (verticalProvider.getVerticalSashTop) {
                this.el.style.top = verticalProvider.getVerticalSashTop(this) + 'px';
            }
            if (verticalProvider.getVerticalSashHeight) {
                this.el.style.height = verticalProvider.getVerticalSashHeight(this) + 'px';
            }
        }
        else {
            const horizontalProvider = this.layoutProvider;
            this.el.style.top = horizontalProvider.getHorizontalSashTop(this) - (size / 2) + 'px';
            if (horizontalProvider.getHorizontalSashLeft) {
                this.el.style.left = horizontalProvider.getHorizontalSashLeft(this) + 'px';
            }
            if (horizontalProvider.getHorizontalSashWidth) {
                this.el.style.width = horizontalProvider.getHorizontalSashWidth(this) + 'px';
            }
        }
    }
    show() {
        this.hidden = false;
        this.el.style.removeProperty('display');
        this.el.setAttribute('aria-hidden', 'false');
    }
    hide() {
        this.hidden = true;
        this.el.style.display = 'none';
        this.el.setAttribute('aria-hidden', 'true');
    }
    isHidden() {
        return this.hidden;
    }
    onOrthogonalStartSashEnablementChange(state) {
        toggleClass(this.el, 'orthogonal-start', state !== SashState.Disabled);
    }
    onOrthogonalEndSashEnablementChange(state) {
        toggleClass(this.el, 'orthogonal-end', state !== SashState.Disabled);
    }
    dispose() {
        super.dispose();
        this.orthogonalStartSashDisposables = dispose(this.orthogonalStartSashDisposables);
        this.orthogonalEndSashDisposables = dispose(this.orthogonalEndSashDisposables);
        if (this.el && this.el.parentElement) {
            this.el.parentElement.removeChild(this.el);
        }
        this.el = null; // StrictNullOverride: nulling out ok in dispose
    }
}
//# sourceMappingURL=sash.js.map