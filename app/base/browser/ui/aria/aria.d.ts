import './aria.css';
export declare function setARIAContainer(parent: HTMLElement): void;
/**
 * Given the provided message, will make sure that it is read as alert to screen readers.
 */
export declare function alert(msg: string, disableRepeat?: boolean): void;
/**
 * Given the provided message, will make sure that it is read as status to screen readers.
 */
export declare function status(msg: string, disableRepeat?: boolean): void;
