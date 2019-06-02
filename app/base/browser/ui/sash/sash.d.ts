import './sash.css';
import { Disposable } from 'base/common/lifecycle';
import { Event } from 'base/common/event';
export interface ISashLayoutProvider {
}
export interface IVerticalSashLayoutProvider extends ISashLayoutProvider {
    getVerticalSashLeft(sash: Sash): number;
    getVerticalSashTop?(sash: Sash): number;
    getVerticalSashHeight?(sash: Sash): number;
}
export interface IHorizontalSashLayoutProvider extends ISashLayoutProvider {
    getHorizontalSashTop(sash: Sash): number;
    getHorizontalSashLeft?(sash: Sash): number;
    getHorizontalSashWidth?(sash: Sash): number;
}
export interface ISashEvent {
    startX: number;
    currentX: number;
    startY: number;
    currentY: number;
    altKey: boolean;
}
export interface ISashOptions {
    orientation?: Orientation;
    orthogonalStartSash?: Sash;
    orthogonalEndSash?: Sash;
}
export declare enum Orientation {
    VERTICAL = 0,
    HORIZONTAL = 1
}
export declare enum SashState {
    Disabled = 0,
    Minimum = 1,
    Maximum = 2,
    Enabled = 3
}
export declare class Sash extends Disposable {
    private el;
    private layoutProvider;
    private hidden;
    private orientation;
    private _state;
    state: SashState;
    private readonly _onDidEnablementChange;
    readonly onDidEnablementChange: Event<SashState>;
    private readonly _onDidStart;
    readonly onDidStart: Event<ISashEvent>;
    private readonly _onDidChange;
    readonly onDidChange: Event<ISashEvent>;
    private readonly _onDidReset;
    readonly onDidReset: Event<void>;
    private readonly _onDidEnd;
    readonly onDidEnd: Event<void>;
    linkedSash: Sash | undefined;
    private orthogonalStartSashDisposables;
    private _orthogonalStartSash;
    orthogonalStartSash: Sash | undefined;
    private orthogonalEndSashDisposables;
    private _orthogonalEndSash;
    orthogonalEndSash: Sash | undefined;
    constructor(container: HTMLElement, layoutProvider: ISashLayoutProvider, options?: ISashOptions);
    setOrientation(orientation: Orientation): void;
    private onMouseDown;
    private onMouseDoubleClick;
    private onTouchStart;
    layout(): void;
    show(): void;
    hide(): void;
    isHidden(): boolean;
    private onOrthogonalStartSashEnablementChange;
    private onOrthogonalEndSashEnablementChange;
    dispose(): void;
}
