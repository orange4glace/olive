import './gridview.css';
import { Orientation } from 'base/browser/ui/sash/sash';
import { IDisposable } from 'base/common/lifecycle';
import { IView, GridView, Sizing as GridViewSizing, Box, IGridViewStyles } from './gridview';
import { Event } from 'base/common/event';
import { LayoutPriority } from 'base/browser/ui/splitview/splitview';
export { Orientation } from './gridview';
export declare enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}
export interface GridLeafNode<T extends IView> {
    readonly view: T;
    readonly box: Box;
}
export interface GridBranchNode<T extends IView> {
    readonly children: GridNode<T>[];
    readonly box: Box;
}
export declare type GridNode<T extends IView> = GridLeafNode<T> | GridBranchNode<T>;
export declare function isGridBranchNode<T extends IView>(node: GridNode<T>): node is GridBranchNode<T>;
export declare function getRelativeLocation(rootOrientation: Orientation, location: number[], direction: Direction): number[];
export declare enum Sizing {
    Distribute = "distribute",
    Split = "split"
}
export interface IGridStyles extends IGridViewStyles {
}
export interface IGridOptions {
    styles?: IGridStyles;
    proportionalLayout?: boolean;
}
export declare class Grid<T extends IView> implements IDisposable {
    protected gridview: GridView;
    private views;
    private disposables;
    orientation: Orientation;
    readonly width: number;
    readonly height: number;
    readonly minimumWidth: number;
    readonly minimumHeight: number;
    readonly maximumWidth: number;
    readonly maximumHeight: number;
    readonly onDidChange: Event<{
        width: number;
        height: number;
    } | undefined>;
    readonly element: HTMLElement;
    sashResetSizing: Sizing;
    constructor(view: T, options?: IGridOptions);
    style(styles: IGridStyles): void;
    layout(width: number, height: number): void;
    hasView(view: T): boolean;
    addView(newView: T, size: number | Sizing, referenceView: T, direction: Direction): void;
    protected _addView(newView: T, size: number | GridViewSizing, location: number[]): void;
    removeView(view: T, sizing?: Sizing): void;
    moveView(view: T, sizing: number | Sizing, referenceView: T, direction: Direction): void;
    swapViews(from: T, to: T): void;
    resizeView(view: T, size: number): void;
    getViewSize(view: T): number;
    getViewSize2(view: T): {
        width: number;
        height: number;
    };
    maximizeViewSize(view: T): void;
    distributeViewSizes(): void;
    getViews(): GridBranchNode<T>;
    getNeighborViews(view: T, direction: Direction, wrap?: boolean): T[];
    private getViewLocation;
    private doResetViewSize;
    dispose(): void;
}
export interface ISerializableView extends IView {
    toJSON(): object;
}
export interface IViewDeserializer<T extends ISerializableView> {
    fromJSON(json: object | null): T;
}
export interface ISerializedLeafNode {
    type: 'leaf';
    data: object | null;
    size: number;
}
export interface ISerializedBranchNode {
    type: 'branch';
    data: ISerializedNode[];
    size: number;
}
export declare type ISerializedNode = ISerializedLeafNode | ISerializedBranchNode;
export interface ISerializedGrid {
    root: ISerializedNode;
    orientation: Orientation;
    width: number;
    height: number;
}
export declare class SerializableGrid<T extends ISerializableView> extends Grid<T> {
    private static serializeNode;
    private static deserializeNode;
    private static getFirstLeaf;
    static deserialize<T extends ISerializableView>(json: ISerializedGrid, deserializer: IViewDeserializer<T>, options?: IGridOptions): SerializableGrid<T>;
    /**
     * Useful information in order to proportionally restore view sizes
     * upon the very first layout call.
     */
    private initialLayoutContext;
    serialize(): ISerializedGrid;
    layout(width: number, height: number): void;
    /**
     * Recursively restores views which were just deserialized.
     */
    private restoreViews;
    /**
     * Recursively restores view sizes.
     * This should be called only after the very first layout call.
     */
    private restoreViewsSize;
}
export declare type GridNodeDescriptor = {
    size?: number;
    groups?: GridNodeDescriptor[];
};
export declare type GridDescriptor = {
    orientation: Orientation;
    groups?: GridNodeDescriptor[];
};
export declare function sanitizeGridNodeDescriptor(nodeDescriptor: GridNodeDescriptor): void;
export declare function createSerializedGrid(gridDescriptor: GridDescriptor): ISerializedGrid;
export declare class View implements IView {
    private view;
    readonly element: HTMLElement;
    private visible;
    private width;
    private height;
    private orientation;
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    private onDidChangeVisibility;
    readonly onDidChange: Event<{
        width: number;
        height: number;
    } | undefined>;
    readonly priority: LayoutPriority | undefined;
    readonly snapSize: number | undefined;
    constructor(view: IView);
    show(): void;
    hide(): void;
    layout(width: number, height: number, orientation: Orientation): void;
}
