import { Disposable } from 'base/common/lifecycle';
export interface IStandardMouseMoveEventData {
    leftButton: boolean;
    posx: number;
    posy: number;
}
export interface IEventMerger<R> {
    (lastEvent: R, currentEvent: MouseEvent): R;
}
export interface IMouseMoveCallback<R> {
    (mouseMoveData: R): void;
}
export interface IOnStopCallback {
    (): void;
}
export declare function standardMouseMoveMerger(lastEvent: IStandardMouseMoveEventData, currentEvent: MouseEvent): IStandardMouseMoveEventData;
export declare class GlobalMouseMoveMonitor<R> extends Disposable {
    private hooks;
    private mouseMoveEventMerger;
    private mouseMoveCallback;
    private onStopCallback;
    constructor();
    dispose(): void;
    stopMonitoring(invokeStopCallback: boolean): void;
    isMonitoring(): boolean;
    startMonitoring(mouseMoveEventMerger: IEventMerger<R>, mouseMoveCallback: IMouseMoveCallback<R>, onStopCallback: IOnStopCallback): void;
}
