import { IdleValue } from 'base/common/async';
export declare function setFileNameComparer(collator: IdleValue<{
    collator: Intl.Collator;
    collatorIsNumeric: boolean;
}>): void;
export declare function compareFileNames(one: string | null, other: string | null, caseSensitive?: boolean): number;
export declare function noIntlCompareFileNames(one: string | null, other: string | null, caseSensitive?: boolean): number;
export declare function compareFileExtensions(one: string | null, other: string | null): number;
export declare function comparePaths(one: string, other: string, caseSensitive?: boolean): number;
export declare function compareAnything(one: string, other: string, lookFor: string): number;
export declare function compareByPrefix(one: string, other: string, lookFor: string): number;
