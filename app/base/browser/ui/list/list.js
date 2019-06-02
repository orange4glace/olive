/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export var ListAriaRootRole;
(function (ListAriaRootRole) {
    /** default tree structure role */
    ListAriaRootRole["TREE"] = "tree";
    /** role='tree' can interfere with screenreaders reading nested elements inside the tree row. Use FORM in that case. */
    ListAriaRootRole["FORM"] = "form";
})(ListAriaRootRole || (ListAriaRootRole = {}));
export var ListDragOverEffect;
(function (ListDragOverEffect) {
    ListDragOverEffect[ListDragOverEffect["Copy"] = 0] = "Copy";
    ListDragOverEffect[ListDragOverEffect["Move"] = 1] = "Move";
})(ListDragOverEffect || (ListDragOverEffect = {}));
export const ListDragOverReactions = {
    reject() { return { accept: false }; },
    accept() { return { accept: true }; },
};
//# sourceMappingURL=list.js.map