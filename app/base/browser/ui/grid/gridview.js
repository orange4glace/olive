/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './gridview.css';
import { Event, Emitter, Relay } from 'base/common/event';
import { Orientation } from 'base/browser/ui/sash/sash';
import { SplitView, Sizing } from 'base/browser/ui/splitview/splitview';
import { Disposable, toDisposable } from 'base/common/lifecycle';
import { $ } from 'base/browser/dom';
import { tail2 as tail } from 'base/common/arrays';
import { Color } from 'base/common/color';
export { Sizing, LayoutPriority } from 'base/browser/ui/splitview/splitview';
export { Orientation } from 'base/browser/ui/sash/sash';
export function orthogonal(orientation) {
    return orientation === Orientation.VERTICAL ? Orientation.HORIZONTAL : Orientation.VERTICAL;
}
export function isGridBranchNode(node) {
    return !!node.children;
}
const defaultStyles = {
    separatorBorder: Color.transparent
};
class BranchNode {
    constructor(orientation, styles, proportionalLayout, size = 0, orthogonalSize = 0) {
        this.orientation = orientation;
        this.proportionalLayout = proportionalLayout;
        this.children = [];
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this.childrenChangeDisposable = Disposable.None;
        this._onDidSashReset = new Emitter();
        this.onDidSashReset = this._onDidSashReset.event;
        this.splitviewSashResetDisposable = Disposable.None;
        this.childrenSashResetDisposable = Disposable.None;
        this._styles = styles;
        this._size = size;
        this._orthogonalSize = orthogonalSize;
        this.element = $('.monaco-grid-branch-node');
        this.splitview = new SplitView(this.element, { orientation, styles, proportionalLayout });
        this.splitview.layout(size);
        const onDidSashReset = Event.map(this.splitview.onDidSashReset, i => [i]);
        this.splitviewSashResetDisposable = onDidSashReset(this._onDidSashReset.fire, this._onDidSashReset);
    }
    get size() { return this._size; }
    get orthogonalSize() { return this._orthogonalSize; }
    get styles() { return this._styles; }
    get width() {
        return this.orientation === Orientation.HORIZONTAL ? this.size : this.orthogonalSize;
    }
    get height() {
        return this.orientation === Orientation.HORIZONTAL ? this.orthogonalSize : this.size;
    }
    get minimumSize() {
        return this.children.length === 0 ? 0 : Math.max(...this.children.map(c => c.minimumOrthogonalSize));
    }
    get maximumSize() {
        return Math.min(...this.children.map(c => c.maximumOrthogonalSize));
    }
    get minimumOrthogonalSize() {
        return this.splitview.minimumSize;
    }
    get maximumOrthogonalSize() {
        return this.splitview.maximumSize;
    }
    get minimumWidth() {
        return this.orientation === Orientation.HORIZONTAL ? this.minimumOrthogonalSize : this.minimumSize;
    }
    get minimumHeight() {
        return this.orientation === Orientation.HORIZONTAL ? this.minimumSize : this.minimumOrthogonalSize;
    }
    get maximumWidth() {
        return this.orientation === Orientation.HORIZONTAL ? this.maximumOrthogonalSize : this.maximumSize;
    }
    get maximumHeight() {
        return this.orientation === Orientation.HORIZONTAL ? this.maximumSize : this.maximumOrthogonalSize;
    }
    get orthogonalStartSash() { return this.splitview.orthogonalStartSash; }
    set orthogonalStartSash(sash) { this.splitview.orthogonalStartSash = sash; }
    get orthogonalEndSash() { return this.splitview.orthogonalEndSash; }
    set orthogonalEndSash(sash) { this.splitview.orthogonalEndSash = sash; }
    style(styles) {
        this._styles = styles;
        this.splitview.style(styles);
        for (const child of this.children) {
            if (child instanceof BranchNode) {
                child.style(styles);
            }
        }
    }
    layout(size) {
        this._orthogonalSize = size;
        for (const child of this.children) {
            child.orthogonalLayout(size);
        }
    }
    orthogonalLayout(size) {
        this._size = size;
        this.splitview.layout(size);
    }
    addChild(node, size, index) {
        if (index < 0 || index > this.children.length) {
            throw new Error('Invalid index');
        }
        this.splitview.addView(node, size, index);
        this._addChild(node, index);
        this.onDidChildrenChange();
    }
    _addChild(node, index) {
        const first = index === 0;
        const last = index === this.children.length;
        this.children.splice(index, 0, node);
        node.orthogonalStartSash = this.splitview.sashes[index - 1];
        node.orthogonalEndSash = this.splitview.sashes[index];
        if (!first) {
            this.children[index - 1].orthogonalEndSash = this.splitview.sashes[index - 1];
        }
        if (!last) {
            this.children[index + 1].orthogonalStartSash = this.splitview.sashes[index];
        }
    }
    removeChild(index, sizing) {
        if (index < 0 || index >= this.children.length) {
            throw new Error('Invalid index');
        }
        this.splitview.removeView(index, sizing);
        this._removeChild(index);
        this.onDidChildrenChange();
    }
    _removeChild(index) {
        const first = index === 0;
        const last = index === this.children.length - 1;
        const [child] = this.children.splice(index, 1);
        if (!first) {
            this.children[index - 1].orthogonalEndSash = this.splitview.sashes[index - 1];
        }
        if (!last) { // [0,1,2,3] (2) => [0,1,3]
            this.children[index].orthogonalStartSash = this.splitview.sashes[Math.max(index - 1, 0)];
        }
        return child;
    }
    moveChild(from, to) {
        if (from === to) {
            return;
        }
        if (from < 0 || from >= this.children.length) {
            throw new Error('Invalid from index');
        }
        if (to < 0 || to > this.children.length) {
            throw new Error('Invalid to index');
        }
        if (from < to) {
            to--;
        }
        this.splitview.moveView(from, to);
        const child = this._removeChild(from);
        this._addChild(child, to);
    }
    swapChildren(from, to) {
        if (from === to) {
            return;
        }
        if (from < 0 || from >= this.children.length) {
            throw new Error('Invalid from index');
        }
        if (to < 0 || to >= this.children.length) {
            throw new Error('Invalid to index');
        }
        this.splitview.swapViews(from, to);
        [this.children[from].orthogonalStartSash, this.children[from].orthogonalEndSash, this.children[to].orthogonalStartSash, this.children[to].orthogonalEndSash] = [this.children[to].orthogonalStartSash, this.children[to].orthogonalEndSash, this.children[from].orthogonalStartSash, this.children[from].orthogonalEndSash];
        [this.children[from], this.children[to]] = [this.children[to], this.children[from]];
    }
    resizeChild(index, size) {
        if (index < 0 || index >= this.children.length) {
            throw new Error('Invalid index');
        }
        this.splitview.resizeView(index, size);
    }
    distributeViewSizes(recursive = false) {
        this.splitview.distributeViewSizes();
        if (recursive) {
            for (const child of this.children) {
                if (child instanceof BranchNode) {
                    child.distributeViewSizes(true);
                }
            }
        }
    }
    getChildSize(index) {
        if (index < 0 || index >= this.children.length) {
            throw new Error('Invalid index');
        }
        return this.splitview.getViewSize(index);
    }
    onDidChildrenChange() {
        const onDidChildrenChange = Event.map(Event.any(...this.children.map(c => c.onDidChange)), () => undefined);
        this.childrenChangeDisposable.dispose();
        this.childrenChangeDisposable = onDidChildrenChange(this._onDidChange.fire, this._onDidChange);
        const onDidChildrenSashReset = Event.any(...this.children.map((c, i) => Event.map(c.onDidSashReset, location => [i, ...location])));
        this.childrenSashResetDisposable.dispose();
        this.childrenSashResetDisposable = onDidChildrenSashReset(this._onDidSashReset.fire, this._onDidSashReset);
        this._onDidChange.fire(undefined);
    }
    trySet2x2(other) {
        if (this.children.length !== 2 || other.children.length !== 2) {
            return Disposable.None;
        }
        if (this.getChildSize(0) !== other.getChildSize(0)) {
            return Disposable.None;
        }
        const [firstChild, secondChild] = this.children;
        const [otherFirstChild, otherSecondChild] = other.children;
        if (!(firstChild instanceof LeafNode) || !(secondChild instanceof LeafNode)) {
            return Disposable.None;
        }
        if (!(otherFirstChild instanceof LeafNode) || !(otherSecondChild instanceof LeafNode)) {
            return Disposable.None;
        }
        if (this.orientation === Orientation.VERTICAL) {
            secondChild.linkedWidthNode = otherFirstChild.linkedHeightNode = firstChild;
            firstChild.linkedWidthNode = otherSecondChild.linkedHeightNode = secondChild;
            otherSecondChild.linkedWidthNode = firstChild.linkedHeightNode = otherFirstChild;
            otherFirstChild.linkedWidthNode = secondChild.linkedHeightNode = otherSecondChild;
        }
        else {
            otherFirstChild.linkedWidthNode = secondChild.linkedHeightNode = firstChild;
            otherSecondChild.linkedWidthNode = firstChild.linkedHeightNode = secondChild;
            firstChild.linkedWidthNode = otherSecondChild.linkedHeightNode = otherFirstChild;
            secondChild.linkedWidthNode = otherFirstChild.linkedHeightNode = otherSecondChild;
        }
        const mySash = this.splitview.sashes[0];
        const otherSash = other.splitview.sashes[0];
        mySash.linkedSash = otherSash;
        otherSash.linkedSash = mySash;
        this._onDidChange.fire(undefined);
        other._onDidChange.fire(undefined);
        return toDisposable(() => {
            mySash.linkedSash = otherSash.linkedSash = undefined;
            firstChild.linkedHeightNode = firstChild.linkedWidthNode = undefined;
            secondChild.linkedHeightNode = secondChild.linkedWidthNode = undefined;
            otherFirstChild.linkedHeightNode = otherFirstChild.linkedWidthNode = undefined;
            otherSecondChild.linkedHeightNode = otherSecondChild.linkedWidthNode = undefined;
        });
    }
    dispose() {
        for (const child of this.children) {
            child.dispose();
        }
        this._onDidChange.dispose();
        this._onDidSashReset.dispose();
        this.splitviewSashResetDisposable.dispose();
        this.childrenSashResetDisposable.dispose();
        this.childrenChangeDisposable.dispose();
        this.splitview.dispose();
    }
}
class LeafNode {
    constructor(view, orientation, orthogonalSize = 0) {
        this.view = view;
        this.orientation = orientation;
        this._size = 0;
        this.onDidSashReset = Event.None;
        this._onDidLinkedWidthNodeChange = new Relay();
        this._linkedWidthNode = undefined;
        this._onDidLinkedHeightNodeChange = new Relay();
        this._linkedHeightNode = undefined;
        this._onDidSetLinkedNode = new Emitter();
        this._orthogonalSize = orthogonalSize;
        this._onDidViewChange = Event.map(this.view.onDidChange, e => e && (this.orientation === Orientation.VERTICAL ? e.width : e.height));
        this.onDidChange = Event.any(this._onDidViewChange, this._onDidSetLinkedNode.event, this._onDidLinkedWidthNodeChange.event, this._onDidLinkedHeightNodeChange.event);
    }
    get size() { return this._size; }
    get orthogonalSize() { return this._orthogonalSize; }
    get linkedWidthNode() { return this._linkedWidthNode; }
    set linkedWidthNode(node) {
        this._onDidLinkedWidthNodeChange.input = node ? node._onDidViewChange : Event.None;
        this._linkedWidthNode = node;
        this._onDidSetLinkedNode.fire(undefined);
    }
    get linkedHeightNode() { return this._linkedHeightNode; }
    set linkedHeightNode(node) {
        this._onDidLinkedHeightNodeChange.input = node ? node._onDidViewChange : Event.None;
        this._linkedHeightNode = node;
        this._onDidSetLinkedNode.fire(undefined);
    }
    get width() {
        return this.orientation === Orientation.HORIZONTAL ? this.orthogonalSize : this.size;
    }
    get height() {
        return this.orientation === Orientation.HORIZONTAL ? this.size : this.orthogonalSize;
    }
    get element() {
        return this.view.element;
    }
    get minimumWidth() {
        return this.linkedWidthNode ? Math.max(this.linkedWidthNode.view.minimumWidth, this.view.minimumWidth) : this.view.minimumWidth;
    }
    get maximumWidth() {
        return this.linkedWidthNode ? Math.min(this.linkedWidthNode.view.maximumWidth, this.view.maximumWidth) : this.view.maximumWidth;
    }
    get minimumHeight() {
        return this.linkedHeightNode ? Math.max(this.linkedHeightNode.view.minimumHeight, this.view.minimumHeight) : this.view.minimumHeight;
    }
    get maximumHeight() {
        return this.linkedHeightNode ? Math.min(this.linkedHeightNode.view.maximumHeight, this.view.maximumHeight) : this.view.maximumHeight;
    }
    get minimumSize() {
        return this.orientation === Orientation.HORIZONTAL ? this.minimumHeight : this.minimumWidth;
    }
    get maximumSize() {
        return this.orientation === Orientation.HORIZONTAL ? this.maximumHeight : this.maximumWidth;
    }
    get priority() {
        return this.view.priority;
    }
    get snapSize() {
        return this.view.snapSize;
    }
    get minimumOrthogonalSize() {
        return this.orientation === Orientation.HORIZONTAL ? this.minimumWidth : this.minimumHeight;
    }
    get maximumOrthogonalSize() {
        return this.orientation === Orientation.HORIZONTAL ? this.maximumWidth : this.maximumHeight;
    }
    set orthogonalStartSash(sash) {
        // noop
    }
    set orthogonalEndSash(sash) {
        // noop
    }
    layout(size) {
        this._size = size;
        return this.view.layout(this.width, this.height, orthogonal(this.orientation));
    }
    orthogonalLayout(size) {
        this._orthogonalSize = size;
        return this.view.layout(this.width, this.height, orthogonal(this.orientation));
    }
    dispose() { }
}
function flipNode(node, size, orthogonalSize) {
    if (node instanceof BranchNode) {
        const result = new BranchNode(orthogonal(node.orientation), node.styles, node.proportionalLayout, size, orthogonalSize);
        let totalSize = 0;
        for (let i = node.children.length - 1; i >= 0; i--) {
            const child = node.children[i];
            const childSize = child instanceof BranchNode ? child.orthogonalSize : child.size;
            let newSize = node.size === 0 ? 0 : Math.round((size * childSize) / node.size);
            totalSize += newSize;
            // The last view to add should adjust to rounding errors
            if (i === 0) {
                newSize += size - totalSize;
            }
            result.addChild(flipNode(child, orthogonalSize, newSize), newSize, 0);
        }
        return result;
    }
    else {
        return new LeafNode(node.view, orthogonal(node.orientation), orthogonalSize);
    }
}
export class GridView {
    constructor(options = {}) {
        this.onDidSashResetRelay = new Relay();
        this.onDidSashReset = this.onDidSashResetRelay.event;
        this.disposable2x2 = Disposable.None;
        this._onDidChange = new Relay();
        this.onDidChange = this._onDidChange.event;
        this.element = $('.monaco-grid-view');
        this.styles = options.styles || defaultStyles;
        this.proportionalLayout = typeof options.proportionalLayout !== 'undefined' ? !!options.proportionalLayout : true;
        this.root = new BranchNode(Orientation.VERTICAL, this.styles, this.proportionalLayout);
    }
    get root() {
        return this._root;
    }
    set root(root) {
        const oldRoot = this._root;
        if (oldRoot) {
            this.element.removeChild(oldRoot.element);
            oldRoot.dispose();
        }
        this._root = root;
        this.element.appendChild(root.element);
        this.onDidSashResetRelay.input = root.onDidSashReset;
        this._onDidChange.input = Event.map(root.onDidChange, () => undefined); // TODO
    }
    get orientation() {
        return this._root.orientation;
    }
    set orientation(orientation) {
        if (this._root.orientation === orientation) {
            return;
        }
        const { size, orthogonalSize } = this._root;
        this.root = flipNode(this._root, orthogonalSize, size);
        this.root.layout(size);
        this.root.orthogonalLayout(orthogonalSize);
    }
    get width() { return this.root.width; }
    get height() { return this.root.height; }
    get minimumWidth() { return this.root.minimumWidth; }
    get minimumHeight() { return this.root.minimumHeight; }
    get maximumWidth() { return this.root.maximumHeight; }
    get maximumHeight() { return this.root.maximumHeight; }
    style(styles) {
        this.styles = styles;
        this.root.style(styles);
    }
    layout(width, height) {
        const [size, orthogonalSize] = this.root.orientation === Orientation.HORIZONTAL ? [height, width] : [width, height];
        this.root.layout(size);
        this.root.orthogonalLayout(orthogonalSize);
    }
    addView(view, size, location) {
        this.disposable2x2.dispose();
        this.disposable2x2 = Disposable.None;
        const [rest, index] = tail(location);
        const [pathToParent, parent] = this.getNode(rest);
        if (parent instanceof BranchNode) {
            const node = new LeafNode(view, orthogonal(parent.orientation), parent.orthogonalSize);
            parent.addChild(node, size, index);
        }
        else {
            const [, grandParent] = tail(pathToParent);
            const [, parentIndex] = tail(rest);
            grandParent.removeChild(parentIndex);
            const newParent = new BranchNode(parent.orientation, this.styles, this.proportionalLayout, parent.size, parent.orthogonalSize);
            grandParent.addChild(newParent, parent.size, parentIndex);
            newParent.orthogonalLayout(parent.orthogonalSize);
            const newSibling = new LeafNode(parent.view, grandParent.orientation, parent.size);
            newParent.addChild(newSibling, 0, 0);
            if (typeof size !== 'number' && size.type === 'split') {
                size = Sizing.Split(0);
            }
            const node = new LeafNode(view, grandParent.orientation, parent.size);
            newParent.addChild(node, size, index);
        }
    }
    removeView(location, sizing) {
        this.disposable2x2.dispose();
        this.disposable2x2 = Disposable.None;
        const [rest, index] = tail(location);
        const [pathToParent, parent] = this.getNode(rest);
        if (!(parent instanceof BranchNode)) {
            throw new Error('Invalid location');
        }
        const node = parent.children[index];
        if (!(node instanceof LeafNode)) {
            throw new Error('Invalid location');
        }
        parent.removeChild(index, sizing);
        if (parent.children.length === 0) {
            throw new Error('Invalid grid state');
        }
        if (parent.children.length > 1) {
            return node.view;
        }
        if (pathToParent.length === 0) { // parent is root
            const sibling = parent.children[0];
            if (sibling instanceof LeafNode) {
                return node.view;
            }
            // we must promote sibling to be the new root
            parent.removeChild(0);
            this.root = sibling;
            return node.view;
        }
        const [, grandParent] = tail(pathToParent);
        const [, parentIndex] = tail(rest);
        const sibling = parent.children[0];
        parent.removeChild(0);
        const sizes = grandParent.children.map((_, i) => grandParent.getChildSize(i));
        grandParent.removeChild(parentIndex, sizing);
        if (sibling instanceof BranchNode) {
            sizes.splice(parentIndex, 1, ...sibling.children.map(c => c.size));
            for (let i = 0; i < sibling.children.length; i++) {
                const child = sibling.children[i];
                grandParent.addChild(child, child.size, parentIndex + i);
            }
        }
        else {
            const newSibling = new LeafNode(sibling.view, orthogonal(sibling.orientation), sibling.size);
            grandParent.addChild(newSibling, sibling.orthogonalSize, parentIndex);
        }
        for (let i = 0; i < sizes.length; i++) {
            grandParent.resizeChild(i, sizes[i]);
        }
        return node.view;
    }
    moveView(parentLocation, from, to) {
        const [, parent] = this.getNode(parentLocation);
        if (!(parent instanceof BranchNode)) {
            throw new Error('Invalid location');
        }
        parent.moveChild(from, to);
    }
    swapViews(from, to) {
        const [fromRest, fromIndex] = tail(from);
        const [, fromParent] = this.getNode(fromRest);
        if (!(fromParent instanceof BranchNode)) {
            throw new Error('Invalid from location');
        }
        const fromSize = fromParent.getChildSize(fromIndex);
        const fromNode = fromParent.children[fromIndex];
        if (!(fromNode instanceof LeafNode)) {
            throw new Error('Invalid from location');
        }
        const [toRest, toIndex] = tail(to);
        const [, toParent] = this.getNode(toRest);
        if (!(toParent instanceof BranchNode)) {
            throw new Error('Invalid to location');
        }
        const toSize = toParent.getChildSize(toIndex);
        const toNode = toParent.children[toIndex];
        if (!(toNode instanceof LeafNode)) {
            throw new Error('Invalid to location');
        }
        if (fromParent === toParent) {
            fromParent.swapChildren(fromIndex, toIndex);
        }
        else {
            fromParent.removeChild(fromIndex);
            toParent.removeChild(toIndex);
            fromParent.addChild(toNode, fromSize, fromIndex);
            toParent.addChild(fromNode, toSize, toIndex);
            fromParent.layout(fromParent.orthogonalSize);
            toParent.layout(toParent.orthogonalSize);
        }
    }
    resizeView(location, size) {
        const [rest, index] = tail(location);
        const [, parent] = this.getNode(rest);
        if (!(parent instanceof BranchNode)) {
            throw new Error('Invalid location');
        }
        parent.resizeChild(index, size);
    }
    getViewSize(location) {
        const [, node] = this.getNode(location);
        return { width: node.width, height: node.height };
    }
    maximizeViewSize(location) {
        const [ancestors, node] = this.getNode(location);
        if (!(node instanceof LeafNode)) {
            throw new Error('Invalid location');
        }
        for (let i = 0; i < ancestors.length; i++) {
            ancestors[i].resizeChild(location[i], Number.POSITIVE_INFINITY);
        }
    }
    distributeViewSizes(location) {
        if (!location) {
            this.root.distributeViewSizes(true);
            return;
        }
        const [, node] = this.getNode(location);
        if (!(node instanceof BranchNode)) {
            throw new Error('Invalid location');
        }
        node.distributeViewSizes();
    }
    getViews() {
        return this._getViews(this.root, this.orientation, { top: 0, left: 0, width: this.width, height: this.height });
    }
    _getViews(node, orientation, box) {
        if (node instanceof LeafNode) {
            return { view: node.view, box };
        }
        const children = [];
        let offset = 0;
        for (const child of node.children) {
            const childOrientation = orthogonal(orientation);
            const childBox = orientation === Orientation.HORIZONTAL
                ? { top: box.top, left: box.left + offset, width: child.width, height: box.height }
                : { top: box.top + offset, left: box.left, width: box.width, height: child.height };
            children.push(this._getViews(child, childOrientation, childBox));
            offset += orientation === Orientation.HORIZONTAL ? child.width : child.height;
        }
        return { children, box };
    }
    getNode(location, node = this.root, path = []) {
        if (location.length === 0) {
            return [path, node];
        }
        if (!(node instanceof BranchNode)) {
            throw new Error('Invalid location');
        }
        const [index, ...rest] = location;
        if (index < 0 || index >= node.children.length) {
            throw new Error('Invalid location');
        }
        const child = node.children[index];
        path.push(node);
        return this.getNode(rest, child, path);
    }
    trySet2x2() {
        this.disposable2x2.dispose();
        this.disposable2x2 = Disposable.None;
        if (this.root.children.length !== 2) {
            return;
        }
        const [first, second] = this.root.children;
        if (!(first instanceof BranchNode) || !(second instanceof BranchNode)) {
            return;
        }
        this.disposable2x2 = first.trySet2x2(second);
    }
    dispose() {
        this.onDidSashResetRelay.dispose();
        this.root.dispose();
        if (this.element && this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
}
//# sourceMappingURL=gridview.js.map