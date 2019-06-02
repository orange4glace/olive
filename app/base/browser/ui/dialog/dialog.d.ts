import './dialog.css';
import { Disposable } from 'base/common/lifecycle';
import { StandardKeyboardEvent } from 'base/browser/keyboardEvent';
import { Color } from 'base/common/color';
import { IButtonStyles } from 'base/browser/ui/button/button';
export interface IDialogOptions {
    cancelId?: number;
    detail?: string;
    type?: 'none' | 'info' | 'error' | 'question' | 'warning' | 'pending';
    keyEventProcessor?: (event: StandardKeyboardEvent) => void;
}
export interface IDialogStyles extends IButtonStyles {
    dialogForeground?: Color;
    dialogBackground?: Color;
    dialogShadow?: Color;
    dialogBorder?: Color;
}
export declare class Dialog extends Disposable {
    private container;
    private message;
    private buttons;
    private options;
    private element;
    private modal;
    private buttonsContainer;
    private messageDetailElement;
    private iconElement;
    private toolbarContainer;
    private buttonGroup;
    private styles;
    constructor(container: HTMLElement, message: string, buttons: string[], options: IDialogOptions);
    updateMessage(message: string): void;
    show(): Promise<number>;
    private applyStyles;
    style(style: IDialogStyles): void;
    dispose(): void;
}
