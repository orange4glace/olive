/**
 * Return a hash value for an object.
 */
export declare function hash(obj: any, hashVal?: number): number;
export declare class Hasher {
    private _value;
    readonly value: number;
    hash(obj: any): number;
}
