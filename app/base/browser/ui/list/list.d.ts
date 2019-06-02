import { GestureEvent } from 'base/browser/touch';
import { IKeyboardEvent } from 'base/browser/keyboardEvent';
import { IDragAndDropData } from 'base/browser/dnd';
export interface IListVirtualDelegate<T> {
    getHeight(element: T): number;
    getTemplateId(element: T): string;
    hasDynamicHeight?(element: T): boolean;
    setDynamicHeight?(element: T, height: number): void;
}
export interface IListRenderer<T, TTemplateData> {
    templateId: string;
    renderTemplate(container: HTMLElement): TTemplateData;
    renderElement(element: T, index: number, templateData: TTemplateData, dynamicHeightProbing?: boolean): void;
    disposeElement?(element: T, index: number, templateData: TTemplateData, dynamicHeightProbing?: boolean): void;
    disposeTemplate(templateData: TTemplateData): void;
}
export interface IListEvent<T> {
    elements: T[];
    indexes: number[];
    browserEvent?: UIEvent;
}
export interface IListMouseEvent<T> {
    browserEvent: MouseEvent;
    element: T | undefined;
    index: number | undefined;
}
export interface IListTouchEvent<T> {
    browserEvent: TouchEvent;
    element: T | undefined;
    index: number | undefined;
}
export interface IListGestureEvent<T> {
    browserEvent: GestureEvent;
    element: T | undefined;
    index: number | undefined;
}
export interface IListDragEvent<T> {
    browserEvent: DragEvent;
    element: T | undefined;
    index: number | undefined;
}
export interface IListContextMenuEvent<T> {
    browserEvent: UIEvent;
    element: T | undefined;
    index: number | undefined;
    anchor: HTMLElement | {
        x: number;
        y: number;
    };
}
export interface IIdentityProvider<T> {
    getId(element: T): {
        toString(): string;
    };
}
export declare enum ListAriaRootRole {
    /** default tree structure role */
    TREE = "tree",
    /** role='tree' can interfere with screenreaders reading nested elements inside the tree row. Use FORM in that case. */
    FORM = "form"
}
export interface IKeyboardNavigationLabelProvider<T> {
    /**
     * Return a keyboard navigation label which will be used by the
     * list for filtering/navigating. Return `undefined` to make an
     * element always match.
     */
    getKeyboardNavigationLabel(element: T): {
        toString(): string | undefined;
    } | undefined;
    mightProducePrintableCharacter?(event: IKeyboardEvent): boolean;
}
export declare enum ListDragOverEffect {
    Copy = 0,
    Move = 1
}
export interface IListDragOverReaction {
    accept: boolean;
    effect?: ListDragOverEffect;
    feedback?: number[];
}
export declare const ListDragOverReactions: {
    reject(): IListDragOverReaction;
    accept(): IListDragOverReaction;
};
export interface IListDragAndDrop<T> {
    getDragURI(element: T): string | null;
    getDragLabel?(elements: T[]): string | undefined;
    onDragStart?(data: IDragAndDropData, originalEvent: DragEvent): void;
    onDragOver(data: IDragAndDropData, targetElement: T | undefined, targetIndex: number | undefined, originalEvent: DragEvent): boolean | IListDragOverReaction;
    drop(data: IDragAndDropData, targetElement: T | undefined, targetIndex: number | undefined, originalEvent: DragEvent): void;
}
