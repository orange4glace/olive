import './selectBox.css';
import { Event } from 'base/common/event';
import { Widget } from 'base/browser/ui/widget';
import { Color } from 'base/common/color';
import { IContextViewProvider } from 'base/browser/ui/contextview/contextview';
import { IListStyles } from 'base/browser/ui/list/listWidget';
export interface ISelectBoxDelegate {
    readonly onDidSelect: Event<ISelectData>;
    setOptions(options: ISelectOptionItem[], selected?: number): void;
    select(index: number): void;
    setAriaLabel(label: string): void;
    focus(): void;
    blur(): void;
    dispose(): void;
    render(container: HTMLElement): void;
    style(styles: ISelectBoxStyles): void;
    applyStyles(): void;
}
export interface ISelectBoxOptions {
    useCustomDrawn?: boolean;
    ariaLabel?: string;
    minBottomMargin?: number;
}
export interface ISelectOptionItem {
    text: string;
    decoratorRight?: string;
    description?: string;
    descriptionIsMarkdown?: boolean;
    isDisabled?: boolean;
}
export interface ISelectBoxStyles extends IListStyles {
    selectBackground?: Color;
    selectListBackground?: Color;
    selectForeground?: Color;
    decoratorRightForeground?: Color;
    selectBorder?: Color;
    selectListBorder?: Color;
    focusBorder?: Color;
}
export declare const defaultStyles: {
    selectBackground: Color;
    selectForeground: Color;
    selectBorder: Color;
};
export interface ISelectData {
    selected: string;
    index: number;
}
export declare class SelectBox extends Widget implements ISelectBoxDelegate {
    private styles;
    private selectBoxDelegate;
    constructor(options: ISelectOptionItem[], selected: number, contextViewProvider: IContextViewProvider, styles?: ISelectBoxStyles, selectBoxOptions?: ISelectBoxOptions);
    readonly onDidSelect: Event<ISelectData>;
    setOptions(options: ISelectOptionItem[], selected?: number): void;
    select(index: number): void;
    setAriaLabel(label: string): void;
    focus(): void;
    blur(): void;
    render(container: HTMLElement): void;
    style(styles: ISelectBoxStyles): void;
    applyStyles(): void;
}
