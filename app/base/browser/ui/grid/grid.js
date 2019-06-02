/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './gridview.css';
import { Orientation } from 'base/browser/ui/sash/sash';
import { dispose } from 'base/common/lifecycle';
import { tail2 as tail, equals } from 'base/common/arrays';
import { orthogonal, GridView, Sizing as GridViewSizing } from './gridview';
import { Event, Emitter } from 'base/common/event';
import { $ } from 'base/browser/dom';
export { Orientation } from './gridview';
export var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
function oppositeDirection(direction) {
    switch (direction) {
        case Direction.Up: return Direction.Down;
        case Direction.Down: return Direction.Up;
        case Direction.Left: return Direction.Right;
        case Direction.Right: return Direction.Left;
    }
}
export function isGridBranchNode(node) {
    return !!node.children;
}
function getGridNode(node, location) {
    if (location.length === 0) {
        return node;
    }
    if (!isGridBranchNode(node)) {
        throw new Error('Invalid location');
    }
    const [index, ...rest] = location;
    return getGridNode(node.children[index], rest);
}
function intersects(one, other) {
    return !(one.start >= other.end || other.start >= one.end);
}
function getBoxBoundary(box, direction) {
    const orientation = getDirectionOrientation(direction);
    const offset = direction === Direction.Up ? box.top :
        direction === Direction.Right ? box.left + box.width :
            direction === Direction.Down ? box.top + box.height :
                box.left;
    const range = {
        start: orientation === Orientation.HORIZONTAL ? box.top : box.left,
        end: orientation === Orientation.HORIZONTAL ? box.top + box.height : box.left + box.width
    };
    return { offset, range };
}
function findAdjacentBoxLeafNodes(boxNode, direction, boundary) {
    const result = [];
    function _(boxNode, direction, boundary) {
        if (isGridBranchNode(boxNode)) {
            for (const child of boxNode.children) {
                _(child, direction, boundary);
            }
        }
        else {
            const { offset, range } = getBoxBoundary(boxNode.box, direction);
            if (offset === boundary.offset && intersects(range, boundary.range)) {
                result.push(boxNode);
            }
        }
    }
    _(boxNode, direction, boundary);
    return result;
}
function getLocationOrientation(rootOrientation, location) {
    return location.length % 2 === 0 ? orthogonal(rootOrientation) : rootOrientation;
}
function getDirectionOrientation(direction) {
    return direction === Direction.Up || direction === Direction.Down ? Orientation.VERTICAL : Orientation.HORIZONTAL;
}
function getSize(dimensions, orientation) {
    return orientation === Orientation.HORIZONTAL ? dimensions.width : dimensions.height;
}
export function getRelativeLocation(rootOrientation, location, direction) {
    const orientation = getLocationOrientation(rootOrientation, location);
    const directionOrientation = getDirectionOrientation(direction);
    if (orientation === directionOrientation) {
        let [rest, index] = tail(location);
        if (direction === Direction.Right || direction === Direction.Down) {
            index += 1;
        }
        return [...rest, index];
    }
    else {
        const index = (direction === Direction.Right || direction === Direction.Down) ? 1 : 0;
        return [...location, index];
    }
}
function indexInParent(element) {
    const parentElement = element.parentElement;
    if (!parentElement) {
        throw new Error('Invalid grid element');
    }
    let el = parentElement.firstElementChild;
    let index = 0;
    while (el !== element && el !== parentElement.lastElementChild && el) {
        el = el.nextElementSibling;
        index++;
    }
    return index;
}
/**
 * Find the grid location of a specific DOM element by traversing the parent
 * chain and finding each child index on the way.
 *
 * This will break as soon as DOM structures of the Splitview or Gridview change.
 */
function getGridLocation(element) {
    const parentElement = element.parentElement;
    if (!parentElement) {
        throw new Error('Invalid grid element');
    }
    if (/\bmonaco-grid-view\b/.test(parentElement.className)) {
        return [];
    }
    const index = indexInParent(parentElement);
    const ancestor = parentElement.parentElement.parentElement.parentElement;
    return [...getGridLocation(ancestor), index];
}
export var Sizing;
(function (Sizing) {
    Sizing["Distribute"] = "distribute";
    Sizing["Split"] = "split";
})(Sizing || (Sizing = {}));
export class Grid {
    constructor(view, options = {}) {
        this.views = new Map();
        this.disposables = [];
        this.sashResetSizing = Sizing.Distribute;
        this.gridview = new GridView(options);
        this.disposables.push(this.gridview);
        this.gridview.onDidSashReset(this.doResetViewSize, this, this.disposables);
        this._addView(view, 0, [0]);
    }
    get orientation() { return this.gridview.orientation; }
    set orientation(orientation) { this.gridview.orientation = orientation; }
    get width() { return this.gridview.width; }
    get height() { return this.gridview.height; }
    get minimumWidth() { return this.gridview.minimumWidth; }
    get minimumHeight() { return this.gridview.minimumHeight; }
    get maximumWidth() { return this.gridview.maximumWidth; }
    get maximumHeight() { return this.gridview.maximumHeight; }
    get onDidChange() { return this.gridview.onDidChange; }
    get element() { return this.gridview.element; }
    style(styles) {
        this.gridview.style(styles);
    }
    layout(width, height) {
        this.gridview.layout(width, height);
    }
    hasView(view) {
        return this.views.has(view);
    }
    addView(newView, size, referenceView, direction) {
        if (this.views.has(newView)) {
            throw new Error('Can\'t add same view twice');
        }
        const orientation = getDirectionOrientation(direction);
        if (this.views.size === 1 && this.orientation !== orientation) {
            this.orientation = orientation;
        }
        const referenceLocation = this.getViewLocation(referenceView);
        const location = getRelativeLocation(this.gridview.orientation, referenceLocation, direction);
        let viewSize;
        if (size === Sizing.Split) {
            const [, index] = tail(referenceLocation);
            viewSize = GridViewSizing.Split(index);
        }
        else if (size === Sizing.Distribute) {
            viewSize = GridViewSizing.Distribute;
        }
        else {
            viewSize = size;
        }
        this._addView(newView, viewSize, location);
    }
    _addView(newView, size, location) {
        this.views.set(newView, newView.element);
        this.gridview.addView(newView, size, location);
    }
    removeView(view, sizing) {
        if (this.views.size === 1) {
            throw new Error('Can\'t remove last view');
        }
        const location = this.getViewLocation(view);
        this.gridview.removeView(location, sizing === Sizing.Distribute ? GridViewSizing.Distribute : undefined);
        this.views.delete(view);
    }
    moveView(view, sizing, referenceView, direction) {
        const sourceLocation = this.getViewLocation(view);
        const [sourceParentLocation, from] = tail(sourceLocation);
        const referenceLocation = this.getViewLocation(referenceView);
        const targetLocation = getRelativeLocation(this.gridview.orientation, referenceLocation, direction);
        const [targetParentLocation, to] = tail(targetLocation);
        if (equals(sourceParentLocation, targetParentLocation)) {
            this.gridview.moveView(sourceParentLocation, from, to);
        }
        else {
            this.removeView(view, typeof sizing === 'number' ? undefined : sizing);
            this.addView(view, sizing, referenceView, direction);
        }
    }
    swapViews(from, to) {
        const fromLocation = this.getViewLocation(from);
        const toLocation = this.getViewLocation(to);
        return this.gridview.swapViews(fromLocation, toLocation);
    }
    resizeView(view, size) {
        const location = this.getViewLocation(view);
        return this.gridview.resizeView(location, size);
    }
    getViewSize(view) {
        const location = this.getViewLocation(view);
        const viewSize = this.gridview.getViewSize(location);
        return getLocationOrientation(this.orientation, location) === Orientation.HORIZONTAL ? viewSize.width : viewSize.height;
    }
    // TODO@joao cleanup
    getViewSize2(view) {
        const location = this.getViewLocation(view);
        return this.gridview.getViewSize(location);
    }
    maximizeViewSize(view) {
        const location = this.getViewLocation(view);
        this.gridview.maximizeViewSize(location);
    }
    distributeViewSizes() {
        this.gridview.distributeViewSizes();
    }
    getViews() {
        return this.gridview.getViews();
    }
    getNeighborViews(view, direction, wrap = false) {
        const location = this.getViewLocation(view);
        const root = this.getViews();
        const node = getGridNode(root, location);
        let boundary = getBoxBoundary(node.box, direction);
        if (wrap) {
            if (direction === Direction.Up && node.box.top === 0) {
                boundary = { offset: root.box.top + root.box.height, range: boundary.range };
            }
            else if (direction === Direction.Right && node.box.left + node.box.width === root.box.width) {
                boundary = { offset: 0, range: boundary.range };
            }
            else if (direction === Direction.Down && node.box.top + node.box.height === root.box.height) {
                boundary = { offset: 0, range: boundary.range };
            }
            else if (direction === Direction.Left && node.box.left === 0) {
                boundary = { offset: root.box.left + root.box.width, range: boundary.range };
            }
        }
        return findAdjacentBoxLeafNodes(root, oppositeDirection(direction), boundary)
            .map(node => node.view);
    }
    getViewLocation(view) {
        const element = this.views.get(view);
        if (!element) {
            throw new Error('View not found');
        }
        return getGridLocation(element);
    }
    doResetViewSize(location) {
        if (this.sashResetSizing === Sizing.Split) {
            const orientation = getLocationOrientation(this.orientation, location);
            const firstViewSize = getSize(this.gridview.getViewSize(location), orientation);
            const [parentLocation, index] = tail(location);
            const secondViewSize = getSize(this.gridview.getViewSize([...parentLocation, index + 1]), orientation);
            const totalSize = firstViewSize + secondViewSize;
            this.gridview.resizeView(location, Math.floor(totalSize / 2));
        }
        else {
            const [parentLocation,] = tail(location);
            this.gridview.distributeViewSizes(parentLocation);
        }
    }
    dispose() {
        this.disposables = dispose(this.disposables);
    }
}
export class SerializableGrid extends Grid {
    static serializeNode(node, orientation) {
        const size = orientation === Orientation.VERTICAL ? node.box.width : node.box.height;
        if (!isGridBranchNode(node)) {
            return { type: 'leaf', data: node.view.toJSON(), size };
        }
        return { type: 'branch', data: node.children.map(c => SerializableGrid.serializeNode(c, orthogonal(orientation))), size };
    }
    static deserializeNode(json, orientation, box, deserializer) {
        if (!json || typeof json !== 'object') {
            throw new Error('Invalid JSON');
        }
        if (json.type === 'branch') {
            if (!Array.isArray(json.data)) {
                throw new Error('Invalid JSON: \'data\' property of branch must be an array.');
            }
            const children = [];
            let offset = 0;
            for (const child of json.data) {
                if (typeof child.size !== 'number') {
                    throw new Error('Invalid JSON: \'size\' property of node must be a number.');
                }
                const childBox = orientation === Orientation.HORIZONTAL
                    ? { top: box.top, left: box.left + offset, width: child.size, height: box.height }
                    : { top: box.top + offset, left: box.left, width: box.width, height: child.size };
                children.push(SerializableGrid.deserializeNode(child, orthogonal(orientation), childBox, deserializer));
                offset += child.size;
            }
            return { children, box };
        }
        else if (json.type === 'leaf') {
            const view = deserializer.fromJSON(json.data);
            return { view, box };
        }
        throw new Error('Invalid JSON: \'type\' property must be either \'branch\' or \'leaf\'.');
    }
    static getFirstLeaf(node) {
        if (!isGridBranchNode(node)) {
            return node;
        }
        return SerializableGrid.getFirstLeaf(node.children[0]);
    }
    static deserialize(json, deserializer, options = {}) {
        if (typeof json.orientation !== 'number') {
            throw new Error('Invalid JSON: \'orientation\' property must be a number.');
        }
        else if (typeof json.width !== 'number') {
            throw new Error('Invalid JSON: \'width\' property must be a number.');
        }
        else if (typeof json.height !== 'number') {
            throw new Error('Invalid JSON: \'height\' property must be a number.');
        }
        const orientation = json.orientation;
        const width = json.width;
        const height = json.height;
        const box = { top: 0, left: 0, width, height };
        const root = SerializableGrid.deserializeNode(json.root, orientation, box, deserializer);
        const firstLeaf = SerializableGrid.getFirstLeaf(root);
        if (!firstLeaf) {
            throw new Error('Invalid serialized state, first leaf not found');
        }
        const result = new SerializableGrid(firstLeaf.view, options);
        result.orientation = orientation;
        result.restoreViews(firstLeaf.view, orientation, root);
        result.initialLayoutContext = { width, height, root };
        return result;
    }
    serialize() {
        return {
            root: SerializableGrid.serializeNode(this.getViews(), this.orientation),
            orientation: this.orientation,
            width: this.width,
            height: this.height
        };
    }
    layout(width, height) {
        super.layout(width, height);
        if (this.initialLayoutContext) {
            const widthScale = width / this.initialLayoutContext.width;
            const heightScale = height / this.initialLayoutContext.height;
            this.restoreViewsSize([], this.initialLayoutContext.root, this.orientation, widthScale, heightScale);
            this.initialLayoutContext = undefined;
            this.gridview.trySet2x2();
        }
    }
    /**
     * Recursively restores views which were just deserialized.
     */
    restoreViews(referenceView, orientation, node) {
        if (!isGridBranchNode(node)) {
            return;
        }
        const direction = orientation === Orientation.VERTICAL ? Direction.Down : Direction.Right;
        const firstLeaves = node.children.map(c => SerializableGrid.getFirstLeaf(c));
        for (let i = 1; i < firstLeaves.length; i++) {
            const size = orientation === Orientation.VERTICAL ? firstLeaves[i].box.height : firstLeaves[i].box.width;
            this.addView(firstLeaves[i].view, size, referenceView, direction);
            referenceView = firstLeaves[i].view;
        }
        for (let i = 0; i < node.children.length; i++) {
            this.restoreViews(firstLeaves[i].view, orthogonal(orientation), node.children[i]);
        }
    }
    /**
     * Recursively restores view sizes.
     * This should be called only after the very first layout call.
     */
    restoreViewsSize(location, node, orientation, widthScale, heightScale) {
        if (!isGridBranchNode(node)) {
            return;
        }
        const scale = orientation === Orientation.VERTICAL ? heightScale : widthScale;
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            const childLocation = [...location, i];
            if (i < node.children.length - 1) {
                const size = orientation === Orientation.VERTICAL ? child.box.height : child.box.width;
                this.gridview.resizeView(childLocation, Math.floor(size * scale));
            }
            this.restoreViewsSize(childLocation, child, orthogonal(orientation), widthScale, heightScale);
        }
    }
}
export function sanitizeGridNodeDescriptor(nodeDescriptor) {
    if (nodeDescriptor.groups && nodeDescriptor.groups.length === 0) {
        nodeDescriptor.groups = undefined;
    }
    if (!nodeDescriptor.groups) {
        return;
    }
    let totalDefinedSize = 0;
    let totalDefinedSizeCount = 0;
    for (const child of nodeDescriptor.groups) {
        sanitizeGridNodeDescriptor(child);
        if (child.size) {
            totalDefinedSize += child.size;
            totalDefinedSizeCount++;
        }
    }
    const totalUndefinedSize = totalDefinedSizeCount > 0 ? totalDefinedSize : 1;
    const totalUndefinedSizeCount = nodeDescriptor.groups.length - totalDefinedSizeCount;
    const eachUndefinedSize = totalUndefinedSize / totalUndefinedSizeCount;
    for (const child of nodeDescriptor.groups) {
        if (!child.size) {
            child.size = eachUndefinedSize;
        }
    }
}
function createSerializedNode(nodeDescriptor) {
    if (nodeDescriptor.groups) {
        return { type: 'branch', data: nodeDescriptor.groups.map(c => createSerializedNode(c)), size: nodeDescriptor.size };
    }
    else {
        return { type: 'leaf', data: null, size: nodeDescriptor.size };
    }
}
function getDimensions(node, orientation) {
    if (node.type === 'branch') {
        const childrenDimensions = node.data.map(c => getDimensions(c, orthogonal(orientation)));
        if (orientation === Orientation.VERTICAL) {
            const width = node.size || (childrenDimensions.length === 0 ? undefined : Math.max(...childrenDimensions.map(d => d.width || 0)));
            const height = childrenDimensions.length === 0 ? undefined : childrenDimensions.reduce((r, d) => r + (d.height || 0), 0);
            return { width, height };
        }
        else {
            const width = childrenDimensions.length === 0 ? undefined : childrenDimensions.reduce((r, d) => r + (d.width || 0), 0);
            const height = node.size || (childrenDimensions.length === 0 ? undefined : Math.max(...childrenDimensions.map(d => d.height || 0)));
            return { width, height };
        }
    }
    else {
        const width = orientation === Orientation.VERTICAL ? node.size : undefined;
        const height = orientation === Orientation.VERTICAL ? undefined : node.size;
        return { width, height };
    }
}
export function createSerializedGrid(gridDescriptor) {
    sanitizeGridNodeDescriptor(gridDescriptor);
    const root = createSerializedNode(gridDescriptor);
    const { width, height } = getDimensions(root, gridDescriptor.orientation);
    return {
        root,
        orientation: gridDescriptor.orientation,
        width: width || 1,
        height: height || 1
    };
}
export class View {
    constructor(view) {
        this.view = view;
        this.element = $('.grid-view-view');
        this.visible = false;
        this.orientation = Orientation.HORIZONTAL;
        this.onDidChangeVisibility = new Emitter();
        this.show();
        this.onDidChange = Event.any(this.onDidChangeVisibility.event, Event.filter(view.onDidChange, () => this.visible));
    }
    get minimumWidth() { return this.visible ? this.view.minimumWidth : 0; }
    get maximumWidth() { return this.visible ? this.view.maximumWidth : (this.orientation === Orientation.HORIZONTAL ? 0 : Number.POSITIVE_INFINITY); }
    get minimumHeight() { return this.visible ? this.view.minimumHeight : 0; }
    get maximumHeight() { return this.visible ? this.view.maximumHeight : (this.orientation === Orientation.VERTICAL ? 0 : Number.POSITIVE_INFINITY); }
    get priority() { return this.view.priority; }
    get snapSize() { return this.visible ? this.view.snapSize : undefined; }
    show() {
        if (this.visible) {
            return;
        }
        this.visible = true;
        this.element.appendChild(this.view.element);
        this.onDidChangeVisibility.fire(typeof this.width === 'number' ? { width: this.width, height: this.height } : undefined);
    }
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        this.element.removeChild(this.view.element);
        this.onDidChangeVisibility.fire(undefined);
    }
    layout(width, height, orientation) {
        this.orientation = orientation;
        if (!this.visible) {
            return;
        }
        this.view.layout(width, height, orientation);
        this.width = width;
        this.height = height;
    }
}
//# sourceMappingURL=grid.js.map