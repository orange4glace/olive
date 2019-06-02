/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './media/tree.css';
import { dispose, Disposable, toDisposable } from 'base/common/lifecycle';
import { List, mightProducePrintableCharacter, MouseController } from 'base/browser/ui/list/listWidget';
import { append, $, toggleClass, getDomNodePagePosition, removeClass, addClass, hasClass } from 'base/browser/dom';
import { Event, Relay, Emitter, EventBufferer } from 'base/common/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { KeyCode } from 'base/common/keyCodes';
import { TreeDragOverBubble, TreeVisibility } from 'base/browser/ui/tree/tree';
import { StaticDND, DragAndDropData } from 'base/browser/dnd';
import { range, equals, distinctES6 } from 'base/common/arrays';
import { ElementsDragAndDropData } from 'base/browser/ui/list/listView';
import { domEvent } from 'base/browser/event';
import { fuzzyScore, FuzzyScore } from 'base/common/filters';
import { getVisibleState, isFilterResult } from 'base/browser/ui/tree/indexTreeModel';
import { localize } from 'nls';
import { disposableTimeout } from 'base/common/async';
import { isMacintosh } from 'base/common/platform';
import { values } from 'base/common/map';
import { clamp } from 'base/common/numbers';
function asTreeDragAndDropData(data) {
    if (data instanceof ElementsDragAndDropData) {
        const nodes = data.elements;
        return new ElementsDragAndDropData(nodes.map(node => node.element));
    }
    return data;
}
class TreeNodeListDragAndDrop {
    constructor(modelProvider, dnd) {
        this.modelProvider = modelProvider;
        this.dnd = dnd;
        this.autoExpandDisposable = Disposable.None;
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
            this.dnd.onDragStart(asTreeDragAndDropData(data), originalEvent);
        }
    }
    onDragOver(data, targetNode, targetIndex, originalEvent, raw = true) {
        const result = this.dnd.onDragOver(asTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, originalEvent);
        const didChangeAutoExpandNode = this.autoExpandNode !== targetNode;
        if (didChangeAutoExpandNode) {
            this.autoExpandDisposable.dispose();
            this.autoExpandNode = targetNode;
        }
        if (typeof targetNode === 'undefined') {
            return result;
        }
        if (didChangeAutoExpandNode && typeof result !== 'boolean' && result.autoExpand) {
            this.autoExpandDisposable = disposableTimeout(() => {
                const model = this.modelProvider();
                const ref = model.getNodeLocation(targetNode);
                if (model.isCollapsed(ref)) {
                    model.setCollapsed(ref, false);
                }
                this.autoExpandNode = undefined;
            }, 500);
        }
        if (typeof result === 'boolean' || !result.accept || typeof result.bubble === 'undefined') {
            if (!raw) {
                const accept = typeof result === 'boolean' ? result : result.accept;
                const effect = typeof result === 'boolean' ? undefined : result.effect;
                return { accept, effect, feedback: [targetIndex] };
            }
            return result;
        }
        if (result.bubble === TreeDragOverBubble.Up) {
            const parentNode = targetNode.parent;
            const model = this.modelProvider();
            const parentIndex = parentNode && model.getListIndex(model.getNodeLocation(parentNode));
            return this.onDragOver(data, parentNode, parentIndex, originalEvent, false);
        }
        const model = this.modelProvider();
        const ref = model.getNodeLocation(targetNode);
        const start = model.getListIndex(ref);
        const length = model.getListRenderCount(ref);
        return Object.assign({}, result, { feedback: range(start, start + length) });
    }
    drop(data, targetNode, targetIndex, originalEvent) {
        this.autoExpandDisposable.dispose();
        this.autoExpandNode = undefined;
        this.dnd.drop(asTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, originalEvent);
    }
}
function asListOptions(modelProvider, options) {
    return options && Object.assign({}, options, { identityProvider: options.identityProvider && {
            getId(el) {
                return options.identityProvider.getId(el.element);
            }
        }, dnd: options.dnd && new TreeNodeListDragAndDrop(modelProvider, options.dnd), multipleSelectionController: options.multipleSelectionController && {
            isSelectionSingleChangeEvent(e) {
                return options.multipleSelectionController.isSelectionSingleChangeEvent(Object.assign({}, e, { element: e.element }));
            },
            isSelectionRangeChangeEvent(e) {
                return options.multipleSelectionController.isSelectionRangeChangeEvent(Object.assign({}, e, { element: e.element }));
            }
        }, accessibilityProvider: options.accessibilityProvider && {
            getAriaLabel(e) {
                return options.accessibilityProvider.getAriaLabel(e.element);
            },
            getAriaLevel(node) {
                return node.depth;
            }
        }, keyboardNavigationLabelProvider: options.keyboardNavigationLabelProvider && Object.assign({}, options.keyboardNavigationLabelProvider, { getKeyboardNavigationLabel(node) {
                return options.keyboardNavigationLabelProvider.getKeyboardNavigationLabel(node.element);
            } }), enableKeyboardNavigation: options.simpleKeyboardNavigation, ariaSetProvider: {
            getSetSize(node) {
                return node.parent.visibleChildrenCount;
            },
            getPosInSet(node) {
                return node.visibleChildIndex + 1;
            }
        } });
}
export class ComposedTreeDelegate {
    constructor(delegate) {
        this.delegate = delegate;
    }
    getHeight(element) {
        return this.delegate.getHeight(element.element);
    }
    getTemplateId(element) {
        return this.delegate.getTemplateId(element.element);
    }
    hasDynamicHeight(element) {
        return !!this.delegate.hasDynamicHeight && this.delegate.hasDynamicHeight(element.element);
    }
    setDynamicHeight(element, height) {
        if (this.delegate.setDynamicHeight) {
            this.delegate.setDynamicHeight(element.element, height);
        }
    }
}
class TreeRenderer {
    constructor(renderer, onDidChangeCollapseState, options = {}) {
        this.renderer = renderer;
        this.renderedElements = new Map();
        this.renderedNodes = new Map();
        this.indent = TreeRenderer.DefaultIndent;
        this.disposables = [];
        this.templateId = renderer.templateId;
        this.updateOptions(options);
        Event.map(onDidChangeCollapseState, e => e.node)(this.onDidChangeNodeTwistieState, this, this.disposables);
        if (renderer.onDidChangeTwistieState) {
            renderer.onDidChangeTwistieState(this.onDidChangeTwistieState, this, this.disposables);
        }
    }
    updateOptions(options = {}) {
        if (typeof options.indent !== 'undefined') {
            this.indent = clamp(options.indent, 0, 40);
        }
        this.renderedNodes.forEach((templateData, node) => {
            templateData.twistie.style.marginLeft = `${node.depth * this.indent}px`;
        });
    }
    renderTemplate(container) {
        const el = append(container, $('.monaco-tl-row'));
        const twistie = append(el, $('.monaco-tl-twistie'));
        const contents = append(el, $('.monaco-tl-contents'));
        const templateData = this.renderer.renderTemplate(contents);
        return { container, twistie, templateData };
    }
    renderElement(node, index, templateData, dynamicHeightProbing) {
        if (!dynamicHeightProbing) {
            this.renderedNodes.set(node, templateData);
            this.renderedElements.set(node.element, node);
        }
        const indent = TreeRenderer.DefaultIndent + (node.depth - 1) * this.indent;
        templateData.twistie.style.marginLeft = `${indent}px`;
        this.update(node, templateData);
        this.renderer.renderElement(node, index, templateData.templateData, dynamicHeightProbing);
    }
    disposeElement(node, index, templateData, dynamicHeightProbing) {
        if (this.renderer.disposeElement) {
            this.renderer.disposeElement(node, index, templateData.templateData, dynamicHeightProbing);
        }
        if (!dynamicHeightProbing) {
            this.renderedNodes.delete(node);
            this.renderedElements.delete(node.element);
        }
    }
    disposeTemplate(templateData) {
        this.renderer.disposeTemplate(templateData.templateData);
    }
    onDidChangeTwistieState(element) {
        const node = this.renderedElements.get(element);
        if (!node) {
            return;
        }
        this.onDidChangeNodeTwistieState(node);
    }
    onDidChangeNodeTwistieState(node) {
        const templateData = this.renderedNodes.get(node);
        if (!templateData) {
            return;
        }
        this.update(node, templateData);
    }
    update(node, templateData) {
        if (this.renderer.renderTwistie) {
            this.renderer.renderTwistie(node.element, templateData.twistie);
        }
        toggleClass(templateData.twistie, 'collapsible', node.collapsible);
        toggleClass(templateData.twistie, 'collapsed', node.collapsible && node.collapsed);
        if (node.collapsible) {
            templateData.container.setAttribute('aria-expanded', String(!node.collapsed));
        }
        else {
            templateData.container.removeAttribute('aria-expanded');
        }
    }
    dispose() {
        this.renderedNodes.clear();
        this.renderedElements.clear();
        this.disposables = dispose(this.disposables);
    }
}
TreeRenderer.DefaultIndent = 8;
class TypeFilter {
    constructor(tree, keyboardNavigationLabelProvider, _filter) {
        this.tree = tree;
        this.keyboardNavigationLabelProvider = keyboardNavigationLabelProvider;
        this._filter = _filter;
        this._totalCount = 0;
        this._matchCount = 0;
        this.disposables = [];
        tree.onWillRefilter(this.reset, this, this.disposables);
    }
    get totalCount() { return this._totalCount; }
    get matchCount() { return this._matchCount; }
    set pattern(pattern) {
        this._pattern = pattern;
        this._lowercasePattern = pattern.toLowerCase();
    }
    filter(element, parentVisibility) {
        if (this._filter) {
            const result = this._filter.filter(element, parentVisibility);
            if (this.tree.options.simpleKeyboardNavigation) {
                return result;
            }
            let visibility;
            if (typeof result === 'boolean') {
                visibility = result ? TreeVisibility.Visible : TreeVisibility.Hidden;
            }
            else if (isFilterResult(result)) {
                visibility = getVisibleState(result.visibility);
            }
            else {
                visibility = result;
            }
            if (visibility === TreeVisibility.Hidden) {
                return false;
            }
        }
        this._totalCount++;
        if (this.tree.options.simpleKeyboardNavigation || !this._pattern) {
            this._matchCount++;
            return { data: FuzzyScore.Default, visibility: true };
        }
        const label = this.keyboardNavigationLabelProvider.getKeyboardNavigationLabel(element);
        const labelStr = label && label.toString();
        if (typeof labelStr === 'undefined') {
            return { data: FuzzyScore.Default, visibility: true };
        }
        const score = fuzzyScore(this._pattern, this._lowercasePattern, 0, labelStr, labelStr.toLowerCase(), 0, true);
        if (!score) {
            if (this.tree.options.filterOnType) {
                return TreeVisibility.Recurse;
            }
            else {
                return { data: FuzzyScore.Default, visibility: true };
            }
            // DEMO: smarter filter ?
            // return parentVisibility === TreeVisibility.Visible ? true : TreeVisibility.Recurse;
        }
        this._matchCount++;
        return { data: score, visibility: true };
    }
    reset() {
        this._totalCount = 0;
        this._matchCount = 0;
    }
    dispose() {
        this.disposables = dispose(this.disposables);
    }
}
class TypeFilterController {
    constructor(tree, model, view, filter, keyboardNavigationLabelProvider) {
        this.tree = tree;
        this.view = view;
        this.filter = filter;
        this.keyboardNavigationLabelProvider = keyboardNavigationLabelProvider;
        this._enabled = false;
        this._pattern = '';
        this._onDidChangeEmptyState = new Emitter();
        this.onDidChangeEmptyState = Event.latch(this._onDidChangeEmptyState.event);
        this.positionClassName = 'ne';
        this.automaticKeyboardNavigation = true;
        this.triggered = false;
        this._onDidChangePattern = new Emitter();
        this.onDidChangePattern = this._onDidChangePattern.event;
        this.enabledDisposables = [];
        this.disposables = [];
        this.domNode = $(`.monaco-list-type-filter.${this.positionClassName}`);
        this.domNode.draggable = true;
        domEvent(this.domNode, 'dragstart')(this.onDragStart, this, this.disposables);
        this.messageDomNode = append(view.getHTMLElement(), $(`.monaco-list-type-filter-message`));
        this.labelDomNode = append(this.domNode, $('span.label'));
        const controls = append(this.domNode, $('.controls'));
        this._filterOnType = !!tree.options.filterOnType;
        this.filterOnTypeDomNode = append(controls, $('input.filter'));
        this.filterOnTypeDomNode.type = 'checkbox';
        this.filterOnTypeDomNode.checked = this._filterOnType;
        this.filterOnTypeDomNode.tabIndex = -1;
        this.updateFilterOnTypeTitle();
        domEvent(this.filterOnTypeDomNode, 'input')(this.onDidChangeFilterOnType, this, this.disposables);
        this.clearDomNode = append(controls, $('button.clear'));
        this.clearDomNode.tabIndex = -1;
        this.clearDomNode.title = localize('clear', "Clear");
        this.keyboardNavigationEventFilter = tree.options.keyboardNavigationEventFilter;
        model.onDidSplice(this.onDidSpliceModel, this, this.disposables);
        this.updateOptions(tree.options);
    }
    get enabled() { return this._enabled; }
    get pattern() { return this._pattern; }
    get filterOnType() { return this._filterOnType; }
    get empty() { return this._empty; }
    updateOptions(options) {
        if (options.simpleKeyboardNavigation) {
            this.disable();
        }
        else {
            this.enable();
        }
        if (typeof options.filterOnType !== 'undefined') {
            this._filterOnType = !!options.filterOnType;
            this.filterOnTypeDomNode.checked = this._filterOnType;
        }
        if (typeof options.automaticKeyboardNavigation !== 'undefined') {
            this.automaticKeyboardNavigation = options.automaticKeyboardNavigation;
        }
        this.tree.refilter();
        this.render();
        if (!this.automaticKeyboardNavigation) {
            this.onEventOrInput('');
        }
    }
    toggle() {
        this.triggered = !this.triggered;
        if (!this.triggered) {
            this.onEventOrInput('');
        }
    }
    enable() {
        if (this._enabled) {
            return;
        }
        const isPrintableCharEvent = this.keyboardNavigationLabelProvider.mightProducePrintableCharacter ? (e) => this.keyboardNavigationLabelProvider.mightProducePrintableCharacter(e) : (e) => mightProducePrintableCharacter(e);
        const onKeyDown = Event.chain(domEvent(this.view.getHTMLElement(), 'keydown'))
            .filter(e => !isInputElement(e.target) || e.target === this.filterOnTypeDomNode)
            .map(e => new StandardKeyboardEvent(e))
            .filter(this.keyboardNavigationEventFilter || (() => true))
            .filter(() => this.automaticKeyboardNavigation || this.triggered)
            .filter(e => isPrintableCharEvent(e) || ((this.pattern.length > 0 || this.triggered) && ((e.keyCode === KeyCode.Escape || e.keyCode === KeyCode.Backspace) && !e.altKey && !e.ctrlKey && !e.metaKey) || (e.keyCode === KeyCode.Backspace && (isMacintosh ? (e.altKey && !e.metaKey) : e.ctrlKey) && !e.shiftKey)))
            .forEach(e => { e.stopPropagation(); e.preventDefault(); })
            .event;
        const onClear = domEvent(this.clearDomNode, 'click');
        Event.chain(Event.any(onKeyDown, onClear))
            .event(this.onEventOrInput, this, this.enabledDisposables);
        this.filter.pattern = '';
        this.tree.refilter();
        this.render();
        this._enabled = true;
        this.triggered = false;
    }
    disable() {
        if (!this._enabled) {
            return;
        }
        this.domNode.remove();
        this.enabledDisposables = dispose(this.enabledDisposables);
        this.tree.refilter();
        this.render();
        this._enabled = false;
        this.triggered = false;
    }
    onEventOrInput(e) {
        if (typeof e === 'string') {
            this.onInput(e);
        }
        else if (e instanceof MouseEvent || e.keyCode === KeyCode.Escape || (e.keyCode === KeyCode.Backspace && (isMacintosh ? e.altKey : e.ctrlKey))) {
            this.onInput('');
        }
        else if (e.keyCode === KeyCode.Backspace) {
            this.onInput(this.pattern.length === 0 ? '' : this.pattern.substr(0, this.pattern.length - 1));
        }
        else {
            this.onInput(this.pattern + e.browserEvent.key);
        }
    }
    onInput(pattern) {
        const container = this.view.getHTMLElement();
        if (pattern && !this.domNode.parentElement) {
            container.append(this.domNode);
        }
        else if (!pattern && this.domNode.parentElement) {
            this.domNode.remove();
            this.tree.domFocus();
        }
        this._pattern = pattern;
        this._onDidChangePattern.fire(pattern);
        this.filter.pattern = pattern;
        this.tree.refilter();
        if (pattern) {
            this.tree.focusNext(0, true, undefined, node => !FuzzyScore.isDefault(node.filterData));
        }
        const focus = this.tree.getFocus();
        if (focus.length > 0) {
            const element = focus[0];
            if (this.tree.getRelativeTop(element) === null) {
                this.tree.reveal(element, 0.5);
            }
        }
        this.render();
        if (!pattern) {
            this.triggered = false;
        }
    }
    onDragStart() {
        const container = this.view.getHTMLElement();
        const { left } = getDomNodePagePosition(container);
        const containerWidth = container.clientWidth;
        const midContainerWidth = containerWidth / 2;
        const width = this.domNode.clientWidth;
        const disposables = [];
        let positionClassName = this.positionClassName;
        const updatePosition = () => {
            switch (positionClassName) {
                case 'nw':
                    this.domNode.style.top = `4px`;
                    this.domNode.style.left = `4px`;
                    break;
                case 'ne':
                    this.domNode.style.top = `4px`;
                    this.domNode.style.left = `${containerWidth - width - 6}px`;
                    break;
            }
        };
        const onDragOver = (event) => {
            event.preventDefault(); // needed so that the drop event fires (https://stackoverflow.com/questions/21339924/drop-event-not-firing-in-chrome)
            const x = event.screenX - left;
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'none';
            }
            if (x < midContainerWidth) {
                positionClassName = 'nw';
            }
            else {
                positionClassName = 'ne';
            }
            updatePosition();
        };
        const onDragEnd = () => {
            this.positionClassName = positionClassName;
            this.domNode.className = `monaco-list-type-filter ${this.positionClassName}`;
            this.domNode.style.top = null;
            this.domNode.style.left = null;
            dispose(disposables);
        };
        updatePosition();
        removeClass(this.domNode, positionClassName);
        addClass(this.domNode, 'dragging');
        disposables.push(toDisposable(() => removeClass(this.domNode, 'dragging')));
        domEvent(document, 'dragover')(onDragOver, null, disposables);
        domEvent(this.domNode, 'dragend')(onDragEnd, null, disposables);
        StaticDND.CurrentDragAndDropData = new DragAndDropData('vscode-ui');
        disposables.push(toDisposable(() => StaticDND.CurrentDragAndDropData = undefined));
    }
    onDidSpliceModel() {
        if (!this._enabled || this.pattern.length === 0) {
            return;
        }
        this.tree.refilter();
        this.render();
    }
    onDidChangeFilterOnType() {
        this.tree.updateOptions({ filterOnType: this.filterOnTypeDomNode.checked });
        this.tree.refilter();
        this.tree.domFocus();
        this.render();
        this.updateFilterOnTypeTitle();
    }
    updateFilterOnTypeTitle() {
        if (this.filterOnType) {
            this.filterOnTypeDomNode.title = localize('disable filter on type', "Disable Filter on Type");
        }
        else {
            this.filterOnTypeDomNode.title = localize('enable filter on type', "Enable Filter on Type");
        }
    }
    render() {
        const noMatches = this.filter.totalCount > 0 && this.filter.matchCount === 0;
        if (this.pattern && this.tree.options.filterOnType && noMatches) {
            this.messageDomNode.textContent = localize('empty', "No elements found");
            this._empty = true;
        }
        else {
            this.messageDomNode.innerHTML = '';
            this._empty = false;
        }
        toggleClass(this.domNode, 'no-matches', noMatches);
        this.domNode.title = localize('found', "Matched {0} out of {1} elements", this.filter.matchCount, this.filter.totalCount);
        this.labelDomNode.textContent = this.pattern.length > 16 ? '…' + this.pattern.substr(this.pattern.length - 16) : this.pattern;
        this._onDidChangeEmptyState.fire(this._empty);
    }
    shouldAllowFocus(node) {
        if (!this.enabled || !this.pattern || this.filterOnType) {
            return true;
        }
        if (this.filter.totalCount > 0 && this.filter.matchCount <= 1) {
            return true;
        }
        return !FuzzyScore.isDefault(node.filterData);
    }
    dispose() {
        this.disable();
        this._onDidChangePattern.dispose();
        this.disposables = dispose(this.disposables);
    }
}
function isInputElement(e) {
    return e.tagName === 'INPUT' || e.tagName === 'TEXTAREA';
}
function asTreeEvent(event) {
    return {
        elements: event.elements.map(node => node.element),
        browserEvent: event.browserEvent
    };
}
function asTreeMouseEvent(event) {
    return {
        browserEvent: event.browserEvent,
        element: event.element ? event.element.element : null
    };
}
function asTreeContextMenuEvent(event) {
    return {
        element: event.element ? event.element.element : null,
        browserEvent: event.browserEvent,
        anchor: event.anchor
    };
}
function dfs(node, fn) {
    fn(node);
    node.children.forEach(child => dfs(child, fn));
}
/**
 * The trait concept needs to exist at the tree level, because collapsed
 * tree nodes will not be known by the list.
 */
class Trait {
    constructor(identityProvider) {
        this.identityProvider = identityProvider;
        this.nodes = [];
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
    }
    get nodeSet() {
        if (!this._nodeSet) {
            this._nodeSet = this.createNodeSet();
        }
        return this._nodeSet;
    }
    set(nodes, browserEvent) {
        if (equals(this.nodes, nodes)) {
            return;
        }
        this.nodes = [...nodes];
        this.elements = undefined;
        this._nodeSet = undefined;
        const that = this;
        this._onDidChange.fire({ get elements() { return that.get(); }, browserEvent });
    }
    get() {
        if (!this.elements) {
            this.elements = this.nodes.map(node => node.element);
        }
        return [...this.elements];
    }
    has(node) {
        return this.nodeSet.has(node);
    }
    onDidModelSplice({ insertedNodes, deletedNodes }) {
        if (!this.identityProvider) {
            const set = this.createNodeSet();
            const visit = (node) => set.delete(node);
            deletedNodes.forEach(node => dfs(node, visit));
            this.set(values(set));
            return;
        }
        const deletedNodesIdSet = new Set();
        const deletedNodesVisitor = (node) => deletedNodesIdSet.add(this.identityProvider.getId(node.element).toString());
        deletedNodes.forEach(node => dfs(node, deletedNodesVisitor));
        const insertedNodesMap = new Map();
        const insertedNodesVisitor = (node) => insertedNodesMap.set(this.identityProvider.getId(node.element).toString(), node);
        insertedNodes.forEach(node => dfs(node, insertedNodesVisitor));
        const nodes = [];
        for (const node of this.nodes) {
            const id = this.identityProvider.getId(node.element).toString();
            const wasDeleted = deletedNodesIdSet.has(id);
            if (!wasDeleted) {
                nodes.push(node);
            }
            else {
                const insertedNode = insertedNodesMap.get(id);
                if (insertedNode) {
                    nodes.push(insertedNode);
                }
            }
        }
        this.set(nodes);
    }
    createNodeSet() {
        const set = new Set();
        for (const node of this.nodes) {
            set.add(node);
        }
        return set;
    }
}
class TreeNodeListMouseController extends MouseController {
    constructor(list, tree) {
        super(list);
        this.tree = tree;
    }
    onPointer(e) {
        if (isInputElement(e.browserEvent.target)) {
            return;
        }
        const node = e.element;
        if (!node) {
            return super.onPointer(e);
        }
        if (this.isSelectionRangeChangeEvent(e) || this.isSelectionSingleChangeEvent(e)) {
            return super.onPointer(e);
        }
        const onTwistie = hasClass(e.browserEvent.target, 'monaco-tl-twistie');
        if (!this.tree.openOnSingleClick && e.browserEvent.detail !== 2 && !onTwistie) {
            return super.onPointer(e);
        }
        let expandOnlyOnTwistieClick = false;
        if (typeof this.tree.expandOnlyOnTwistieClick === 'function') {
            expandOnlyOnTwistieClick = this.tree.expandOnlyOnTwistieClick(node.element);
        }
        else {
            expandOnlyOnTwistieClick = !!this.tree.expandOnlyOnTwistieClick;
        }
        if (expandOnlyOnTwistieClick && !onTwistie) {
            return super.onPointer(e);
        }
        const model = this.tree.model; // internal
        const location = model.getNodeLocation(node);
        const recursive = e.browserEvent.altKey;
        model.setCollapsed(location, undefined, recursive);
        if (expandOnlyOnTwistieClick && onTwistie) {
            return;
        }
        super.onPointer(e);
    }
}
/**
 * We use this List subclass to restore selection and focus as nodes
 * get rendered in the list, possibly due to a node expand() call.
 */
class TreeNodeList extends List {
    constructor(container, virtualDelegate, renderers, focusTrait, selectionTrait, options) {
        super(container, virtualDelegate, renderers, options);
        this.focusTrait = focusTrait;
        this.selectionTrait = selectionTrait;
    }
    createMouseController(options) {
        return new TreeNodeListMouseController(this, options.tree);
    }
    splice(start, deleteCount, elements = []) {
        super.splice(start, deleteCount, elements);
        if (elements.length === 0) {
            return;
        }
        const additionalFocus = [];
        const additionalSelection = [];
        elements.forEach((node, index) => {
            if (this.focusTrait.has(node)) {
                additionalFocus.push(start + index);
            }
            if (this.selectionTrait.has(node)) {
                additionalSelection.push(start + index);
            }
        });
        if (additionalFocus.length > 0) {
            super.setFocus(distinctES6([...super.getFocus(), ...additionalFocus]));
        }
        if (additionalSelection.length > 0) {
            super.setSelection(distinctES6([...super.getSelection(), ...additionalSelection]));
        }
    }
    setFocus(indexes, browserEvent, fromAPI = false) {
        super.setFocus(indexes, browserEvent);
        if (!fromAPI) {
            this.focusTrait.set(indexes.map(i => this.element(i)), browserEvent);
        }
    }
    setSelection(indexes, browserEvent, fromAPI = false) {
        super.setSelection(indexes, browserEvent);
        if (!fromAPI) {
            this.selectionTrait.set(indexes.map(i => this.element(i)), browserEvent);
        }
    }
}
export class AbstractTree {
    constructor(container, delegate, renderers, _options = {}) {
        this._options = _options;
        this.eventBufferer = new EventBufferer();
        this.disposables = [];
        this._onWillRefilter = new Emitter();
        this.onWillRefilter = this._onWillRefilter.event;
        this._onDidUpdateOptions = new Emitter();
        this.onDidUpdateOptions = this._onDidUpdateOptions.event;
        const treeDelegate = new ComposedTreeDelegate(delegate);
        const onDidChangeCollapseStateRelay = new Relay();
        this.renderers = renderers.map(r => new TreeRenderer(r, onDidChangeCollapseStateRelay.event, _options));
        this.disposables.push(...this.renderers);
        let filter;
        if (_options.keyboardNavigationLabelProvider) {
            filter = new TypeFilter(this, _options.keyboardNavigationLabelProvider, _options.filter);
            _options = Object.assign({}, _options, { filter: filter }); // TODO need typescript help here
            this.disposables.push(filter);
        }
        this.focus = new Trait(_options.identityProvider);
        this.selection = new Trait(_options.identityProvider);
        this.view = new TreeNodeList(container, treeDelegate, this.renderers, this.focus, this.selection, Object.assign({}, asListOptions(() => this.model, _options), { tree: this }));
        this.model = this.createModel(this.view, _options);
        onDidChangeCollapseStateRelay.input = this.model.onDidChangeCollapseState;
        this.model.onDidSplice(e => {
            this.focus.onDidModelSplice(e);
            this.selection.onDidModelSplice(e);
        }, null, this.disposables);
        if (_options.keyboardSupport !== false) {
            const onKeyDown = Event.chain(this.view.onKeyDown)
                .filter(e => !isInputElement(e.target))
                .map(e => new StandardKeyboardEvent(e));
            onKeyDown.filter(e => e.keyCode === KeyCode.LeftArrow).on(this.onLeftArrow, this, this.disposables);
            onKeyDown.filter(e => e.keyCode === KeyCode.RightArrow).on(this.onRightArrow, this, this.disposables);
            onKeyDown.filter(e => e.keyCode === KeyCode.Space).on(this.onSpace, this, this.disposables);
        }
        if (_options.keyboardNavigationLabelProvider) {
            this.typeFilterController = new TypeFilterController(this, this.model, this.view, filter, _options.keyboardNavigationLabelProvider);
            this.focusNavigationFilter = node => this.typeFilterController.shouldAllowFocus(node);
            this.disposables.push(this.typeFilterController);
        }
    }
    get onDidScroll() { return this.view.onDidScroll; }
    get onDidChangeFocus() { return this.eventBufferer.wrapEvent(this.focus.onDidChange); }
    get onDidChangeSelection() { return this.eventBufferer.wrapEvent(this.selection.onDidChange); }
    get onDidOpen() { return Event.map(this.view.onDidOpen, asTreeEvent); }
    get onMouseClick() { return Event.map(this.view.onMouseClick, asTreeMouseEvent); }
    get onMouseDblClick() { return Event.map(this.view.onMouseDblClick, asTreeMouseEvent); }
    get onContextMenu() { return Event.map(this.view.onContextMenu, asTreeContextMenuEvent); }
    get onKeyDown() { return this.view.onKeyDown; }
    get onKeyUp() { return this.view.onKeyUp; }
    get onKeyPress() { return this.view.onKeyPress; }
    get onDidFocus() { return this.view.onDidFocus; }
    get onDidBlur() { return this.view.onDidBlur; }
    get onDidChangeCollapseState() { return this.model.onDidChangeCollapseState; }
    get onDidChangeRenderNodeCount() { return this.model.onDidChangeRenderNodeCount; }
    get filterOnType() { return !!this._options.filterOnType; }
    get onDidChangeTypeFilterPattern() { return this.typeFilterController ? this.typeFilterController.onDidChangePattern : Event.None; }
    // Options TODO@joao expose options only, not Optional<>
    get openOnSingleClick() { return typeof this._options.openOnSingleClick === 'undefined' ? true : this._options.openOnSingleClick; }
    get expandOnlyOnTwistieClick() { return typeof this._options.expandOnlyOnTwistieClick === 'undefined' ? false : this._options.expandOnlyOnTwistieClick; }
    get onDidDispose() { return this.view.onDidDispose; }
    updateOptions(optionsUpdate = {}) {
        this._options = Object.assign({}, this._options, optionsUpdate);
        for (const renderer of this.renderers) {
            renderer.updateOptions(optionsUpdate);
        }
        this.view.updateOptions({
            enableKeyboardNavigation: this._options.simpleKeyboardNavigation,
            automaticKeyboardNavigation: this._options.automaticKeyboardNavigation
        });
        if (this.typeFilterController) {
            this.typeFilterController.updateOptions(this._options);
        }
        this._onDidUpdateOptions.fire(this._options);
    }
    get options() {
        return this._options;
    }
    updateWidth(element) {
        const index = this.model.getListIndex(element);
        if (index === -1) {
            return;
        }
        this.view.updateWidth(index);
    }
    // Widget
    getHTMLElement() {
        return this.view.getHTMLElement();
    }
    get contentHeight() {
        if (this.typeFilterController && this.typeFilterController.filterOnType && this.typeFilterController.empty) {
            return 100;
        }
        return this.view.contentHeight;
    }
    get onDidChangeContentHeight() {
        let result = this.view.onDidChangeContentHeight;
        if (this.typeFilterController) {
            result = Event.any(result, Event.map(this.typeFilterController.onDidChangeEmptyState, () => this.contentHeight));
        }
        return result;
    }
    get scrollTop() {
        return this.view.scrollTop;
    }
    set scrollTop(scrollTop) {
        this.view.scrollTop = scrollTop;
    }
    get scrollHeight() {
        return this.view.scrollHeight;
    }
    get renderHeight() {
        return this.view.renderHeight;
    }
    get firstVisibleElement() {
        const index = this.view.firstVisibleIndex;
        const node = this.view.element(index);
        return node.element;
    }
    get lastVisibleElement() {
        const index = this.view.lastVisibleIndex;
        const node = this.view.element(index);
        return node.element;
    }
    domFocus() {
        this.view.domFocus();
    }
    isDOMFocused() {
        return this.getHTMLElement() === document.activeElement;
    }
    layout(height, width) {
        this.view.layout(height, width);
    }
    style(styles) {
        this.view.style(styles);
    }
    // Tree navigation
    getParentElement(location) {
        return this.model.getParentElement(location);
    }
    getFirstElementChild(location) {
        return this.model.getFirstElementChild(location);
    }
    // Tree
    getNode(location) {
        return this.model.getNode(location);
    }
    collapse(location, recursive = false) {
        return this.model.setCollapsed(location, true, recursive);
    }
    expand(location, recursive = false) {
        return this.model.setCollapsed(location, false, recursive);
    }
    toggleCollapsed(location, recursive = false) {
        return this.model.setCollapsed(location, undefined, recursive);
    }
    expandAll() {
        this.model.setCollapsed(this.model.rootRef, false, true);
    }
    collapseAll() {
        this.model.setCollapsed(this.model.rootRef, true, true);
    }
    isCollapsible(location) {
        return this.model.isCollapsible(location);
    }
    isCollapsed(location) {
        return this.model.isCollapsed(location);
    }
    toggleKeyboardNavigation() {
        this.view.toggleKeyboardNavigation();
        if (this.typeFilterController) {
            this.typeFilterController.toggle();
        }
    }
    refilter() {
        this._onWillRefilter.fire(undefined);
        this.model.refilter();
    }
    setSelection(elements, browserEvent) {
        const nodes = elements.map(e => this.model.getNode(e));
        this.selection.set(nodes, browserEvent);
        const indexes = elements.map(e => this.model.getListIndex(e)).filter(i => i > -1);
        this.view.setSelection(indexes, browserEvent, true);
    }
    getSelection() {
        return this.selection.get();
    }
    setFocus(elements, browserEvent) {
        const nodes = elements.map(e => this.model.getNode(e));
        this.focus.set(nodes, browserEvent);
        const indexes = elements.map(e => this.model.getListIndex(e)).filter(i => i > -1);
        this.view.setFocus(indexes, browserEvent, true);
    }
    focusNext(n = 1, loop = false, browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusNext(n, loop, browserEvent, filter);
    }
    focusPrevious(n = 1, loop = false, browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusPrevious(n, loop, browserEvent, filter);
    }
    focusNextPage(browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusNextPage(browserEvent, filter);
    }
    focusPreviousPage(browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusPreviousPage(browserEvent, filter);
    }
    focusLast(browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusLast(browserEvent, filter);
    }
    focusFirst(browserEvent, filter = this.focusNavigationFilter) {
        this.view.focusFirst(browserEvent, filter);
    }
    getFocus() {
        return this.focus.get();
    }
    open(elements, browserEvent) {
        const indexes = elements.map(e => this.model.getListIndex(e));
        this.view.open(indexes, browserEvent);
    }
    reveal(location, relativeTop) {
        this.model.expandTo(location);
        const index = this.model.getListIndex(location);
        if (index === -1) {
            return;
        }
        this.view.reveal(index, relativeTop);
    }
    /**
     * Returns the relative position of an element rendered in the list.
     * Returns `null` if the element isn't *entirely* in the visible viewport.
     */
    getRelativeTop(location) {
        const index = this.model.getListIndex(location);
        if (index === -1) {
            return null;
        }
        return this.view.getRelativeTop(index);
    }
    // List
    onLeftArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const nodes = this.view.getFocusedElements();
        if (nodes.length === 0) {
            return;
        }
        const node = nodes[0];
        const location = this.model.getNodeLocation(node);
        const didChange = this.model.setCollapsed(location, true);
        if (!didChange) {
            const parentLocation = this.model.getParentNodeLocation(location);
            if (parentLocation === null) {
                return;
            }
            const parentListIndex = this.model.getListIndex(parentLocation);
            this.view.reveal(parentListIndex);
            this.view.setFocus([parentListIndex]);
        }
    }
    onRightArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const nodes = this.view.getFocusedElements();
        if (nodes.length === 0) {
            return;
        }
        const node = nodes[0];
        const location = this.model.getNodeLocation(node);
        const didChange = this.model.setCollapsed(location, false);
        if (!didChange) {
            if (!node.children.some(child => child.visible)) {
                return;
            }
            const [focusedIndex] = this.view.getFocus();
            const firstChildIndex = focusedIndex + 1;
            this.view.reveal(firstChildIndex);
            this.view.setFocus([firstChildIndex]);
        }
    }
    onSpace(e) {
        e.preventDefault();
        e.stopPropagation();
        const nodes = this.view.getFocusedElements();
        if (nodes.length === 0) {
            return;
        }
        const node = nodes[0];
        const location = this.model.getNodeLocation(node);
        const recursive = e.browserEvent.altKey;
        this.model.setCollapsed(location, undefined, recursive);
    }
    navigate(start) {
        return new TreeNavigator(this.view, this.model, start);
    }
    dispose() {
        this.disposables = dispose(this.disposables);
        this.view.dispose();
    }
}
class TreeNavigator {
    constructor(view, model, start) {
        this.view = view;
        this.model = model;
        if (start) {
            this.index = this.model.getListIndex(start);
        }
        else {
            this.index = -1;
        }
    }
    current() {
        if (this.index < 0 || this.index >= this.view.length) {
            return null;
        }
        return this.view.element(this.index).element;
    }
    previous() {
        this.index--;
        return this.current();
    }
    next() {
        this.index++;
        return this.current();
    }
    parent() {
        if (this.index < 0 || this.index >= this.view.length) {
            return null;
        }
        const node = this.view.element(this.index);
        if (!node.parent) {
            this.index = -1;
            return this.current();
        }
        this.index = this.model.getListIndex(this.model.getNodeLocation(node.parent));
        return this.current();
    }
    first() {
        this.index = 0;
        return this.current();
    }
    last() {
        this.index = this.view.length - 1;
        return this.current();
    }
}
//# sourceMappingURL=abstractTree.js.map