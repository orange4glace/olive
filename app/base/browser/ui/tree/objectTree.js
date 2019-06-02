/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { AbstractTree } from 'base/browser/ui/tree/abstractTree';
import { ObjectTreeModel } from 'base/browser/ui/tree/objectTreeModel';
export class ObjectTree extends AbstractTree {
    constructor(container, delegate, renderers, options = {}) {
        super(container, delegate, renderers, options);
    }
    setChildren(element, children, onDidCreateNode, onDidDeleteNode) {
        return this.model.setChildren(element, children, onDidCreateNode, onDidDeleteNode);
    }
    rerender(element) {
        if (element === undefined) {
            this.view.rerender();
            return;
        }
        this.model.rerender(element);
    }
    resort(element, recursive = true) {
        this.model.resort(element, recursive);
    }
    createModel(view, options) {
        return new ObjectTreeModel(view, options);
    }
}
//# sourceMappingURL=objectTree.js.map