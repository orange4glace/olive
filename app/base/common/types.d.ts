/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */
export declare function isArray(array: any): array is any[];
/**
 * @returns whether the provided parameter is a JavaScript String or not.
 */
export declare function isString(str: any): str is string;
/**
 * @returns whether the provided parameter is a JavaScript Array and each element in the array is a string.
 */
export declare function isStringArray(value: any): value is string[];
/**
 *
 * @returns whether the provided parameter is of type `object` but **not**
 *	`null`, an `array`, a `regexp`, nor a `date`.
 */
export declare function isObject(obj: any): obj is Object;
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @returns whether the provided parameter is a JavaScript Number or not.
 */
export declare function isNumber(obj: any): obj is number;
/**
 * @returns whether the provided parameter is a JavaScript Boolean or not.
 */
export declare function isBoolean(obj: any): obj is boolean;
/**
 * @returns whether the provided parameter is undefined.
 */
export declare function isUndefined(obj: any): obj is undefined;
/**
 * @returns whether the provided parameter is undefined or null.
 */
export declare function isUndefinedOrNull(obj: any): obj is undefined | null;
/**
 * @returns whether the provided parameter is an empty JavaScript Object or not.
 */
export declare function isEmptyObject(obj: any): obj is any;
/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */
export declare function isFunction(obj: any): obj is Function;
/**
 * @returns whether the provided parameters is are JavaScript Function or not.
 */
export declare function areFunctions(...objects: any[]): boolean;
export declare type TypeConstraint = string | Function;
export declare function validateConstraints(args: any[], constraints: Array<TypeConstraint | undefined>): void;
export declare function validateConstraint(arg: any, constraint: TypeConstraint | undefined): void;
export declare function getAllPropertyNames(obj: object): string[];
/**
 * Converts null to undefined, passes all other values through.
 */
export declare function withNullAsUndefined<T>(x: T | null): T | undefined;
/**
 * Converts undefined to null, passes all other values through.
 */
export declare function withUndefinedAsNull<T>(x: T | undefined): T | null;
