/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './splitview.css';
import { combinedDisposable, toDisposable, Disposable } from 'base/common/lifecycle';
import { Event, Emitter } from 'base/common/event';
import * as types from 'base/common/types';
import * as dom from 'base/browser/dom';
import { clamp } from 'base/common/numbers';
import { range, firstIndex, pushToStart, pushToEnd } from 'base/common/arrays';
import { Sash, Orientation, SashState } from 'base/browser/ui/sash/sash';
import { Color } from 'base/common/color';
import { domEvent } from 'base/browser/event';
export { Orientation } from 'base/browser/ui/sash/sash';
const defaultStyles = {
    separatorBorder: Color.transparent
};
/**
 * Only used when `proportionalLayout` is false.
 */
export var LayoutPriority;
(function (LayoutPriority) {
    LayoutPriority[LayoutPriority["Normal"] = 0] = "Normal";
    LayoutPriority[LayoutPriority["Low"] = 1] = "Low";
    LayoutPriority[LayoutPriority["High"] = 2] = "High";
})(LayoutPriority || (LayoutPriority = {}));
var State;
(function (State) {
    State[State["Idle"] = 0] = "Idle";
    State[State["Busy"] = 1] = "Busy";
})(State || (State = {}));
export var Sizing;
(function (Sizing) {
    Sizing.Distribute = { type: 'distribute' };
    function Split(index) { return { type: 'split', index }; }
    Sizing.Split = Split;
})(Sizing || (Sizing = {}));
export class SplitView extends Disposable {
    constructor(container, options = {}) {
        super();
        this.size = 0;
        this.contentSize = 0;
        this.proportions = undefined;
        this.viewItems = [];
        this.sashItems = [];
        this.state = State.Idle;
        this._onDidSashChange = this._register(new Emitter());
        this.onDidSashChange = this._onDidSashChange.event;
        this._onDidSashReset = this._register(new Emitter());
        this.onDidSashReset = this._onDidSashReset.event;
        this.orientation = types.isUndefined(options.orientation) ? Orientation.VERTICAL : options.orientation;
        this.inverseAltBehavior = !!options.inverseAltBehavior;
        this.proportionalLayout = types.isUndefined(options.proportionalLayout) ? true : !!options.proportionalLayout;
        this.el = document.createElement('div');
        dom.addClass(this.el, 'monaco-split-view2');
        dom.addClass(this.el, this.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal');
        container.appendChild(this.el);
        this.sashContainer = dom.append(this.el, dom.$('.sash-container'));
        this.viewContainer = dom.append(this.el, dom.$('.split-view-container'));
        this.style(options.styles || defaultStyles);
    }
    get length() {
        return this.viewItems.length;
    }
    get minimumSize() {
        return this.viewItems.reduce((r, item) => r + item.view.minimumSize, 0);
    }
    get maximumSize() {
        return this.length === 0 ? Number.POSITIVE_INFINITY : this.viewItems.reduce((r, item) => r + item.view.maximumSize, 0);
    }
    get orthogonalStartSash() { return this._orthogonalStartSash; }
    set orthogonalStartSash(sash) {
        for (const sashItem of this.sashItems) {
            sashItem.sash.orthogonalStartSash = sash;
        }
        this._orthogonalStartSash = sash;
    }
    get orthogonalEndSash() { return this._orthogonalEndSash; }
    set orthogonalEndSash(sash) {
        for (const sashItem of this.sashItems) {
            sashItem.sash.orthogonalEndSash = sash;
        }
        this._orthogonalEndSash = sash;
    }
    get sashes() {
        return this.sashItems.map(s => s.sash);
    }
    style(styles) {
        if (styles.separatorBorder.isTransparent()) {
            dom.removeClass(this.el, 'separator-border');
            this.el.style.removeProperty('--separator-border');
        }
        else {
            dom.addClass(this.el, 'separator-border');
            this.el.style.setProperty('--separator-border', styles.separatorBorder.toString());
        }
    }
    addView(view, size, index = this.viewItems.length) {
        if (this.state !== State.Idle) {
            throw new Error('Cant modify splitview');
        }
        this.state = State.Busy;
        // Add view
        const container = dom.$('.split-view-view');
        if (index === this.viewItems.length) {
            this.viewContainer.appendChild(container);
        }
        else {
            this.viewContainer.insertBefore(container, this.viewContainer.children.item(index));
        }
        const onChangeDisposable = view.onDidChange(size => this.onViewChange(item, size));
        const containerDisposable = toDisposable(() => this.viewContainer.removeChild(container));
        const disposable = combinedDisposable([onChangeDisposable, containerDisposable]);
        const layoutContainer = this.orientation === Orientation.VERTICAL
            ? () => item.container.style.height = `${item.size}px`
            : () => item.container.style.width = `${item.size}px`;
        const layout = () => {
            layoutContainer();
            item.view.layout(item.size, this.orientation);
        };
        let viewSize;
        if (typeof size === 'number') {
            viewSize = size;
        }
        else if (size.type === 'split') {
            viewSize = this.getViewSize(size.index) / 2;
        }
        else {
            viewSize = view.minimumSize;
        }
        const item = { view, container, size: viewSize, layout, disposable };
        this.viewItems.splice(index, 0, item);
        // Add sash
        if (this.viewItems.length > 1) {
            const orientation = this.orientation === Orientation.VERTICAL ? Orientation.HORIZONTAL : Orientation.VERTICAL;
            const layoutProvider = this.orientation === Orientation.VERTICAL ? { getHorizontalSashTop: (sash) => this.getSashPosition(sash) } : { getVerticalSashLeft: (sash) => this.getSashPosition(sash) };
            const sash = new Sash(this.sashContainer, layoutProvider, {
                orientation,
                orthogonalStartSash: this.orthogonalStartSash,
                orthogonalEndSash: this.orthogonalEndSash
            });
            const sashEventMapper = this.orientation === Orientation.VERTICAL
                ? (e) => ({ sash, start: e.startY, current: e.currentY, alt: e.altKey })
                : (e) => ({ sash, start: e.startX, current: e.currentX, alt: e.altKey });
            const onStart = Event.map(sash.onDidStart, sashEventMapper);
            const onStartDisposable = onStart(this.onSashStart, this);
            const onChange = Event.map(sash.onDidChange, sashEventMapper);
            const onChangeDisposable = onChange(this.onSashChange, this);
            const onEnd = Event.map(sash.onDidEnd, () => firstIndex(this.sashItems, item => item.sash === sash));
            const onEndDisposable = onEnd(this.onSashEnd, this);
            const onDidResetDisposable = sash.onDidReset(() => this._onDidSashReset.fire(firstIndex(this.sashItems, item => item.sash === sash)));
            const disposable = combinedDisposable([onStartDisposable, onChangeDisposable, onEndDisposable, onDidResetDisposable, sash]);
            const sashItem = { sash, disposable };
            this.sashItems.splice(index - 1, 0, sashItem);
        }
        container.appendChild(view.element);
        let highPriorityIndex;
        if (typeof size !== 'number' && size.type === 'split') {
            highPriorityIndex = size.index;
        }
        this.relayout(index, highPriorityIndex);
        this.state = State.Idle;
        if (typeof size !== 'number' && size.type === 'distribute') {
            this.distributeViewSizes();
        }
    }
    removeView(index, sizing) {
        if (this.state !== State.Idle) {
            throw new Error('Cant modify splitview');
        }
        this.state = State.Busy;
        if (index < 0 || index >= this.viewItems.length) {
            throw new Error('Index out of bounds');
        }
        // Remove view
        const viewItem = this.viewItems.splice(index, 1)[0];
        viewItem.disposable.dispose();
        // Remove sash
        if (this.viewItems.length >= 1) {
            const sashIndex = Math.max(index - 1, 0);
            const sashItem = this.sashItems.splice(sashIndex, 1)[0];
            sashItem.disposable.dispose();
        }
        this.relayout();
        this.state = State.Idle;
        if (sizing && sizing.type === 'distribute') {
            this.distributeViewSizes();
        }
        return viewItem.view;
    }
    moveView(from, to) {
        if (this.state !== State.Idle) {
            throw new Error('Cant modify splitview');
        }
        const size = this.getViewSize(from);
        const view = this.removeView(from);
        this.addView(view, size, to);
    }
    swapViews(from, to) {
        if (this.state !== State.Idle) {
            throw new Error('Cant modify splitview');
        }
        if (from > to) {
            return this.swapViews(to, from);
        }
        const fromSize = this.getViewSize(from);
        const toSize = this.getViewSize(to);
        const toView = this.removeView(to);
        const fromView = this.removeView(from);
        this.addView(toView, fromSize, from);
        this.addView(fromView, toSize, to);
    }
    relayout(lowPriorityIndex, highPriorityIndex) {
        const contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
        const lowPriorityIndexes = typeof lowPriorityIndex === 'number' ? [lowPriorityIndex] : undefined;
        const highPriorityIndexes = typeof highPriorityIndex === 'number' ? [highPriorityIndex] : undefined;
        this.resize(this.viewItems.length - 1, this.size - contentSize, undefined, lowPriorityIndexes, highPriorityIndexes);
        this.distributeEmptySpace();
        this.layoutViews();
        this.saveProportions();
    }
    layout(size) {
        const previousSize = Math.max(this.size, this.contentSize);
        this.size = size;
        if (!this.proportions) {
            const indexes = range(this.viewItems.length);
            const lowPriorityIndexes = indexes.filter(i => this.viewItems[i].view.priority === LayoutPriority.Low);
            const highPriorityIndexes = indexes.filter(i => this.viewItems[i].view.priority === LayoutPriority.High);
            this.resize(this.viewItems.length - 1, size - previousSize, undefined, lowPriorityIndexes, highPriorityIndexes);
        }
        else {
            for (let i = 0; i < this.viewItems.length; i++) {
                const item = this.viewItems[i];
                item.size = clamp(Math.round(this.proportions[i] * size), item.view.minimumSize, item.view.maximumSize);
            }
        }
        this.distributeEmptySpace();
        this.layoutViews();
    }
    saveProportions() {
        if (this.proportionalLayout && this.contentSize > 0) {
            this.proportions = this.viewItems.map(i => i.size / this.contentSize);
        }
    }
    onSashStart({ sash, start, alt }) {
        const index = firstIndex(this.sashItems, item => item.sash === sash);
        // This way, we can press Alt while we resize a sash, macOS style!
        const disposable = combinedDisposable([
            domEvent(document.body, 'keydown')(e => resetSashDragState(this.sashDragState.current, e.altKey)),
            domEvent(document.body, 'keyup')(() => resetSashDragState(this.sashDragState.current, false))
        ]);
        const resetSashDragState = (start, alt) => {
            const sizes = this.viewItems.map(i => i.size);
            let minDelta = Number.NEGATIVE_INFINITY;
            let maxDelta = Number.POSITIVE_INFINITY;
            if (this.inverseAltBehavior) {
                alt = !alt;
            }
            if (alt) {
                // When we're using the last sash with Alt, we're resizing
                // the view to the left/up, instead of right/down as usual
                // Thus, we must do the inverse of the usual
                const isLastSash = index === this.sashItems.length - 1;
                if (isLastSash) {
                    const viewItem = this.viewItems[index];
                    minDelta = (viewItem.view.minimumSize - viewItem.size) / 2;
                    maxDelta = (viewItem.view.maximumSize - viewItem.size) / 2;
                }
                else {
                    const viewItem = this.viewItems[index + 1];
                    minDelta = (viewItem.size - viewItem.view.maximumSize) / 2;
                    maxDelta = (viewItem.size - viewItem.view.minimumSize) / 2;
                }
            }
            this.sashDragState = { start, current: start, index, sizes, minDelta, maxDelta, alt, disposable };
        };
        resetSashDragState(start, alt);
    }
    onSashChange({ current }) {
        const { index, start, sizes, alt, minDelta, maxDelta } = this.sashDragState;
        this.sashDragState.current = current;
        const delta = current - start;
        const newDelta = this.resize(index, delta, sizes, undefined, undefined, minDelta, maxDelta);
        if (alt) {
            const isLastSash = index === this.sashItems.length - 1;
            const newSizes = this.viewItems.map(i => i.size);
            const viewItemIndex = isLastSash ? index : index + 1;
            const viewItem = this.viewItems[viewItemIndex];
            const newMinDelta = viewItem.size - viewItem.view.maximumSize;
            const newMaxDelta = viewItem.size - viewItem.view.minimumSize;
            const resizeIndex = isLastSash ? index - 1 : index + 1;
            this.resize(resizeIndex, -newDelta, newSizes, undefined, undefined, newMinDelta, newMaxDelta);
        }
        this.distributeEmptySpace();
        this.layoutViews();
    }
    onSashEnd(index) {
        this._onDidSashChange.fire(index);
        this.sashDragState.disposable.dispose();
        this.saveProportions();
    }
    onViewChange(item, size) {
        const index = this.viewItems.indexOf(item);
        if (index < 0 || index >= this.viewItems.length) {
            return;
        }
        size = typeof size === 'number' ? size : item.size;
        size = clamp(size, item.view.minimumSize, item.view.maximumSize);
        if (this.inverseAltBehavior && index > 0) {
            // In this case, we want the view to grow or shrink both sides equally
            // so we just resize the "left" side by half and let `resize` do the clamping magic
            this.resize(index - 1, Math.floor((item.size - size) / 2));
            this.distributeEmptySpace();
            this.layoutViews();
        }
        else {
            item.size = size;
            this.relayout(index, undefined);
        }
    }
    resizeView(index, size) {
        if (this.state !== State.Idle) {
            throw new Error('Cant modify splitview');
        }
        this.state = State.Busy;
        if (index < 0 || index >= this.viewItems.length) {
            return;
        }
        const item = this.viewItems[index];
        size = Math.round(size);
        size = clamp(size, item.view.minimumSize, item.view.maximumSize);
        let delta = size - item.size;
        if (delta !== 0 && index < this.viewItems.length - 1) {
            const downIndexes = range(index + 1, this.viewItems.length);
            const collapseDown = downIndexes.reduce((r, i) => r + (this.viewItems[i].size - this.viewItems[i].view.minimumSize), 0);
            const expandDown = downIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - this.viewItems[i].size), 0);
            const deltaDown = clamp(delta, -expandDown, collapseDown);
            this.resize(index, deltaDown);
            delta -= deltaDown;
        }
        if (delta !== 0 && index > 0) {
            const upIndexes = range(index - 1, -1);
            const collapseUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].size - this.viewItems[i].view.minimumSize), 0);
            const expandUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - this.viewItems[i].size), 0);
            const deltaUp = clamp(-delta, -collapseUp, expandUp);
            this.resize(index - 1, deltaUp);
        }
        this.distributeEmptySpace();
        this.layoutViews();
        this.saveProportions();
        this.state = State.Idle;
    }
    distributeViewSizes() {
        const size = Math.floor(this.size / this.viewItems.length);
        for (let i = 0; i < this.viewItems.length - 1; i++) {
            this.resizeView(i, size);
        }
    }
    getViewSize(index) {
        if (index < 0 || index >= this.viewItems.length) {
            return -1;
        }
        return this.viewItems[index].size;
    }
    resize(index, delta, sizes = this.viewItems.map(i => i.size), lowPriorityIndexes, highPriorityIndexes, overloadMinDelta = Number.NEGATIVE_INFINITY, overloadMaxDelta = Number.POSITIVE_INFINITY) {
        if (index < 0 || index >= this.viewItems.length) {
            return 0;
        }
        const upIndexes = range(index, -1);
        const downIndexes = range(index + 1, this.viewItems.length);
        if (highPriorityIndexes) {
            for (const index of highPriorityIndexes) {
                pushToStart(upIndexes, index);
                pushToStart(downIndexes, index);
            }
        }
        if (lowPriorityIndexes) {
            for (const index of lowPriorityIndexes) {
                pushToEnd(upIndexes, index);
                pushToEnd(downIndexes, index);
            }
        }
        const upItems = upIndexes.map(i => this.viewItems[i]);
        const upSizes = upIndexes.map(i => sizes[i]);
        const downItems = downIndexes.map(i => this.viewItems[i]);
        const downSizes = downIndexes.map(i => sizes[i]);
        const minDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.minimumSize - sizes[i]), 0);
        const maxDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - sizes[i]), 0);
        const maxDeltaDown = downIndexes.length === 0 ? Number.POSITIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].view.minimumSize), 0);
        const minDeltaDown = downIndexes.length === 0 ? Number.NEGATIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].view.maximumSize), 0);
        const minDelta = Math.max(minDeltaUp, minDeltaDown, overloadMinDelta);
        const maxDelta = Math.min(maxDeltaDown, maxDeltaUp, overloadMaxDelta);
        delta = clamp(delta, minDelta, maxDelta);
        for (let i = 0, deltaUp = delta; i < upItems.length; i++) {
            const item = upItems[i];
            const size = clamp(upSizes[i] + deltaUp, item.view.minimumSize, item.view.maximumSize);
            const viewDelta = size - upSizes[i];
            deltaUp -= viewDelta;
            item.size = size;
        }
        for (let i = 0, deltaDown = delta; i < downItems.length; i++) {
            const item = downItems[i];
            const size = clamp(downSizes[i] - deltaDown, item.view.minimumSize, item.view.maximumSize);
            const viewDelta = size - downSizes[i];
            deltaDown += viewDelta;
            item.size = size;
        }
        return delta;
    }
    distributeEmptySpace() {
        let contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
        let emptyDelta = this.size - contentSize;
        for (let i = this.viewItems.length - 1; emptyDelta !== 0 && i >= 0; i--) {
            const item = this.viewItems[i];
            const size = clamp(item.size + emptyDelta, item.view.minimumSize, item.view.maximumSize);
            const viewDelta = size - item.size;
            emptyDelta -= viewDelta;
            item.size = size;
        }
    }
    layoutViews() {
        // Save new content size
        this.contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
        // Layout views
        this.viewItems.forEach(item => item.layout());
        // Layout sashes
        this.sashItems.forEach(item => item.sash.layout());
        // Update sashes enablement
        let previous = false;
        const collapsesDown = this.viewItems.map(i => previous = (i.size - i.view.minimumSize > 0) || previous);
        previous = false;
        const expandsDown = this.viewItems.map(i => previous = (i.view.maximumSize - i.size > 0) || previous);
        const reverseViews = [...this.viewItems].reverse();
        previous = false;
        const collapsesUp = reverseViews.map(i => previous = (i.size - i.view.minimumSize > 0) || previous).reverse();
        previous = false;
        const expandsUp = reverseViews.map(i => previous = (i.view.maximumSize - i.size > 0) || previous).reverse();
        this.sashItems.forEach((s, i) => {
            const min = !(collapsesDown[i] && expandsUp[i + 1]);
            const max = !(expandsDown[i] && collapsesUp[i + 1]);
            if (min && max) {
                s.sash.state = SashState.Disabled;
            }
            else if (min && !max) {
                s.sash.state = SashState.Minimum;
            }
            else if (!min && max) {
                s.sash.state = SashState.Maximum;
            }
            else {
                s.sash.state = SashState.Enabled;
            }
        });
    }
    getSashPosition(sash) {
        let position = 0;
        for (let i = 0; i < this.sashItems.length; i++) {
            position += this.viewItems[i].size;
            if (this.sashItems[i].sash === sash) {
                return position;
            }
        }
        return 0;
    }
    dispose() {
        super.dispose();
        this.viewItems.forEach(i => i.disposable.dispose());
        this.viewItems = [];
        this.sashItems.forEach(i => i.disposable.dispose());
        this.sashItems = [];
    }
}
//# sourceMappingURL=splitview.js.map