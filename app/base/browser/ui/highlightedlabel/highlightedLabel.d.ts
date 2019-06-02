export interface IHighlight {
    start: number;
    end: number;
}
export declare class HighlightedLabel {
    private supportOcticons;
    private domNode;
    private text;
    private title;
    private highlights;
    private didEverRender;
    constructor(container: HTMLElement, supportOcticons: boolean);
    readonly element: HTMLElement;
    set(text: string | undefined, highlights?: IHighlight[], title?: string, escapeNewLines?: boolean): void;
    private render;
    static escapeNewLines(text: string, highlights: IHighlight[]): string;
}
