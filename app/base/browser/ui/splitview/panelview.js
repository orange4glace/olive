/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './panelview.css';
import { dispose, combinedDisposable, Disposable } from 'base/common/lifecycle';
import { Event, Emitter } from 'base/common/event';
import { domEvent } from 'base/browser/event';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { KeyCode } from 'base/common/keyCodes';
import { $, append, addClass, removeClass, toggleClass, trackFocus, scheduleAtNextAnimationFrame } from 'base/browser/dom';
import { firstIndex } from 'base/common/arrays';
import { Color, RGBA } from 'base/common/color';
import { SplitView } from './splitview';
/**
 * A Panel is a structured SplitView view.
 *
 * WARNING: You must call `render()` after you contruct it.
 * It can't be done automatically at the end of the ctor
 * because of the order of property initialization in TypeScript.
 * Subclasses wouldn't be able to set own properties
 * before the `render()` call, thus forbiding their use.
 */
export class Panel {
    constructor(options = {}) {
        this.expandedSize = undefined;
        this._headerVisible = true;
        this.styles = {};
        this.animationTimer = undefined;
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this.disposables = [];
        this._expanded = typeof options.expanded === 'undefined' ? true : !!options.expanded;
        this.ariaHeaderLabel = options.ariaHeaderLabel || '';
        this._minimumBodySize = typeof options.minimumBodySize === 'number' ? options.minimumBodySize : 120;
        this._maximumBodySize = typeof options.maximumBodySize === 'number' ? options.maximumBodySize : Number.POSITIVE_INFINITY;
        this.element = $('.panel');
    }
    get draggableElement() {
        return this.header;
    }
    get dropTargetElement() {
        return this.element;
    }
    get dropBackground() {
        return this._dropBackground;
    }
    get minimumBodySize() {
        return this._minimumBodySize;
    }
    set minimumBodySize(size) {
        this._minimumBodySize = size;
        this._onDidChange.fire(undefined);
    }
    get maximumBodySize() {
        return this._maximumBodySize;
    }
    set maximumBodySize(size) {
        this._maximumBodySize = size;
        this._onDidChange.fire(undefined);
    }
    get headerSize() {
        return this.headerVisible ? Panel.HEADER_SIZE : 0;
    }
    get minimumSize() {
        const headerSize = this.headerSize;
        const expanded = !this.headerVisible || this.isExpanded();
        const minimumBodySize = expanded ? this._minimumBodySize : 0;
        return headerSize + minimumBodySize;
    }
    get maximumSize() {
        const headerSize = this.headerSize;
        const expanded = !this.headerVisible || this.isExpanded();
        const maximumBodySize = expanded ? this._maximumBodySize : 0;
        return headerSize + maximumBodySize;
    }
    isExpanded() {
        return this._expanded;
    }
    setExpanded(expanded) {
        if (this._expanded === !!expanded) {
            return false;
        }
        this._expanded = !!expanded;
        this.updateHeader();
        if (expanded) {
            if (typeof this.animationTimer === 'number') {
                clearTimeout(this.animationTimer);
            }
            append(this.element, this.body);
        }
        else {
            this.animationTimer = window.setTimeout(() => {
                this.body.remove();
            }, 200);
        }
        this._onDidChange.fire(expanded ? this.expandedSize : undefined);
        return true;
    }
    get headerVisible() {
        return this._headerVisible;
    }
    set headerVisible(visible) {
        if (this._headerVisible === !!visible) {
            return;
        }
        this._headerVisible = !!visible;
        this.updateHeader();
        this._onDidChange.fire(undefined);
    }
    render() {
        this.header = $('.panel-header');
        append(this.element, this.header);
        this.header.setAttribute('tabindex', '0');
        this.header.setAttribute('role', 'toolbar');
        this.header.setAttribute('aria-label', this.ariaHeaderLabel);
        this.renderHeader(this.header);
        const focusTracker = trackFocus(this.header);
        this.disposables.push(focusTracker);
        focusTracker.onDidFocus(() => addClass(this.header, 'focused'), null, this.disposables);
        focusTracker.onDidBlur(() => removeClass(this.header, 'focused'), null, this.disposables);
        this.updateHeader();
        const onHeaderKeyDown = Event.chain(domEvent(this.header, 'keydown'))
            .map(e => new StandardKeyboardEvent(e));
        onHeaderKeyDown.filter(e => e.keyCode === KeyCode.Enter || e.keyCode === KeyCode.Space)
            .event(() => this.setExpanded(!this.isExpanded()), null, this.disposables);
        onHeaderKeyDown.filter(e => e.keyCode === KeyCode.LeftArrow)
            .event(() => this.setExpanded(false), null, this.disposables);
        onHeaderKeyDown.filter(e => e.keyCode === KeyCode.RightArrow)
            .event(() => this.setExpanded(true), null, this.disposables);
        domEvent(this.header, 'click')(() => this.setExpanded(!this.isExpanded()), null, this.disposables);
        this.body = append(this.element, $('.panel-body'));
        this.renderBody(this.body);
    }
    layout(height) {
        const headerSize = this.headerVisible ? Panel.HEADER_SIZE : 0;
        if (this.isExpanded()) {
            this.layoutBody(height - headerSize, this.width);
            this.expandedSize = height;
        }
    }
    style(styles) {
        this.styles = styles;
        if (!this.header) {
            return;
        }
        this.updateHeader();
    }
    updateHeader() {
        const expanded = !this.headerVisible || this.isExpanded();
        this.header.style.height = `${this.headerSize}px`;
        this.header.style.lineHeight = `${this.headerSize}px`;
        toggleClass(this.header, 'hidden', !this.headerVisible);
        toggleClass(this.header, 'expanded', expanded);
        this.header.setAttribute('aria-expanded', String(expanded));
        this.header.style.color = this.styles.headerForeground ? this.styles.headerForeground.toString() : null;
        this.header.style.backgroundColor = this.styles.headerBackground ? this.styles.headerBackground.toString() : null;
        this.header.style.borderTop = this.styles.headerBorder ? `1px solid ${this.styles.headerBorder}` : null;
        this._dropBackground = this.styles.dropBackground;
    }
    dispose() {
        this.disposables = dispose(this.disposables);
        this._onDidChange.dispose();
    }
}
Panel.HEADER_SIZE = 22;
class PanelDraggable extends Disposable {
    constructor(panel, dnd, context) {
        super();
        this.panel = panel;
        this.dnd = dnd;
        this.context = context;
        this.dragOverCounter = 0; // see https://github.com/Microsoft/vscode/issues/14470
        this._onDidDrop = this._register(new Emitter());
        this.onDidDrop = this._onDidDrop.event;
        panel.draggableElement.draggable = true;
        this._register(domEvent(panel.draggableElement, 'dragstart')(this.onDragStart, this));
        this._register(domEvent(panel.dropTargetElement, 'dragenter')(this.onDragEnter, this));
        this._register(domEvent(panel.dropTargetElement, 'dragleave')(this.onDragLeave, this));
        this._register(domEvent(panel.dropTargetElement, 'dragend')(this.onDragEnd, this));
        this._register(domEvent(panel.dropTargetElement, 'drop')(this.onDrop, this));
    }
    onDragStart(e) {
        if (!this.dnd.canDrag(this.panel) || !e.dataTransfer) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.dataTransfer.effectAllowed = 'move';
        const dragImage = append(document.body, $('.monaco-drag-image', {}, this.panel.draggableElement.textContent || ''));
        e.dataTransfer.setDragImage(dragImage, -10, -10);
        setTimeout(() => document.body.removeChild(dragImage), 0);
        this.context.draggable = this;
    }
    onDragEnter(e) {
        if (!this.context.draggable || this.context.draggable === this) {
            return;
        }
        if (!this.dnd.canDrop(this.context.draggable.panel, this.panel)) {
            return;
        }
        this.dragOverCounter++;
        this.render();
    }
    onDragLeave(e) {
        if (!this.context.draggable || this.context.draggable === this) {
            return;
        }
        if (!this.dnd.canDrop(this.context.draggable.panel, this.panel)) {
            return;
        }
        this.dragOverCounter--;
        if (this.dragOverCounter === 0) {
            this.render();
        }
    }
    onDragEnd(e) {
        if (!this.context.draggable) {
            return;
        }
        this.dragOverCounter = 0;
        this.render();
        this.context.draggable = null;
    }
    onDrop(e) {
        if (!this.context.draggable) {
            return;
        }
        this.dragOverCounter = 0;
        this.render();
        if (this.dnd.canDrop(this.context.draggable.panel, this.panel) && this.context.draggable !== this) {
            this._onDidDrop.fire({ from: this.context.draggable.panel, to: this.panel });
        }
        this.context.draggable = null;
    }
    render() {
        let backgroundColor = null;
        if (this.dragOverCounter > 0) {
            backgroundColor = (this.panel.dropBackground || PanelDraggable.DefaultDragOverBackgroundColor).toString();
        }
        this.panel.dropTargetElement.style.backgroundColor = backgroundColor;
    }
}
PanelDraggable.DefaultDragOverBackgroundColor = new Color(new RGBA(128, 128, 128, 0.5));
export class DefaultPanelDndController {
    canDrag(panel) {
        return true;
    }
    canDrop(panel, overPanel) {
        return true;
    }
}
export class PanelView extends Disposable {
    constructor(container, options = {}) {
        super();
        this.dndContext = { draggable: null };
        this.panelItems = [];
        this.animationTimer = undefined;
        this._onDidDrop = this._register(new Emitter());
        this.onDidDrop = this._onDidDrop.event;
        this.dnd = options.dnd;
        this.el = append(container, $('.monaco-panel-view'));
        this.splitview = this._register(new SplitView(this.el));
        this.onDidSashChange = this.splitview.onDidSashChange;
    }
    addPanel(panel, size, index = this.splitview.length) {
        const disposables = [];
        // https://github.com/Microsoft/vscode/issues/59950
        let shouldAnimate = false;
        disposables.push(scheduleAtNextAnimationFrame(() => shouldAnimate = true));
        Event.filter(panel.onDidChange, () => shouldAnimate)(this.setupAnimation, this, disposables);
        const panelItem = { panel, disposable: combinedDisposable(disposables) };
        this.panelItems.splice(index, 0, panelItem);
        panel.width = this.width;
        this.splitview.addView(panel, size, index);
        if (this.dnd) {
            const draggable = new PanelDraggable(panel, this.dnd, this.dndContext);
            disposables.push(draggable);
            draggable.onDidDrop(this._onDidDrop.fire, this._onDidDrop, disposables);
        }
    }
    removePanel(panel) {
        const index = firstIndex(this.panelItems, item => item.panel === panel);
        if (index === -1) {
            return;
        }
        this.splitview.removeView(index);
        const panelItem = this.panelItems.splice(index, 1)[0];
        panelItem.disposable.dispose();
    }
    movePanel(from, to) {
        const fromIndex = firstIndex(this.panelItems, item => item.panel === from);
        const toIndex = firstIndex(this.panelItems, item => item.panel === to);
        if (fromIndex === -1 || toIndex === -1) {
            return;
        }
        const [panelItem] = this.panelItems.splice(fromIndex, 1);
        this.panelItems.splice(toIndex, 0, panelItem);
        this.splitview.moveView(fromIndex, toIndex);
    }
    resizePanel(panel, size) {
        const index = firstIndex(this.panelItems, item => item.panel === panel);
        if (index === -1) {
            return;
        }
        this.splitview.resizeView(index, size);
    }
    getPanelSize(panel) {
        const index = firstIndex(this.panelItems, item => item.panel === panel);
        if (index === -1) {
            return -1;
        }
        return this.splitview.getViewSize(index);
    }
    layout(height, width) {
        this.width = width;
        for (const panelItem of this.panelItems) {
            panelItem.panel.width = width;
        }
        this.splitview.layout(height);
    }
    setupAnimation() {
        if (typeof this.animationTimer === 'number') {
            window.clearTimeout(this.animationTimer);
        }
        addClass(this.el, 'animated');
        this.animationTimer = window.setTimeout(() => {
            this.animationTimer = undefined;
            removeClass(this.el, 'animated');
        }, 200);
    }
    dispose() {
        super.dispose();
        this.panelItems.forEach(i => i.disposable.dispose());
    }
}
//# sourceMappingURL=panelview.js.map