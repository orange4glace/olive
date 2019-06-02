import './progressbar.css';
import { Disposable } from 'base/common/lifecycle';
import { Color } from 'base/common/color';
export interface IProgressBarOptions extends IProgressBarStyles {
}
export interface IProgressBarStyles {
    progressBarBackground?: Color;
}
/**
 * A progress bar with support for infinite or discrete progress.
 */
export declare class ProgressBar extends Disposable {
    private options;
    private workedVal;
    private element;
    private bit;
    private totalWork;
    private progressBarBackground;
    private showDelayedScheduler;
    constructor(container: HTMLElement, options?: IProgressBarOptions);
    private create;
    private off;
    /**
     * Indicates to the progress bar that all work is done.
     */
    done(): ProgressBar;
    /**
     * Stops the progressbar from showing any progress instantly without fading out.
     */
    stop(): ProgressBar;
    private doDone;
    /**
     * Use this mode to indicate progress that has no total number of work units.
     */
    infinite(): ProgressBar;
    /**
     * Tells the progress bar the total number of work. Use in combination with workedVal() to let
     * the progress bar show the actual progress based on the work that is done.
     */
    total(value: number): ProgressBar;
    /**
     * Finds out if this progress bar is configured with total work
     */
    hasTotal(): boolean;
    /**
     * Tells the progress bar that an increment of work has been completed.
     */
    worked(value: number): ProgressBar;
    /**
     * Tells the progress bar the total amount of work that has been completed.
     */
    setWorked(value: number): ProgressBar;
    private doSetWorked;
    getContainer(): HTMLElement;
    show(delay?: number): void;
    hide(): void;
    style(styles: IProgressBarStyles): void;
    protected applyStyles(): void;
}
