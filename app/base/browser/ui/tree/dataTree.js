/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { AbstractTree } from 'base/browser/ui/tree/abstractTree';
import { ObjectTreeModel } from 'base/browser/ui/tree/objectTreeModel';
import { Iterator } from 'base/common/iterator';
export class DataTree extends AbstractTree {
    constructor(container, delegate, renderers, dataSource, options = {}) {
        super(container, delegate, renderers, options);
        this.dataSource = dataSource;
        this.nodesByIdentity = new Map();
        this.identityProvider = options.identityProvider;
    }
    // Model
    getInput() {
        return this.input;
    }
    setInput(input, viewState) {
        if (viewState && !this.identityProvider) {
            throw new Error('Can\'t restore tree view state without an identity provider');
        }
        this.input = input;
        if (!viewState) {
            this._refresh(input);
            return;
        }
        const focus = [];
        const selection = [];
        const isCollapsed = (element) => {
            const id = this.identityProvider.getId(element).toString();
            return viewState.expanded.indexOf(id) === -1;
        };
        const onDidCreateNode = (node) => {
            const id = this.identityProvider.getId(node.element).toString();
            if (viewState.focus.indexOf(id) > -1) {
                focus.push(node.element);
            }
            if (viewState.selection.indexOf(id) > -1) {
                selection.push(node.element);
            }
        };
        this._refresh(input, isCollapsed, onDidCreateNode);
        this.setFocus(focus);
        this.setSelection(selection);
    }
    updateChildren(element = this.input) {
        if (typeof this.input === 'undefined') {
            throw new Error('Tree input not set');
        }
        let isCollapsed;
        if (this.identityProvider) {
            isCollapsed = element => {
                const id = this.identityProvider.getId(element).toString();
                const node = this.nodesByIdentity.get(id);
                if (!node) {
                    return undefined;
                }
                return node.collapsed;
            };
        }
        this._refresh(element, isCollapsed);
    }
    resort(element = this.input, recursive = true) {
        this.model.resort((element === this.input ? null : element), recursive);
    }
    // View
    refresh(element) {
        if (element === undefined) {
            this.view.rerender();
            return;
        }
        this.model.rerender(element);
    }
    // Implementation
    _refresh(element, isCollapsed, onDidCreateNode) {
        let onDidDeleteNode;
        if (this.identityProvider) {
            const insertedElements = new Set();
            const outerOnDidCreateNode = onDidCreateNode;
            onDidCreateNode = (node) => {
                const id = this.identityProvider.getId(node.element).toString();
                insertedElements.add(id);
                this.nodesByIdentity.set(id, node);
                if (outerOnDidCreateNode) {
                    outerOnDidCreateNode(node);
                }
            };
            onDidDeleteNode = (node) => {
                const id = this.identityProvider.getId(node.element).toString();
                if (!insertedElements.has(id)) {
                    this.nodesByIdentity.delete(id);
                }
            };
        }
        this.model.setChildren((element === this.input ? null : element), this.iterate(element, isCollapsed).elements, onDidCreateNode, onDidDeleteNode);
    }
    iterate(element, isCollapsed) {
        const children = this.dataSource.getChildren(element);
        const elements = Iterator.map(Iterator.fromArray(children), element => {
            const { elements: children, size } = this.iterate(element, isCollapsed);
            const collapsed = size === 0 ? undefined : (isCollapsed && isCollapsed(element));
            return { element, children, collapsed };
        });
        return { elements, size: children.length };
    }
    createModel(view, options) {
        return new ObjectTreeModel(view, options);
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
        const root = this.model.getNode();
        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node !== root && node.collapsible && !node.collapsed) {
                expanded.push(getId(node.element));
            }
            queue.push(...node.children);
        }
        return { focus, selection, expanded };
    }
}
//# sourceMappingURL=dataTree.js.map