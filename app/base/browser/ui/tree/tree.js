/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ListDragOverEffect } from 'base/browser/ui/list/list';
export var TreeVisibility;
(function (TreeVisibility) {
    /**
     * The tree node should be hidden.
     */
    TreeVisibility[TreeVisibility["Hidden"] = 0] = "Hidden";
    /**
     * The tree node should be visible.
     */
    TreeVisibility[TreeVisibility["Visible"] = 1] = "Visible";
    /**
     * The tree node should be visible if any of its descendants is visible.
     */
    TreeVisibility[TreeVisibility["Recurse"] = 2] = "Recurse";
})(TreeVisibility || (TreeVisibility = {}));
export var TreeDragOverBubble;
(function (TreeDragOverBubble) {
    TreeDragOverBubble[TreeDragOverBubble["Down"] = 0] = "Down";
    TreeDragOverBubble[TreeDragOverBubble["Up"] = 1] = "Up";
})(TreeDragOverBubble || (TreeDragOverBubble = {}));
export const TreeDragOverReactions = {
    acceptBubbleUp() { return { accept: true, bubble: TreeDragOverBubble.Up }; },
    acceptBubbleDown(autoExpand = false) { return { accept: true, bubble: TreeDragOverBubble.Down, autoExpand }; },
    acceptCopyBubbleUp() { return { accept: true, bubble: TreeDragOverBubble.Up, effect: ListDragOverEffect.Copy }; },
    acceptCopyBubbleDown(autoExpand = false) { return { accept: true, bubble: TreeDragOverBubble.Down, effect: ListDragOverEffect.Copy, autoExpand }; }
};
//# sourceMappingURL=tree.js.map