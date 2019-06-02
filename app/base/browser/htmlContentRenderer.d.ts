import { IMarkdownString } from 'base/common/htmlContent';
import { IMouseEvent } from 'base/browser/mouseEvent';
import { IDisposable } from 'base/common/lifecycle';
export interface IContentActionHandler {
    callback: (content: string, event?: IMouseEvent) => void;
    disposeables: IDisposable[];
}
export interface RenderOptions {
    className?: string;
    inline?: boolean;
    actionHandler?: IContentActionHandler;
    codeBlockRenderer?: (modeId: string, value: string) => Promise<string>;
    codeBlockRenderCallback?: () => void;
}
export declare function renderText(text: string, options?: RenderOptions): HTMLElement;
export declare function renderFormattedText(formattedText: string, options?: RenderOptions): HTMLElement;
/**
 * Create html nodes for the given content element.
 */
export declare function renderMarkdown(markdown: IMarkdownString, options?: RenderOptions): HTMLElement;
