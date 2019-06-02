/**
 * The normalize() method returns the Unicode Normalization Form of a given string. The form will be
 * the Normalization Form Canonical Composition.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize}
 */
export declare const canNormalize: boolean;
export declare function normalizeNFC(str: string): string;
export declare function normalizeNFD(str: string): string;
