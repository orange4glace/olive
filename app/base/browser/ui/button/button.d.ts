import './button.css';
import { Color } from 'base/common/color';
import { Event as BaseEvent } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
export interface IButtonOptions extends IButtonStyles {
    title?: boolean;
}
export interface IButtonStyles {
    buttonBackground?: Color;
    buttonHoverBackground?: Color;
    buttonForeground?: Color;
    buttonBorder?: Color;
}
export declare class Button extends Disposable {
    private _element;
    private options;
    private buttonBackground;
    private buttonHoverBackground;
    private buttonForeground;
    private buttonBorder;
    private _onDidClick;
    readonly onDidClick: BaseEvent<Event>;
    private focusTracker;
    constructor(container: HTMLElement, options?: IButtonOptions);
    private setHoverBackground;
    style(styles: IButtonStyles): void;
    private applyStyles;
    readonly element: HTMLElement;
    label: string;
    icon: string;
    enabled: boolean;
    focus(): void;
}
export declare class ButtonGroup extends Disposable {
    private _buttons;
    constructor(container: HTMLElement, count: number, options?: IButtonOptions);
    readonly buttons: Button[];
    private create;
}
