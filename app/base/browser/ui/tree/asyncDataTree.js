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
import { ComposedTreeDelegate } from 'base/browser/ui/tree/abstractTree';
import { ObjectTree } from 'base/browser/ui/tree/objectTree';
import { dispose } from 'base/common/lifecycle';
import { Emitter, Event } from 'base/common/event';
import { timeout, createCancelablePromise } from 'base/common/async';
import { Iterator } from 'base/common/iterator';
import { ElementsDragAndDropData } from 'base/browser/ui/list/listView';
import { isPromiseCanceledError, onUnexpectedError } from 'base/common/errors';
import { toggleClass } from 'base/browser/dom';
import { values } from 'base/common/map';
function createAsyncDataTreeNode(props) {
    return Object.assign({}, props, { children: [], loading: false, stale: true, slow: false });
}
function isAncestor(ancestor, descendant) {
    if (!descendant.parent) {
        return false;
    }
    else if (descendant.parent === ancestor) {
        return true;
    }
    else {
        return isAncestor(ancestor, descendant.parent);
    }
}
function intersects(node, other) {
    return node === other || isAncestor(node, other) || isAncestor(other, node);
}
class AsyncDataTreeNodeWrapper {
    constructor(node) {
        this.node = node;
    }
    get element() { return this.node.element.element; }
    get parent() { return this.node.parent && new AsyncDataTreeNodeWrapper(this.node.parent); }
    get children() { return this.node.children.map(node => new AsyncDataTreeNodeWrapper(node)); }
    get depth() { return this.node.depth; }
    get visibleChildrenCount() { return this.node.visibleChildrenCount; }
    get visibleChildIndex() { return this.node.visibleChildIndex; }
    get collapsible() { return this.node.collapsible; }
    get collapsed() { return this.node.collapsed; }
    get visible() { return this.node.visible; }
    get filterData() { return this.node.filterData; }
}
class DataTreeRenderer {
    constructor(renderer, onDidChangeTwistieState) {
        this.renderer = renderer;
        this.onDidChangeTwistieState = onDidChangeTwistieState;
        this.renderedNodes = new Map();
        this.disposables = [];
        this.templateId = renderer.templateId;
    }
    renderTemplate(container) {
        const templateData = this.renderer.renderTemplate(container);
        return { templateData };
    }
    renderElement(node, index, templateData, dynamicHeightProbing) {
        this.renderer.renderElement(new AsyncDataTreeNodeWrapper(node), index, templateData.templateData, dynamicHeightProbing);
    }
    renderTwistie(element, twistieElement) {
        toggleClass(twistieElement, 'loading', element.slow);
        return false;
    }
    disposeElement(node, index, templateData, dynamicHeightProbing) {
        if (this.renderer.disposeElement) {
            this.renderer.disposeElement(new AsyncDataTreeNodeWrapper(node), index, templateData.templateData, dynamicHeightProbing);
        }
    }
    disposeTemplate(templateData) {
        this.renderer.disposeTemplate(templateData.templateData);
    }
    dispose() {
        this.renderedNodes.clear();
        this.disposables = dispose(this.disposables);
    }
}
function asTreeEvent(e) {
    return {
        browserEvent: e.browserEvent,
        elements: e.elements.map(e => e.element)
    };
}
function asTreeMouseEvent(e) {
    return {
        browserEvent: e.browserEvent,
        element: e.element && e.element.element
    };
}
function asTreeContextMenuEvent(e) {
    return {
        browserEvent: e.browserEvent,
        element: e.element && e.element.element,
        anchor: e.anchor
    };
}
export var ChildrenResolutionReason;
(function (ChildrenResolutionReason) {
    ChildrenResolutionReason[ChildrenResolutionReason["Refresh"] = 0] = "Refresh";
    ChildrenResolutionReason[ChildrenResolutionReason["Expand"] = 1] = "Expand";
})(ChildrenResolutionReason || (ChildrenResolutionReason = {}));
function asAsyncDataTreeDragAndDropData(data) {
    if (data instanceof ElementsDragAndDropData) {
        const nodes = data.elements;
        return new ElementsDragAndDropData(nodes.map(node => node.element));
    }
    return data;
}
class AsyncDataTreeNodeListDragAndDrop {
    constructor(dnd) {
        this.dnd = dnd;
    }
    getDragURI(node) {
        return this.dnd.getDragURI(node.element);
    }
    getDragLabel(nodes) {
        if (this.dnd.getDragLabel) {
            return this.dnd.getDragLabel(nodes.map(node => node.element));
        }
        return undefined;
    }
    onDragStart(data, originalEvent) {
        if (this.dnd.onDragStart) {
            this.dnd.onDragStart(asAsyncDataTreeDragAndDropData(data), originalEvent);
        }
    }
    onDragOver(data, targetNode, targetIndex, originalEvent, raw = true) {
        return this.dnd.onDragOver(asAsyncDataTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, originalEvent);
    }
    drop(data, targetNode, targetIndex, originalEvent) {
        this.dnd.drop(asAsyncDataTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, originalEvent);
    }
}
function asObjectTreeOptions(options) {
    return options && Object.assign({}, options, { collapseByDefault: true, identityProvider: options.identityProvider && {
            getId(el) {
                return options.identityProvider.getId(el.element);
            }
        }, dnd: options.dnd && new AsyncDataTreeNodeListDragAndDrop(options.dnd), multipleSelectionController: options.multipleSelectionController && {
            isSelectionSingleChangeEvent(e) {
                return options.multipleSelectionController.isSelectionSingleChangeEvent(Object.assign({}, e, { element: e.element }));
            },
            isSelectionRangeChangeEvent(e) {
                return options.multipleSelectionController.isSelectionRangeChangeEvent(Object.assign({}, e, { element: e.element }));
            }
        }, accessibilityProvider: options.accessibilityProvider && {
            getAriaLabel(e) {
                return options.accessibilityProvider.getAriaLabel(e.element);
            }
        }, filter: options.filter && {
            filter(e, parentVisibility) {
                return options.filter.filter(e.element, parentVisibility);
            }
        }, keyboardNavigationLabelProvider: options.keyboardNavigationLabelProvider && {
            getKeyboardNavigationLabel(e) {
                return options.keyboardNavigationLabelProvider.getKeyboardNavigationLabel(e.element);
            }
        }, sorter: undefined, expandOnlyOnTwistieClick: typeof options.expandOnlyOnTwistieClick === 'undefined' ? undefined : (typeof options.expandOnlyOnTwistieClick !== 'function' ? options.expandOnlyOnTwistieClick : (e => options.expandOnlyOnTwistieClick(e.element))), ariaSetProvider: undefined });
}
function asTreeElement(node, viewStateContext) {
    let collapsed;
    if (viewStateContext && viewStateContext.viewState.expanded && node.id) {
        collapsed = viewStateContext.viewState.expanded.indexOf(node.id) === -1;
    }
    return {
        element: node,
        children: node.hasChildren ? Iterator.map(Iterator.fromArray(node.children), child => asTreeElement(child, viewStateContext)) : [],
        collapsible: node.hasChildren,
        collapsed
    };
}
function dfs(node, fn) {
    fn(node);
    node.children.forEach(child => dfs(child, fn));
}
export class AsyncDataTree {
    constructor(container, delegate, renderers, dataSource, options = {}) {
        this.dataSource = dataSource;
        this.nodes = new Map();
        this.subTreeRefreshPromises = new Map();
        this.refreshPromises = new Map();
        this._onDidRender = new Emitter();
        this._onDidChangeNodeSlowState = new Emitter();
        this.disposables = [];
        this.identityProvider = options.identityProvider;
        this.autoExpandSingleChildren = typeof options.autoExpandSingleChildren === 'undefined' ? false : options.autoExpandSingleChildren;
        this.sorter = options.sorter;
        const objectTreeDelegate = new ComposedTreeDelegate(delegate);
        const objectTreeRenderers = renderers.map(r => new DataTreeRenderer(r, this._onDidChangeNodeSlowState.event));
        const objectTreeOptions = asObjectTreeOptions(options) || {};
        this.tree = new ObjectTree(container, objectTreeDelegate, objectTreeRenderers, objectTreeOptions);
        this.root = createAsyncDataTreeNode({
            element: undefined,
            parent: null,
            hasChildren: true
        });
        if (this.identityProvider) {
            this.root = Object.assign({}, this.root, { id: null });
        }
        this.nodes.set(null, this.root);
        this.tree.onDidChangeCollapseState(this._onDidChangeCollapseState, this, this.disposables);
    }
    get onDidScroll() { return this.tree.onDidScroll; }
    get onDidChangeFocus() { return Event.map(this.tree.onDidChangeFocus, asTreeEvent); }
    get onDidChangeSelection() { return Event.map(this.tree.onDidChangeSelection, asTreeEvent); }
    get onDidOpen() { return Event.map(this.tree.onDidOpen, asTreeEvent); }
    get onKeyDown() { return this.tree.onKeyDown; }
    get onMouseClick() { return Event.map(this.tree.onMouseClick, asTreeMouseEvent); }
    get onMouseDblClick() { return Event.map(this.tree.onMouseDblClick, asTreeMouseEvent); }
    get onContextMenu() { return Event.map(this.tree.onContextMenu, asTreeContextMenuEvent); }
    get onDidFocus() { return this.tree.onDidFocus; }
    get onDidBlur() { return this.tree.onDidBlur; }
    get onDidUpdateOptions() { return this.tree.onDidUpdateOptions; }
    get filterOnType() { return this.tree.filterOnType; }
    get openOnSingleClick() { return this.tree.openOnSingleClick; }
    get onDidDispose() { return this.tree.onDidDispose; }
    updateOptions(options = {}) {
        this.tree.updateOptions(options);
    }
    // Widget
    getHTMLElement() {
        return this.tree.getHTMLElement();
    }
    get contentHeight() {
        return this.tree.contentHeight;
    }
    get onDidChangeContentHeight() {
        return this.tree.onDidChangeContentHeight;
    }
    get scrollTop() {
        return this.tree.scrollTop;
    }
    set scrollTop(scrollTop) {
        this.tree.scrollTop = scrollTop;
    }
    get scrollHeight() {
        return this.tree.scrollHeight;
    }
    get renderHeight() {
        return this.tree.renderHeight;
    }
    get firstVisibleElement() {
        return this.tree.firstVisibleElement.element;
    }
    get lastVisibleElement() {
        return this.tree.lastVisibleElement.element;
    }
    domFocus() {
        this.tree.domFocus();
    }
    layout(height, width) {
        this.tree.layout(height, width);
    }
    style(styles) {
        this.tree.style(styles);
    }
    // Model
    getInput() {
        return this.root.element;
    }
    setInput(input, viewState) {
        return __awaiter(this, void 0, void 0, function* () {
            this.refreshPromises.forEach(promise => promise.cancel());
            this.refreshPromises.clear();
            this.root.element = input;
            const viewStateContext = viewState && { viewState, focus: [], selection: [] };
            yield this.updateChildren(input, true, viewStateContext);
            if (viewStateContext) {
                this.tree.setFocus(viewStateContext.focus);
                this.tree.setSelection(viewStateContext.selection);
            }
            if (viewState && typeof viewState.scrollTop === 'number') {
                this.scrollTop = viewState.scrollTop;
            }
        });
    }
    updateChildren(element = this.root.element, recursive = true, viewStateContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.root.element === 'undefined') {
                throw new Error('Tree input not set');
            }
            if (this.root.loading) {
                yield this.subTreeRefreshPromises.get(this.root);
                yield Event.toPromise(this._onDidRender.event);
            }
            yield this.refreshAndRenderNode(this.getDataNode(element), recursive, ChildrenResolutionReason.Refresh, viewStateContext);
        });
    }
    resort(element = this.root.element, recursive = true) {
        this.tree.resort(this.getDataNode(element), recursive);
    }
    hasNode(element) {
        return element === this.root.element || this.nodes.has(element);
    }
    // View
    rerender(element) {
        if (element === undefined) {
            this.tree.rerender();
            return;
        }
        const node = this.getDataNode(element);
        this.tree.rerender(node);
    }
    updateWidth(element) {
        const node = this.getDataNode(element);
        this.tree.updateWidth(node);
    }
    // Tree
    getNode(element = this.root.element) {
        const dataNode = this.getDataNode(element);
        const node = this.tree.getNode(dataNode === this.root ? null : dataNode);
        return new AsyncDataTreeNodeWrapper(node);
    }
    collapse(element, recursive = false) {
        const node = this.getDataNode(element);
        return this.tree.collapse(node === this.root ? null : node, recursive);
    }
    expand(element, recursive = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.root.element === 'undefined') {
                throw new Error('Tree input not set');
            }
            if (this.root.loading) {
                yield this.subTreeRefreshPromises.get(this.root);
                yield Event.toPromise(this._onDidRender.event);
            }
            const node = this.getDataNode(element);
            if (node !== this.root && !node.loading && !this.tree.isCollapsed(node)) {
                return false;
            }
            const result = this.tree.expand(node === this.root ? null : node, recursive);
            if (node.loading) {
                yield this.subTreeRefreshPromises.get(node);
                yield Event.toPromise(this._onDidRender.event);
            }
            return result;
        });
    }
    toggleCollapsed(element, recursive = false) {
        return this.tree.toggleCollapsed(this.getDataNode(element), recursive);
    }
    expandAll() {
        this.tree.expandAll();
    }
    collapseAll() {
        this.tree.collapseAll();
    }
    isCollapsible(element) {
        return this.tree.isCollapsible(this.getDataNode(element));
    }
    isCollapsed(element) {
        return this.tree.isCollapsed(this.getDataNode(element));
    }
    toggleKeyboardNavigation() {
        this.tree.toggleKeyboardNavigation();
    }
    refilter() {
        this.tree.refilter();
    }
    setSelection(elements, browserEvent) {
        const nodes = elements.map(e => this.getDataNode(e));
        this.tree.setSelection(nodes, browserEvent);
    }
    getSelection() {
        const nodes = this.tree.getSelection();
        return nodes.map(n => n.element);
    }
    setFocus(elements, browserEvent) {
        const nodes = elements.map(e => this.getDataNode(e));
        this.tree.setFocus(nodes, browserEvent);
    }
    focusNext(n = 1, loop = false, browserEvent) {
        this.tree.focusNext(n, loop, browserEvent);
    }
    focusPrevious(n = 1, loop = false, browserEvent) {
        this.tree.focusPrevious(n, loop, browserEvent);
    }
    focusNextPage(browserEvent) {
        this.tree.focusNextPage(browserEvent);
    }
    focusPreviousPage(browserEvent) {
        this.tree.focusPreviousPage(browserEvent);
    }
    focusLast(browserEvent) {
        this.tree.focusLast(browserEvent);
    }
    focusFirst(browserEvent) {
        this.tree.focusFirst(browserEvent);
    }
    getFocus() {
        const nodes = this.tree.getFocus();
        return nodes.map(n => n.element);
    }
    open(elements) {
        const nodes = elements.map(e => this.getDataNode(e));
        this.tree.open(nodes);
    }
    reveal(element, relativeTop) {
        this.tree.reveal(this.getDataNode(element), relativeTop);
    }
    getRelativeTop(element) {
        return this.tree.getRelativeTop(this.getDataNode(element));
    }
    // Tree navigation
    getParentElement(element) {
        const node = this.tree.getParentElement(this.getDataNode(element));
        return (node && node.element);
    }
    getFirstElementChild(element = this.root.element) {
        const dataNode = this.getDataNode(element);
        const node = this.tree.getFirstElementChild(dataNode === this.root ? null : dataNode);
        return (node && node.element);
    }
    // Implementation
    getDataNode(element) {
        const node = this.nodes.get((element === this.root.element ? null : element));
        if (!node) {
            throw new Error(`Data tree node not found: ${element}`);
        }
        return node;
    }
    refreshAndRenderNode(node, recursive, reason, viewStateContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshNode(node, recursive, viewStateContext);
            this.render(node, viewStateContext);
            if (node !== this.root && this.autoExpandSingleChildren && reason === ChildrenResolutionReason.Expand) {
                const treeNode = this.tree.getNode(node);
                const visibleChildren = treeNode.children.filter(node => node.visible);
                if (visibleChildren.length === 1) {
                    yield this.tree.expand(visibleChildren[0].element, false);
                }
            }
        });
    }
    refreshNode(node, recursive, viewStateContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            this.subTreeRefreshPromises.forEach((refreshPromise, refreshNode) => {
                if (!result && intersects(refreshNode, node)) {
                    result = refreshPromise.then(() => this.refreshNode(node, recursive, viewStateContext));
                }
            });
            if (result) {
                return result;
            }
            result = this.doRefreshSubTree(node, recursive, viewStateContext);
            this.subTreeRefreshPromises.set(node, result);
            try {
                yield result;
            }
            finally {
                this.subTreeRefreshPromises.delete(node);
            }
        });
    }
    doRefreshSubTree(node, recursive, viewStateContext) {
        return __awaiter(this, void 0, void 0, function* () {
            node.loading = true;
            try {
                const childrenToRefresh = yield this.doRefreshNode(node, recursive, viewStateContext);
                node.stale = false;
                yield Promise.all(childrenToRefresh.map(child => this.doRefreshSubTree(child, recursive, viewStateContext)));
            }
            finally {
                node.loading = false;
            }
        });
    }
    doRefreshNode(node, recursive, viewStateContext) {
        return __awaiter(this, void 0, void 0, function* () {
            node.hasChildren = !!this.dataSource.hasChildren(node.element);
            let childrenPromise;
            if (!node.hasChildren) {
                childrenPromise = Promise.resolve([]);
            }
            else {
                const slowTimeout = timeout(800);
                slowTimeout.then(() => {
                    node.slow = true;
                    this._onDidChangeNodeSlowState.fire(node);
                }, _ => null);
                childrenPromise = this.doGetChildren(node)
                    .finally(() => slowTimeout.cancel());
            }
            try {
                const children = yield childrenPromise;
                return this.setChildren(node, children, recursive, viewStateContext);
            }
            catch (err) {
                if (node !== this.root) {
                    this.tree.collapse(node === this.root ? null : node);
                }
                if (isPromiseCanceledError(err)) {
                    return [];
                }
                throw err;
            }
            finally {
                if (node.slow) {
                    node.slow = false;
                    this._onDidChangeNodeSlowState.fire(node);
                }
            }
        });
    }
    doGetChildren(node) {
        let result = this.refreshPromises.get(node);
        if (result) {
            return result;
        }
        result = createCancelablePromise(() => __awaiter(this, void 0, void 0, function* () {
            const children = yield this.dataSource.getChildren(node.element);
            if (this.sorter) {
                children.sort(this.sorter.compare.bind(this.sorter));
            }
            return children;
        }));
        this.refreshPromises.set(node, result);
        return result.finally(() => this.refreshPromises.delete(node));
    }
    _onDidChangeCollapseState({ node, deep }) {
        if (!node.collapsed && node.element.stale) {
            if (deep) {
                this.collapse(node.element.element);
            }
            else {
                this.refreshAndRenderNode(node.element, false, ChildrenResolutionReason.Expand)
                    .catch(onUnexpectedError);
            }
        }
    }
    setChildren(node, childrenElements, recursive, viewStateContext) {
        // perf: if the node was and still is a leaf, avoid all this hassle
        if (node.children.length === 0 && childrenElements.length === 0) {
            return [];
        }
        const nodesToForget = new Map();
        const childrenTreeNodesById = new Map();
        for (const child of node.children) {
            nodesToForget.set(child.element, child);
            if (this.identityProvider) {
                childrenTreeNodesById.set(child.id, this.tree.getNode(child));
            }
        }
        const childrenToRefresh = [];
        const children = childrenElements.map(element => {
            if (!this.identityProvider) {
                return createAsyncDataTreeNode({
                    element,
                    parent: node,
                    hasChildren: !!this.dataSource.hasChildren(element)
                });
            }
            const id = this.identityProvider.getId(element).toString();
            const childNode = childrenTreeNodesById.get(id);
            if (childNode) {
                const asyncDataTreeNode = childNode.element;
                nodesToForget.delete(asyncDataTreeNode.element);
                this.nodes.delete(asyncDataTreeNode.element);
                this.nodes.set(element, asyncDataTreeNode);
                asyncDataTreeNode.element = element;
                asyncDataTreeNode.hasChildren = !!this.dataSource.hasChildren(element);
                if (recursive) {
                    if (childNode.collapsed) {
                        dfs(asyncDataTreeNode, node => node.stale = true);
                    }
                    else {
                        childrenToRefresh.push(asyncDataTreeNode);
                    }
                }
                return asyncDataTreeNode;
            }
            const childAsyncDataTreeNode = createAsyncDataTreeNode({
                element,
                parent: node,
                id,
                hasChildren: !!this.dataSource.hasChildren(element)
            });
            if (viewStateContext && viewStateContext.viewState.focus && viewStateContext.viewState.focus.indexOf(id) > -1) {
                viewStateContext.focus.push(childAsyncDataTreeNode);
            }
            if (viewStateContext && viewStateContext.viewState.selection && viewStateContext.viewState.selection.indexOf(id) > -1) {
                viewStateContext.selection.push(childAsyncDataTreeNode);
            }
            if (viewStateContext && viewStateContext.viewState.expanded && viewStateContext.viewState.expanded.indexOf(id) > -1) {
                childrenToRefresh.push(childAsyncDataTreeNode);
            }
            return childAsyncDataTreeNode;
        });
        for (const node of values(nodesToForget)) {
            dfs(node, node => this.nodes.delete(node.element));
        }
        for (const child of children) {
            this.nodes.set(child.element, child);
        }
        node.children.splice(0, node.children.length, ...children);
        return childrenToRefresh;
    }
    render(node, viewStateContext) {
        const children = node.children.map(c => asTreeElement(c, viewStateContext));
        this.tree.setChildren(node === this.root ? null : node, children);
        this._onDidRender.fire();
    }
    // view state
    getViewState() {
        if (!this.identityProvider) {
            throw new Error('Can\'t get tree view state without an identity provider');
        }
        const getId = (element) => this.identityProvider.getId(element).toString();
        const focus = this.getFocus().map(getId);
        const selection = this.getSelection().map(getId);
        const expanded = [];
        const root = this.tree.getNode();
        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node !== root && node.collapsible && !node.collapsed) {
                expanded.push(getId(node.element.element));
            }
            queue.push(...node.children);
        }
        return { focus, selection, expanded, scrollTop: this.scrollTop };
    }
    dispose() {
        dispose(this.disposables);
    }
}
//# sourceMappingURL=asyncDataTree.js.map