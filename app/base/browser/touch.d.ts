import { Disposable } from 'base/common/lifecycle';
export declare namespace EventType {
    const Tap = "-monaco-gesturetap";
    const Change = "-monaco-gesturechange";
    const Start = "-monaco-gesturestart";
    const End = "-monaco-gesturesend";
    const Contextmenu = "-monaco-gesturecontextmenu";
}
export interface GestureEvent extends MouseEvent {
    initialTarget: EventTarget | undefined;
    translationX: number;
    translationY: number;
    pageX: number;
    pageY: number;
}
export declare class Gesture extends Disposable {
    private static readonly SCROLL_FRICTION;
    private static INSTANCE;
    private static HOLD_DELAY;
    private dispatched;
    private targets;
    private handle;
    private activeTouches;
    private constructor();
    static addTarget(element: HTMLElement): void;
    private static isTouchDevice;
    dispose(): void;
    private onTouchStart;
    private onTouchEnd;
    private newGestureEvent;
    private dispatchEvent;
    private inertia;
    private onTouchMove;
}
