import './iconlabel.css';
import { IMatch } from 'base/common/filters';
import { Disposable } from 'base/common/lifecycle';
export interface IIconLabelCreationOptions {
    supportHighlights?: boolean;
    supportDescriptionHighlights?: boolean;
    donotSupportOcticons?: boolean;
}
export interface IIconLabelValueOptions {
    title?: string;
    descriptionTitle?: string;
    hideIcon?: boolean;
    extraClasses?: string[];
    italic?: boolean;
    matches?: IMatch[];
    labelEscapeNewLines?: boolean;
    descriptionMatches?: IMatch[];
}
export declare class IconLabel extends Disposable {
    private domNode;
    private labelDescriptionContainer;
    private labelNode;
    private descriptionNode;
    private descriptionNodeFactory;
    constructor(container: HTMLElement, options?: IIconLabelCreationOptions);
    readonly element: HTMLElement;
    setLabel(label?: string, description?: string, options?: IIconLabelValueOptions): void;
}
