/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as dom from 'base/view/dom';
import { IframeUtils } from 'base/view/iframe';
import { StandardMouseEvent } from 'base/view/mouseEvent';
import { Disposable, IDisposable, dispose } from 'base/common/lifecycle';

export interface IStandardMouseMoveEventData {
	leftButton: boolean;
	posx: number;
	posy: number;
  movementX: number;
  movementY: number;
}

export interface IEventMerger<R> {
	(lastEvent: R, currentEvent: MouseEvent): R;
}

export interface IMouseMoveCallback<R> {
	(mouseMoveData: R): void;
}

export interface IOnStopCallback {
	(): void;
}

export function standardMouseMoveMerger(lastEvent: IStandardMouseMoveEventData, currentEvent: MouseEvent): IStandardMouseMoveEventData {
	let ev = new StandardMouseEvent(currentEvent);
	ev.preventDefault();
	const r = {
		leftButton: ev.leftButton,
		posx: ev.posx,
		posy: ev.posy,
    movementX: ev.movementX,
    movementY: ev.movementY
	};
  if (lastEvent) {
    r.movementX += lastEvent.movementX;
    r.movementY += lastEvent.movementY;
  }
  return r;
}

export class GlobalMouseMoveMonitor<R> extends Disposable {

	private hooks: IDisposable[];
	private mouseMoveEventMerger: IEventMerger<R> | null;
	private mouseMoveCallback: IMouseMoveCallback<R> | null;
	private onStopCallback: IOnStopCallback | null;

	constructor() {
		super();
		this.hooks = [];
		this.mouseMoveEventMerger = null;
		this.mouseMoveCallback = null;
		this.onStopCallback = null;
	}

	public dispose(): void {
		this.stopMonitoring(false);
		super.dispose();
	}

	public stopMonitoring(invokeStopCallback: boolean): void {
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

	public isMonitoring() {
		return this.hooks.length > 0;
	}

	public startMonitoring(
		mouseMoveEventMerger: IEventMerger<R>,
		mouseMoveCallback: IMouseMoveCallback<R>,
		onStopCallback: IOnStopCallback
	): void {
		if (this.isMonitoring()) {
			// I am already hooked
			return;
		}
		this.mouseMoveEventMerger = mouseMoveEventMerger;
		this.mouseMoveCallback = mouseMoveCallback;
		this.onStopCallback = onStopCallback;

		let windowChain = IframeUtils.getSameOriginWindowChain();
		for (const element of windowChain) {
			this.hooks.push(dom.addDisposableThrottledListener(element.window.document, 'mousemove',
				(data: R) => this.mouseMoveCallback!(data),
				(lastEvent: R, currentEvent) => this.mouseMoveEventMerger!(lastEvent, currentEvent as MouseEvent)
			));
			this.hooks.push(dom.addDisposableListener(element.window.document, 'mouseup', (e: MouseEvent) => this.stopMonitoring(true)));
		}

		if (IframeUtils.hasDifferentOriginAncestor()) {
			let lastSameOriginAncestor = windowChain[windowChain.length - 1];
			// We might miss a mouse up if it happens outside the iframe
			// This one is for Chrome
			this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document, 'mouseout', (browserEvent: MouseEvent) => {
				let e = new StandardMouseEvent(browserEvent);
				if (e.target.tagName.toLowerCase() === 'html') {
					this.stopMonitoring(true);
				}
			}));
			// This one is for FF
			this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document, 'mouseover', (browserEvent: MouseEvent) => {
				let e = new StandardMouseEvent(browserEvent);
				if (e.target.tagName.toLowerCase() === 'html') {
					this.stopMonitoring(true);
				}
			}));
			// This one is for IE
			this.hooks.push(dom.addDisposableListener(lastSameOriginAncestor.window.document.body, 'mouseleave', (browserEvent: MouseEvent) => {
				this.stopMonitoring(true);
			}));
		}
	}
}
