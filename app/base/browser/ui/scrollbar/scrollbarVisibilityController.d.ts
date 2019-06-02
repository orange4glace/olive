import { FastDomNode } from 'base/browser/fastDomNode';
import { Disposable } from 'base/common/lifecycle';
import { ScrollbarVisibility } from 'base/common/scrollable';
export declare class ScrollbarVisibilityController extends Disposable {
    private _visibility;
    private _visibleClassName;
    private _invisibleClassName;
    private _domNode;
    private _shouldBeVisible;
    private _isNeeded;
    private _isVisible;
    private _revealTimer;
    constructor(visibility: ScrollbarVisibility, visibleClassName: string, invisibleClassName: string);
    private applyVisibilitySetting;
    setShouldBeVisible(rawShouldBeVisible: boolean): void;
    setIsNeeded(isNeeded: boolean): void;
    setDomNode(domNode: FastDomNode<HTMLElement>): void;
    ensureVisibility(): void;
    private _reveal;
    private _hide;
}
