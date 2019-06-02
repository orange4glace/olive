/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './media/tree.css';
import { Iterator } from 'base/common/iterator';
import { AbstractTree } from 'base/browser/ui/tree/abstractTree';
import { IndexTreeModel } from 'base/browser/ui/tree/indexTreeModel';
export class IndexTree extends AbstractTree {
    constructor(container, delegate, renderers, rootElement, options = {}) {
        super(container, delegate, renderers, options);
        this.rootElement = rootElement;
    }
    splice(location, deleteCount, toInsert = Iterator.empty()) {
        return this.model.splice(location, deleteCount, toInsert);
    }
    rerender(location) {
        if (location === undefined) {
            this.view.rerender();
            return;
        }
        this.model.rerender(location);
    }
    createModel(view, options) {
        return new IndexTreeModel(view, this.rootElement, options);
    }
}
//# sourceMappingURL=indexTree.js.map