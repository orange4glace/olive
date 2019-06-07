/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as dom from 'base/browser/dom';
import { IframeUtils } from 'base/browser/iframe';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { Disposable, dispose } from 'base/common/lifecycle';
export function standardMouseMoveMerger(lastEvent, currentEvent) {
    let ev = new StandardMouseEvent(currentEvent);
    ev.preventDefault();
    return {
        leftButton: ev.leftButton,
        posx: ev.posx,
        posy: ev.posy,
        movementX: ev.movementX,
        movementY: ev.movementY,
    };
}
export class GlobalMouseMoveMonitor extends Disposable {
    constructor() {
        super();
        this.hooks = [];
        this.mouseMoveEventMerger = null;
        this.mouseMoveCallback = null;
        this.onStopCallback = null;
    }
    dispose() {
        this.stopMonitoring(false);
        super.dispose();
    }
    stopMonitoring(invokeStopCallback) {
        if (!this.isMonitoring()) {
            // Not monitoring
            return;
        }
        // Unhook
        this.hooks = dispose(this.hooks);
        this.mouseMoveEventMerger = null;
        this.mouseMoveCallback = null;
        let onStopCallback = this.onStopCallback;
        this.onStopCallback = null;
        if (invokeStopCallback && onStopCallback) {
            onStopCallback();
        }
    }
    isMonitoring() {
        return this.hooks.length > 0;
    }
    startMonitoring(mouseMoveEventMerger, mouseMoveCallback, onStopCallback) {
        if (this.isMonitoring()) {
            // I am already hooked
            return;
        }
        this.mouseMoveEventMerger = mouseMoveEventMerger;
        this.mouseMoveCallback = mouseMoveCallback;
        this.onStopCallback = onStopCallback;
        let windowChain = IframeUtils.getSameOriginWindowChain();
        for (const element of windowChain) {
            this.hooks.push(dom.addDisposableThrottledListener(element.window.document, 'mousemove', (data) => this.mouseMoveCallback(data), (lastEvent, currentEvent) => this.mouseMoveEventMerger(lastEvent, currentEvent)));
            this.hooks.push(dom.addDisposableListener(element.window.document, 'mouseup', (e) => this.stopMonitoring(true)));
        }
        if (IframeUtils.hasDifferentOriginAncestor()) {
            let lastSameOriginAncestor = windowChain[windowChain.length - 1];
            // We might miss a mouse up if it happens outside the iframe
            // This one is for Chrome
            this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document, 'mouseout', (browserEvent) => {
                let e = new StandardMouseEvent(browserEvent);
                if (e.target.tagName.toLowerCase() === 'html') {
                    this.stopMonitoring(true);
                }
            }));
            // This one is for FF
            this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document, 'mouseover', (browserEvent) => {
                let e = new StandardMouseEvent(browserEvent);
                if (e.target.tagName.toLowerCase() === 'html') {
                    this.stopMonitoring(true);
                }
            }));
            // This one is for IE
            this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document.body, 'mouseleave', (browserEvent) => {
                this.stopMonitoring(true);
            }));
        }
    }
}
//# sourceMappingURL=globalMouseMoveMonitor.js.map