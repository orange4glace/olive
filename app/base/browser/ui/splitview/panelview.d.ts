import './panelview.css';
import { IDisposable, Disposable } from 'base/common/lifecycle';
import { Event } from 'base/common/event';
import { Color } from 'base/common/color';
import { IView } from './splitview';
export interface IPanelOptions {
    ariaHeaderLabel?: string;
    minimumBodySize?: number;
    maximumBodySize?: number;
    expanded?: boolean;
}
export interface IPanelStyles {
    dropBackground?: Color;
    headerForeground?: Color;
    headerBackground?: Color;
    headerBorder?: Color;
}
/**
 * A Panel is a structured SplitView view.
 *
 * WARNING: You must call `render()` after you contruct it.
 * It can't be done automatically at the end of the ctor
 * because of the order of property initialization in TypeScript.
 * Subclasses wouldn't be able to set own properties
 * before the `render()` call, thus forbiding their use.
 */
export declare abstract class Panel implements IView {
    private static readonly HEADER_SIZE;
    readonly element: HTMLElement;
    private header;
    private body;
    protected _expanded: boolean;
    private expandedSize;
    private _headerVisible;
    private _minimumBodySize;
    private _maximumBodySize;
    private ariaHeaderLabel;
    private styles;
    private animationTimer;
    private _onDidChange;
    readonly onDidChange: Event<number | undefined>;
    protected disposables: IDisposable[];
    readonly draggableElement: HTMLElement;
    readonly dropTargetElement: HTMLElement;
    private _dropBackground;
    readonly dropBackground: Color | undefined;
    minimumBodySize: number;
    maximumBodySize: number;
    private readonly headerSize;
    readonly minimumSize: number;
    readonly maximumSize: number;
    width: number;
    constructor(options?: IPanelOptions);
    isExpanded(): boolean;
    setExpanded(expanded: boolean): boolean;
    headerVisible: boolean;
    render(): void;
    layout(height: number): void;
    style(styles: IPanelStyles): void;
    protected updateHeader(): void;
    protected abstract renderHeader(container: HTMLElement): void;
    protected abstract renderBody(container: HTMLElement): void;
    protected abstract layoutBody(height: number, width: number): void;
    dispose(): void;
}
export interface IPanelDndController {
    canDrag(panel: Panel): boolean;
    canDrop(panel: Panel, overPanel: Panel): boolean;
}
export declare class DefaultPanelDndController implements IPanelDndController {
    canDrag(panel: Panel): boolean;
    canDrop(panel: Panel, overPanel: Panel): boolean;
}
export interface IPanelViewOptions {
    dnd?: IPanelDndController;
}
export declare class PanelView extends Disposable {
    private dnd;
    private dndContext;
    private el;
    private panelItems;
    private width;
    private splitview;
    private animationTimer;
    private _onDidDrop;
    readonly onDidDrop: Event<{
        from: Panel;
        to: Panel;
    }>;
    readonly onDidSashChange: Event<number>;
    constructor(container: HTMLElement, options?: IPanelViewOptions);
    addPanel(panel: Panel, size: number, index?: number): void;
    removePanel(panel: Panel): void;
    movePanel(from: Panel, to: Panel): void;
    resizePanel(panel: Panel, size: number): void;
    getPanelSize(panel: Panel): number;
    layout(height: number, width: number): void;
    private setupAnimation;
    dispose(): void;
}
