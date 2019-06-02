import './keybindingLabel.css';
import { OperatingSystem } from 'base/common/platform';
import { ResolvedKeybinding } from 'base/common/keyCodes';
export interface PartMatches {
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
    keyCode?: boolean;
}
export interface Matches {
    firstPart: PartMatches;
    chordPart: PartMatches;
}
export interface KeybindingLabelOptions {
    renderUnboundKeybindings: boolean;
}
export declare class KeybindingLabel {
    private os;
    private options?;
    private domNode;
    private keybinding;
    private matches;
    private didEverRender;
    constructor(container: HTMLElement, os: OperatingSystem, options?: KeybindingLabelOptions);
    readonly element: HTMLElement;
    set(keybinding: ResolvedKeybinding | undefined, matches?: Matches): void;
    private render;
    private renderPart;
    private renderKey;
    private renderUnbound;
    private static areSame;
}
