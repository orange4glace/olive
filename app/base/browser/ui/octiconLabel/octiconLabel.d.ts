import './octicons/octicons.css';
import './octicons/octicons-animations.css';
export declare function renderOcticons(label: string): string;
export declare class OcticonLabel {
    private readonly _container;
    constructor(_container: HTMLElement);
    text: string;
    title: string;
}
