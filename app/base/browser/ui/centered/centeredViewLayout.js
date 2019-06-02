/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { SplitView, Orientation } from 'base/browser/ui/splitview/splitview';
import { $ } from 'base/browser/dom';
import { Event } from 'base/common/event';
import { dispose } from 'base/common/lifecycle';
const GOLDEN_RATIO = {
    leftMarginRatio: 0.1909,
    rightMarginRatio: 0.1909
};
function createEmptyView(background) {
    const element = $('.centered-layout-margin');
    element.style.height = '100%';
    element.style.backgroundColor = background.toString();
    return {
        element,
        layout: () => undefined,
        minimumSize: 60,
        maximumSize: Number.POSITIVE_INFINITY,
        onDidChange: Event.None
    };
}
function toSplitViewView(view, getHeight) {
    return {
        element: view.element,
        get maximumSize() { return view.maximumWidth; },
        get minimumSize() { return view.minimumWidth; },
        onDidChange: Event.map(view.onDidChange, e => e && e.width),
        layout: size => view.layout(size, getHeight(), Orientation.HORIZONTAL)
    };
}
export class CenteredViewLayout {
    constructor(container, view, state = { leftMarginRatio: GOLDEN_RATIO.leftMarginRatio, rightMarginRatio: GOLDEN_RATIO.rightMarginRatio }) {
        this.container = container;
        this.view = view;
        this.state = state;
        this.width = 0;
        this.height = 0;
        this.didLayout = false;
        this.splitViewDisposables = [];
        this.container.appendChild(this.view.element);
        // Make sure to hide the split view overflow like sashes #52892
        this.container.style.overflow = 'hidden';
    }
    get minimumWidth() { return this.splitView ? this.splitView.minimumSize : this.view.minimumWidth; }
    get maximumWidth() { return this.splitView ? this.splitView.maximumSize : this.view.maximumWidth; }
    get minimumHeight() { return this.view.minimumHeight; }
    get maximumHeight() { return this.view.maximumHeight; }
    layout(width, height) {
        this.width = width;
        this.height = height;
        if (this.splitView) {
            this.splitView.layout(width);
            if (!this.didLayout) {
                this.resizeMargins();
            }
        }
        else {
            this.view.layout(width, height, Orientation.HORIZONTAL);
        }
        this.didLayout = true;
    }
    resizeMargins() {
        if (!this.splitView) {
            return;
        }
        this.splitView.resizeView(0, this.state.leftMarginRatio * this.width);
        this.splitView.resizeView(2, this.state.rightMarginRatio * this.width);
    }
    isActive() {
        return !!this.splitView;
    }
    styles(style) {
        this.style = style;
        if (this.splitView && this.emptyViews) {
            this.splitView.style(this.style);
            this.emptyViews[0].element.style.backgroundColor = this.style.background.toString();
            this.emptyViews[1].element.style.backgroundColor = this.style.background.toString();
        }
    }
    activate(active) {
        if (active === this.isActive()) {
            return;
        }
        if (active) {
            this.container.removeChild(this.view.element);
            this.splitView = new SplitView(this.container, {
                inverseAltBehavior: true,
                orientation: Orientation.HORIZONTAL,
                styles: this.style
            });
            this.splitViewDisposables.push(this.splitView.onDidSashChange(() => {
                if (this.splitView) {
                    this.state.leftMarginRatio = this.splitView.getViewSize(0) / this.width;
                    this.state.rightMarginRatio = this.splitView.getViewSize(2) / this.width;
                }
            }));
            this.splitViewDisposables.push(this.splitView.onDidSashReset(() => {
                this.state.leftMarginRatio = GOLDEN_RATIO.leftMarginRatio;
                this.state.rightMarginRatio = GOLDEN_RATIO.rightMarginRatio;
                this.resizeMargins();
            }));
            this.splitView.layout(this.width);
            this.splitView.addView(toSplitViewView(this.view, () => this.height), 0);
            this.emptyViews = [createEmptyView(this.style.background), createEmptyView(this.style.background)];
            this.splitView.addView(this.emptyViews[0], this.state.leftMarginRatio * this.width, 0);
            this.splitView.addView(this.emptyViews[1], this.state.rightMarginRatio * this.width, 2);
        }
        else {
            if (this.splitView) {
                this.container.removeChild(this.splitView.el);
            }
            this.splitViewDisposables = dispose(this.splitViewDisposables);
            if (this.splitView) {
                this.splitView.dispose();
            }
            this.splitView = undefined;
            this.emptyViews = undefined;
            this.container.appendChild(this.view.element);
        }
    }
    isDefault(state) {
        return state.leftMarginRatio === GOLDEN_RATIO.leftMarginRatio && state.rightMarginRatio === GOLDEN_RATIO.rightMarginRatio;
    }
    dispose() {
        this.splitViewDisposables = dispose(this.splitViewDisposables);
        if (this.splitView) {
            this.splitView.dispose();
            this.splitView = undefined;
        }
    }
}
//# sourceMappingURL=centeredViewLayout.js.map