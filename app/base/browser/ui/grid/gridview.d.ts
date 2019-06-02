import './gridview.css';
import { Event } from 'base/common/event';
import { Orientation } from 'base/browser/ui/sash/sash';
import { Sizing, LayoutPriority, ISplitViewStyles } from 'base/browser/ui/splitview/splitview';
import { IDisposable } from 'base/common/lifecycle';
export { Sizing, LayoutPriority } from 'base/browser/ui/splitview/splitview';
export { Orientation } from 'base/browser/ui/sash/sash';
export interface IView {
    readonly element: HTMLElement;
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    readonly onDidChange: Event<{
        width: number;
        height: number;
    } | undefined>;
    readonly priority?: LayoutPriority;
    readonly snapSize?: number;
    layout(width: number, height: number, orientation: Orientation): void;
}
export declare function orthogonal(orientation: Orientation): Orientation;
export interface Box {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface GridLeafNode {
    readonly view: IView;
    readonly box: Box;
}
export interface GridBranchNode {
    readonly children: GridNode[];
    readonly box: Box;
}
export declare type GridNode = GridLeafNode | GridBranchNode;
export declare function isGridBranchNode(node: GridNode): node is GridBranchNode;
export interface IGridViewStyles extends ISplitViewStyles {
}
export interface IGridViewOptions {
    styles?: IGridViewStyles;
    proportionalLayout?: boolean;
}
export declare class GridView implements IDisposable {
    readonly element: HTMLElement;
    private styles;
    private proportionalLayout;
    private _root;
    private onDidSashResetRelay;
    readonly onDidSashReset: Event<number[]>;
    private disposable2x2;
    private root;
    orientation: Orientation;
    readonly width: number;
    readonly height: number;
    readonly minimumWidth: number;
    readonly minimumHeight: number;
    readonly maximumWidth: number;
    readonly maximumHeight: number;
    private _onDidChange;
    readonly onDidChange: Event<{
        width: number;
        height: number;
    }>;
    constructor(options?: IGridViewOptions);
    style(styles: IGridViewStyles): void;
    layout(width: number, height: number): void;
    addView(view: IView, size: number | Sizing, location: number[]): void;
    removeView(location: number[], sizing?: Sizing): IView;
    moveView(parentLocation: number[], from: number, to: number): void;
    swapViews(from: number[], to: number[]): void;
    resizeView(location: number[], size: number): void;
    getViewSize(location: number[]): {
        width: number;
        height: number;
    };
    maximizeViewSize(location: number[]): void;
    distributeViewSizes(location?: number[]): void;
    getViews(): GridBranchNode;
    private _getViews;
    private getNode;
    trySet2x2(): void;
    dispose(): void;
}
