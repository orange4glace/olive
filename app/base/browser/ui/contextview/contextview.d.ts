import './contextview.css';
import { IDisposable, Disposable } from 'base/common/lifecycle';
export interface IAnchor {
    x: number;
    y: number;
    width?: number;
    height?: number;
}
export declare enum AnchorAlignment {
    LEFT = 0,
    RIGHT = 1
}
export declare enum AnchorPosition {
    BELOW = 0,
    ABOVE = 1
}
export interface IDelegate {
    getAnchor(): HTMLElement | IAnchor;
    render(container: HTMLElement): IDisposable | null;
    focus?(): void;
    layout?(): void;
    anchorAlignment?: AnchorAlignment;
    anchorPosition?: AnchorPosition;
    canRelayout?: boolean;
    onDOMEvent?(e: Event, activeElement: HTMLElement): void;
    onHide?(data?: any): void;
}
export interface IContextViewProvider {
    showContextView(delegate: IDelegate): void;
    hideContextView(): void;
    layout(): void;
}
export interface IPosition {
    top: number;
    left: number;
}
export interface ISize {
    width: number;
    height: number;
}
export interface IView extends IPosition, ISize {
}
export declare enum LayoutAnchorPosition {
    Before = 0,
    After = 1
}
export interface ILayoutAnchor {
    offset: number;
    size: number;
    position: LayoutAnchorPosition;
}
/**
 * Lays out a one dimensional view next to an anchor in a viewport.
 *
 * @returns The view offset within the viewport.
 */
export declare function layout(viewportSize: number, viewSize: number, anchor: ILayoutAnchor): number;
export declare class ContextView extends Disposable {
    private static readonly BUBBLE_UP_EVENTS;
    private static readonly BUBBLE_DOWN_EVENTS;
    private container;
    private view;
    private delegate;
    private toDisposeOnClean;
    private toDisposeOnSetContainer;
    constructor(container: HTMLElement);
    setContainer(container: HTMLElement | null): void;
    show(delegate: IDelegate): void;
    layout(): void;
    private doLayout;
    hide(data?: any): void;
    private isVisible;
    private onDOMEvent;
    dispose(): void;
}
