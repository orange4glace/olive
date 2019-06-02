import { Event } from 'base/common/event';
import { ISelectBoxDelegate, ISelectOptionItem, ISelectBoxOptions, ISelectBoxStyles, ISelectData } from 'base/browser/ui/selectBox/selectBox';
export declare class SelectBoxNative implements ISelectBoxDelegate {
    private selectElement;
    private selectBoxOptions;
    private options;
    private selected;
    private readonly _onDidSelect;
    private toDispose;
    private styles;
    constructor(options: ISelectOptionItem[], selected: number, styles: ISelectBoxStyles, selectBoxOptions?: ISelectBoxOptions);
    private registerListeners;
    readonly onDidSelect: Event<ISelectData>;
    setOptions(options: ISelectOptionItem[], selected?: number): void;
    select(index: number): void;
    setAriaLabel(label: string): void;
    focus(): void;
    blur(): void;
    render(container: HTMLElement): void;
    style(styles: ISelectBoxStyles): void;
    applyStyles(): void;
    private createOption;
    dispose(): void;
}
