import { ISplitViewStyles } from 'base/browser/ui/splitview/splitview';
import { IView } from 'base/browser/ui/grid/gridview';
import { Color } from 'base/common/color';
export interface CenteredViewState {
    leftMarginRatio: number;
    rightMarginRatio: number;
}
export interface ICenteredViewStyles extends ISplitViewStyles {
    background: Color;
}
export declare class CenteredViewLayout {
    private container;
    private view;
    readonly state: CenteredViewState;
    private splitView?;
    private width;
    private height;
    private style;
    private didLayout;
    private emptyViews;
    private splitViewDisposables;
    constructor(container: HTMLElement, view: IView, state?: CenteredViewState);
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    layout(width: number, height: number): void;
    private resizeMargins;
    isActive(): boolean;
    styles(style: ICenteredViewStyles): void;
    activate(active: boolean): void;
    isDefault(state: CenteredViewState): boolean;
    dispose(): void;
}
