/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Iterator, getSequenceIterator } from 'base/common/iterator';
import { IndexTreeModel } from 'base/browser/ui/tree/indexTreeModel';
export class ObjectTreeModel {
    constructor(list, options = {}) {
        this.rootRef = null;
        this.nodes = new Map();
        this.model = new IndexTreeModel(list, null, options);
        this.onDidSplice = this.model.onDidSplice;
        this.onDidChangeCollapseState = this.model.onDidChangeCollapseState;
        this.onDidChangeRenderNodeCount = this.model.onDidChangeRenderNodeCount;
        if (options.sorter) {
            this.sorter = {
                compare(a, b) {
                    return options.sorter.compare(a.element, b.element);
                }
            };
        }
    }
    get size() { return this.nodes.size; }
    setChildren(element, children, onDidCreateNode, onDidDeleteNode) {
        const location = this.getElementLocation(element);
        return this._setChildren(location, this.preserveCollapseState(children), onDidCreateNode, onDidDeleteNode);
    }
    _setChildren(location, children, onDidCreateNode, onDidDeleteNode) {
        const insertedElements = new Set();
        const _onDidCreateNode = (node) => {
            insertedElements.add(node.element);
            this.nodes.set(node.element, node);
            if (onDidCreateNode) {
                onDidCreateNode(node);
            }
        };
        const _onDidDeleteNode = (node) => {
            if (!insertedElements.has(node.element)) {
                this.nodes.delete(node.element);
            }
            if (onDidDeleteNode) {
                onDidDeleteNode(node);
            }
        };
        return this.model.splice([...location, 0], Number.MAX_VALUE, children, _onDidCreateNode, _onDidDeleteNode);
    }
    preserveCollapseState(elements) {
        let iterator = elements ? getSequenceIterator(elements) : Iterator.empty();
        if (this.sorter) {
            iterator = Iterator.fromArray(Iterator.collect(iterator).sort(this.sorter.compare.bind(this.sorter)));
        }
        return Iterator.map(iterator, treeElement => {
            const node = this.nodes.get(treeElement.element);
            if (!node) {
                return Object.assign({}, treeElement, { children: this.preserveCollapseState(treeElement.children) });
            }
            const collapsible = typeof treeElement.collapsible === 'boolean' ? treeElement.collapsible : node.collapsible;
            const collapsed = typeof treeElement.collapsed !== 'undefined' ? treeElement.collapsed : node.collapsed;
            return Object.assign({}, treeElement, { collapsible,
                collapsed, children: this.preserveCollapseState(treeElement.children) });
        });
    }
    rerender(element) {
        const location = this.getElementLocation(element);
        this.model.rerender(location);
    }
    resort(element = null, recursive = true) {
        if (!this.sorter) {
            return;
        }
        const location = this.getElementLocation(element);
        const node = this.model.getNode(location);
        this._setChildren(location, this.resortChildren(node, recursive));
    }
    resortChildren(node, recursive, first = true) {
        let childrenNodes = Iterator.fromArray(node.children);
        if (recursive || first) {
            childrenNodes = Iterator.fromArray(Iterator.collect(childrenNodes).sort(this.sorter.compare.bind(this.sorter)));
        }
        return Iterator.map(childrenNodes, node => ({
            element: node.element,
            collapsible: node.collapsible,
            collapsed: node.collapsed,
            children: this.resortChildren(node, recursive, false)
        }));
    }
    getParentElement(ref = null) {
        const location = this.getElementLocation(ref);
        return this.model.getParentElement(location);
    }
    getFirstElementChild(ref = null) {
        const location = this.getElementLocation(ref);
        return this.model.getFirstElementChild(location);
    }
    getLastElementAncestor(ref = null) {
        const location = this.getElementLocation(ref);
        return this.model.getLastElementAncestor(location);
    }
    getListIndex(element) {
        const location = this.getElementLocation(element);
        return this.model.getListIndex(location);
    }
    getListRenderCount(element) {
        const location = this.getElementLocation(element);
        return this.model.getListRenderCount(location);
    }
    isCollapsible(element) {
        const location = this.getElementLocation(element);
        return this.model.isCollapsible(location);
    }
    isCollapsed(element) {
        const location = this.getElementLocation(element);
        return this.model.isCollapsed(location);
    }
    setCollapsed(element, collapsed, recursive) {
        const location = this.getElementLocation(element);
        return this.model.setCollapsed(location, collapsed, recursive);
    }
    expandTo(element) {
        const location = this.getElementLocation(element);
        this.model.expandTo(location);
    }
    refilter() {
        this.model.refilter();
    }
    getNode(element = null) {
        if (element === null) {
            return this.model.getNode(this.model.rootRef);
        }
        const node = this.nodes.get(element);
        if (!node) {
            throw new Error(`Tree element not found: ${element}`);
        }
        return node;
    }
    getNodeLocation(node) {
        return node.element;
    }
    getParentNodeLocation(element) {
        const node = this.nodes.get(element);
        if (!node) {
            throw new Error(`Tree element not found: ${element}`);
        }
        return node.parent.element;
    }
    getElementLocation(element) {
        if (element === null) {
            return [];
        }
        const node = this.nodes.get(element);
        if (!node) {
            throw new Error(`Tree element not found: ${element}`);
        }
        return this.model.getNodeLocation(node);
    }
}
//# sourceMappingURL=objectTreeModel.js.map