import './inputBox.css';
import { IAction } from 'base/common/actions';
import { IContextViewProvider } from 'base/browser/ui/contextview/contextview';
import { Event } from 'base/common/event';
import { Widget } from 'base/browser/ui/widget';
import { Color } from 'base/common/color';
import { IHistoryNavigationWidget } from 'base/browser/history';
export interface IInputOptions extends IInputBoxStyles {
    readonly placeholder?: string;
    readonly ariaLabel?: string;
    readonly type?: string;
    readonly validationOptions?: IInputValidationOptions;
    readonly flexibleHeight?: boolean;
    readonly actions?: IAction[];
}
export interface IInputBoxStyles {
    readonly inputBackground?: Color;
    readonly inputForeground?: Color;
    readonly inputBorder?: Color;
    readonly inputValidationInfoBorder?: Color;
    readonly inputValidationInfoBackground?: Color;
    readonly inputValidationInfoForeground?: Color;
    readonly inputValidationWarningBorder?: Color;
    readonly inputValidationWarningBackground?: Color;
    readonly inputValidationWarningForeground?: Color;
    readonly inputValidationErrorBorder?: Color;
    readonly inputValidationErrorBackground?: Color;
    readonly inputValidationErrorForeground?: Color;
}
export interface IInputValidator {
    (value: string): IMessage | null;
}
export interface IMessage {
    readonly content: string;
    readonly formatContent?: boolean;
    readonly type?: MessageType;
}
export interface IInputValidationOptions {
    validation?: IInputValidator;
}
export declare enum MessageType {
    INFO = 1,
    WARNING = 2,
    ERROR = 3
}
export interface IRange {
    start: number;
    end: number;
}
export declare class InputBox extends Widget {
    private contextViewProvider?;
    element: HTMLElement;
    private input;
    private mirror;
    private actionbar?;
    private options;
    private message;
    private placeholder;
    private ariaLabel;
    private validation?;
    private state;
    private cachedHeight;
    private inputBackground?;
    private inputForeground?;
    private inputBorder?;
    private inputValidationInfoBorder?;
    private inputValidationInfoBackground?;
    private inputValidationInfoForeground?;
    private inputValidationWarningBorder?;
    private inputValidationWarningBackground?;
    private inputValidationWarningForeground?;
    private inputValidationErrorBorder?;
    private inputValidationErrorBackground?;
    private inputValidationErrorForeground?;
    private _onDidChange;
    readonly onDidChange: Event<string>;
    private _onDidHeightChange;
    readonly onDidHeightChange: Event<number>;
    constructor(container: HTMLElement, contextViewProvider: IContextViewProvider | undefined, options?: IInputOptions);
    private onBlur;
    private onFocus;
    setPlaceHolder(placeHolder: string): void;
    setAriaLabel(label: string): void;
    readonly mirrorElement: HTMLElement;
    readonly inputElement: HTMLInputElement;
    value: string;
    readonly height: number;
    focus(): void;
    blur(): void;
    hasFocus(): boolean;
    select(range?: IRange | null): void;
    enable(): void;
    disable(): void;
    setEnabled(enabled: boolean): void;
    width: number;
    showMessage(message: IMessage, force?: boolean): void;
    hideMessage(): void;
    isInputValid(): boolean;
    validate(): boolean;
    private stylesForType;
    private classForType;
    private _showMessage;
    private _hideMessage;
    private onValueChange;
    private updateMirror;
    style(styles: IInputBoxStyles): void;
    protected applyStyles(): void;
    layout(): void;
    dispose(): void;
}
export interface IHistoryInputOptions extends IInputOptions {
    history: string[];
}
export declare class HistoryInputBox extends InputBox implements IHistoryNavigationWidget {
    private readonly history;
    constructor(container: HTMLElement, contextViewProvider: IContextViewProvider | undefined, options: IHistoryInputOptions);
    addToHistory(): void;
    getHistory(): string[];
    showNextValue(): void;
    showPreviousValue(): void;
    clearHistory(): void;
    private getCurrentValue;
    private getPreviousValue;
    private getNextValue;
}
