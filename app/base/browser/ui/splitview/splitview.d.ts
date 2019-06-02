import './splitview.css';
import { Disposable } from 'base/common/lifecycle';
import { Event } from 'base/common/event';
import { Sash, Orientation } from 'base/browser/ui/sash/sash';
import { Color } from 'base/common/color';
export { Orientation } from 'base/browser/ui/sash/sash';
export interface ISplitViewStyles {
    separatorBorder: Color;
}
export interface ISplitViewOptions {
    orientation?: Orientation;
    styles?: ISplitViewStyles;
    orthogonalStartSash?: Sash;
    orthogonalEndSash?: Sash;
    inverseAltBehavior?: boolean;
    proportionalLayout?: boolean;
}
/**
 * Only used when `proportionalLayout` is false.
 */
export declare enum LayoutPriority {
    Normal = 0,
    Low = 1,
    High = 2
}
export interface IView {
    readonly element: HTMLElement;
    readonly minimumSize: number;
    readonly maximumSize: number;
    readonly onDidChange: Event<number | undefined>;
    readonly priority?: LayoutPriority;
    layout(size: number, orientation: Orientation): void;
}
export declare type DistributeSizing = {
    type: 'distribute';
};
export declare type SplitSizing = {
    type: 'split';
    index: number;
};
export declare type Sizing = DistributeSizing | SplitSizing;
export declare namespace Sizing {
    const Distribute: DistributeSizing;
    function Split(index: number): SplitSizing;
}
export declare class SplitView extends Disposable {
    readonly orientation: Orientation;
    readonly el: HTMLElement;
    private sashContainer;
    private viewContainer;
    private size;
    private contentSize;
    private proportions;
    private viewItems;
    private sashItems;
    private sashDragState;
    private state;
    private inverseAltBehavior;
    private proportionalLayout;
    private _onDidSashChange;
    readonly onDidSashChange: Event<number>;
    private _onDidSashReset;
    readonly onDidSashReset: Event<number>;
    readonly length: number;
    readonly minimumSize: number;
    readonly maximumSize: number;
    private _orthogonalStartSash;
    orthogonalStartSash: Sash | undefined;
    private _orthogonalEndSash;
    orthogonalEndSash: Sash | undefined;
    readonly sashes: Sash[];
    constructor(container: HTMLElement, options?: ISplitViewOptions);
    style(styles: ISplitViewStyles): void;
    addView(view: IView, size: number | Sizing, index?: number): void;
    removeView(index: number, sizing?: Sizing): IView;
    moveView(from: number, to: number): void;
    swapViews(from: number, to: number): void;
    private relayout;
    layout(size: number): void;
    private saveProportions;
    private onSashStart;
    private onSashChange;
    private onSashEnd;
    private onViewChange;
    resizeView(index: number, size: number): void;
    distributeViewSizes(): void;
    getViewSize(index: number): number;
    private resize;
    private distributeEmptySpace;
    private layoutViews;
    private getSashPosition;
    dispose(): void;
}
