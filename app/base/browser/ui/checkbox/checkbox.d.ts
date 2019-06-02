import './checkbox.css';
import { IKeyboardEvent } from 'base/browser/keyboardEvent';
import { Widget } from 'base/browser/ui/widget';
import { Color } from 'base/common/color';
import { Event } from 'base/common/event';
import { BaseActionItem } from 'base/browser/ui/actionbar/actionbar';
export interface ICheckboxOpts extends ICheckboxStyles {
    readonly actionClassName?: string;
    readonly title: string;
    readonly isChecked: boolean;
}
export interface ICheckboxStyles {
    inputActiveOptionBorder?: Color;
}
export declare class CheckboxActionItem extends BaseActionItem {
    private checkbox;
    private disposables;
    render(container: HTMLElement): void;
    updateEnabled(): void;
    updateChecked(): void;
    dipsose(): void;
}
export declare class Checkbox extends Widget {
    private readonly _onChange;
    readonly onChange: Event<boolean>;
    private readonly _onKeyDown;
    readonly onKeyDown: Event<IKeyboardEvent>;
    private readonly _opts;
    readonly domNode: HTMLElement;
    private _checked;
    constructor(opts: ICheckboxOpts);
    readonly enabled: boolean;
    focus(): void;
    checked: boolean;
    width(): number;
    style(styles: ICheckboxStyles): void;
    protected applyStyles(): void;
    enable(): void;
    disable(): void;
}
