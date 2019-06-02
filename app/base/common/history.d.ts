import { INavigator } from 'base/common/iterator';
export declare class HistoryNavigator<T> implements INavigator<T> {
    private _history;
    private _limit;
    private _navigator;
    constructor(history?: T[], limit?: number);
    getHistory(): T[];
    add(t: T): void;
    next(): T | null;
    previous(): T | null;
    current(): T | null;
    parent(): null;
    first(): T | null;
    last(): T | null;
    has(t: T): boolean;
    clear(): void;
    private _onChange;
    private _reduceToLimit;
    private _initialize;
    private readonly _elements;
}
