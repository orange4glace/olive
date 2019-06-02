import { Widget } from 'base/browser/ui/widget';
/**
 * The arrow image size.
 */
export declare const ARROW_IMG_SIZE = 11;
export interface ScrollbarArrowOptions {
    onActivate: () => void;
    className: string;
    bgWidth: number;
    bgHeight: number;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}
export declare class ScrollbarArrow extends Widget {
    private _onActivate;
    bgDomNode: HTMLElement;
    domNode: HTMLElement;
    private _mousedownRepeatTimer;
    private _mousedownScheduleRepeatTimer;
    private _mouseMoveMonitor;
    constructor(opts: ScrollbarArrowOptions);
    private _arrowMouseDown;
}
