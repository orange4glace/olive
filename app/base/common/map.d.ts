import { URI } from 'base/common/uri';
import { Iterator } from './iterator';
export declare function values<V = any>(set: Set<V>): V[];
export declare function values<K = any, V = any>(map: Map<K, V>): V[];
export declare function keys<K, V>(map: Map<K, V>): K[];
export declare function getOrSet<K, V>(map: Map<K, V>, key: K, value: V): V;
export declare function mapToString<K, V>(map: Map<K, V>): string;
export declare function setToString<K>(set: Set<K>): string;
export declare function mapToSerializable(map: Map<string, string>): [string, string][];
export declare function serializableToMap(serializable: [string, string][]): Map<string, string>;
export interface IKeyIterator {
    reset(key: string): this;
    next(): this;
    hasNext(): boolean;
    cmp(a: string): number;
    value(): string;
}
export declare class StringIterator implements IKeyIterator {
    private _value;
    private _pos;
    reset(key: string): this;
    next(): this;
    hasNext(): boolean;
    cmp(a: string): number;
    value(): string;
}
export declare class PathIterator implements IKeyIterator {
    private _value;
    private _from;
    private _to;
    reset(key: string): this;
    hasNext(): boolean;
    next(): this;
    cmp(a: string): number;
    value(): string;
}
export declare class TernarySearchTree<E> {
    static forPaths<E>(): TernarySearchTree<E>;
    static forStrings<E>(): TernarySearchTree<E>;
    private _iter;
    private _root;
    constructor(segments: IKeyIterator);
    clear(): void;
    set(key: string, element: E): E | undefined;
    get(key: string): E | undefined;
    delete(key: string): void;
    findSubstr(key: string): E | undefined;
    findSuperstr(key: string): Iterator<E> | undefined;
    private _nodeIterator;
    forEach(callback: (value: E, index: string) => any): void;
    private _forEach;
}
export declare class ResourceMap<T> {
    protected readonly map: Map<string, T>;
    protected readonly ignoreCase?: boolean;
    constructor();
    set(resource: URI, value: T): void;
    get(resource: URI): T | undefined;
    has(resource: URI): boolean;
    readonly size: number;
    clear(): void;
    delete(resource: URI): boolean;
    forEach(clb: (value: T) => void): void;
    values(): T[];
    private toKey;
    keys(): URI[];
    clone(): ResourceMap<T>;
}
export declare enum Touch {
    None = 0,
    AsOld = 1,
    AsNew = 2
}
export declare class LinkedMap<K, V> {
    private _map;
    private _head;
    private _tail;
    private _size;
    constructor();
    clear(): void;
    isEmpty(): boolean;
    readonly size: number;
    has(key: K): boolean;
    get(key: K, touch?: Touch): V | undefined;
    set(key: K, value: V, touch?: Touch): void;
    delete(key: K): boolean;
    remove(key: K): V | undefined;
    shift(): V | undefined;
    forEach(callbackfn: (value: V, key: K, map: LinkedMap<K, V>) => void, thisArg?: any): void;
    values(): V[];
    keys(): K[];
    protected trimOld(newSize: number): void;
    private addItemFirst;
    private addItemLast;
    private removeItem;
    private touch;
    toJSON(): [K, V][];
    fromJSON(data: [K, V][]): void;
}
export declare class LRUCache<K, V> extends LinkedMap<K, V> {
    private _limit;
    private _ratio;
    constructor(limit: number, ratio?: number);
    limit: number;
    ratio: number;
    get(key: K): V | undefined;
    peek(key: K): V | undefined;
    set(key: K, value: V): void;
    private checkTrim;
}
