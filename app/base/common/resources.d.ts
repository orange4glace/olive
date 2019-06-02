import { URI } from 'base/common/uri';
import { IExpression } from 'base/common/glob';
export declare function getComparisonKey(resource: URI): string;
export declare function hasToIgnoreCase(resource: URI | undefined): boolean;
export declare function basenameOrAuthority(resource: URI): string;
/**
 * Tests whether a `candidate` URI is a parent or equal of a given `base` URI.
 * @param base A uri which is "longer"
 * @param parentCandidate A uri which is "shorter" then `base`
 */
export declare function isEqualOrParent(base: URI, parentCandidate: URI, ignoreCase?: boolean): boolean;
/**
 * Tests wheter the two authorities are the same
 */
export declare function isEqualAuthority(a1: string, a2: string): boolean;
export declare function isEqual(first: URI | undefined, second: URI | undefined, ignoreCase?: boolean): boolean;
export declare function basename(resource: URI): string;
export declare function extname(resource: URI): string;
/**
 * Return a URI representing the directory of a URI path.
 *
 * @param resource The input URI.
 * @returns The URI representing the directory of the input URI.
 */
export declare function dirname(resource: URI): URI;
/**
 * Join a URI path with path fragments and normalizes the resulting path.
 *
 * @param resource The input URI.
 * @param pathFragment The path fragment to add to the URI path.
 * @returns The resulting URI.
 */
export declare function joinPath(resource: URI, ...pathFragment: string[]): URI;
/**
 * Normalizes the path part of a URI: Resolves `.` and `..` elements with directory names.
 *
 * @param resource The URI to normalize the path.
 * @returns The URI with the normalized path.
 */
export declare function normalizePath(resource: URI): URI;
/**
 * Returns the fsPath of an URI where the drive letter is not normalized.
 * See #56403.
 */
export declare function originalFSPath(uri: URI): string;
/**
 * Returns true if the URI path is absolute.
 */
export declare function isAbsolutePath(resource: URI): boolean;
/**
 * Returns true if the URI path has a trailing path separator
 */
export declare function hasTrailingPathSeparator(resource: URI): boolean;
/**
 * Removes a trailing path seperator, if theres one.
 * Important: Doesn't remove the first slash, it would make the URI invalid
 */
export declare function removeTrailingPathSeparator(resource: URI): URI;
/**
 * Returns a relative path between two URIs. If the URIs don't have the same schema or authority, `undefined` is returned.
 * The returned relative path always uses forward slashes.
 */
export declare function relativePath(from: URI, to: URI): string | undefined;
/**
 * Resolves a absolute or relative path against a base URI.
 */
export declare function resolvePath(base: URI, path: string): URI;
export declare function distinctParents<T>(items: T[], resourceAccessor: (item: T) => URI): T[];
/**
 * Data URI related helpers.
 */
export declare namespace DataUri {
    const META_DATA_LABEL = "label";
    const META_DATA_DESCRIPTION = "description";
    const META_DATA_SIZE = "size";
    const META_DATA_MIME = "mime";
    function parseMetaData(dataUri: URI): Map<string, string>;
}
export declare class ResourceGlobMatcher {
    private readonly globalExpression;
    private readonly expressionsByRoot;
    constructor(globalExpression: IExpression, rootExpressions: {
        root: URI;
        expression: IExpression;
    }[]);
    matches(resource: URI): boolean;
}
export declare function toLocalResource(resource: URI, authority: string | undefined): URI;
