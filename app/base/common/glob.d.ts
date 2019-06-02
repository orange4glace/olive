export interface IExpression {
    [pattern: string]: boolean | SiblingClause;
}
export interface IRelativePattern {
    base: string;
    pattern: string;
}
export declare function getEmptyExpression(): IExpression;
export interface SiblingClause {
    when: string;
}
export declare function splitGlobAware(pattern: string, splitChar: string): string[];
export declare type ParsedPattern = (path: string, basename?: string) => boolean;
export declare type ParsedExpression = (path: string, basename?: string, hasSibling?: (name: string) => boolean | Promise<boolean>) => string | null | Promise<string | null>;
export interface IGlobOptions {
    /**
     * Simplify patterns for use as exclusion filters during tree traversal to skip entire subtrees. Cannot be used outside of a tree traversal.
     */
    trimForExclusions?: boolean;
}
/**
 * Simplified glob matching. Supports a subset of glob patterns:
 * - * matches anything inside a path segment
 * - ? matches 1 character inside a path segment
 * - ** matches anything including an empty path segment
 * - simple brace expansion ({js,ts} => js or ts)
 * - character ranges (using [...])
 */
export declare function match(pattern: string | IRelativePattern, path: string): boolean;
export declare function match(expression: IExpression, path: string, hasSibling?: (name: string) => boolean): string;
/**
 * Simplified glob matching. Supports a subset of glob patterns:
 * - * matches anything inside a path segment
 * - ? matches 1 character inside a path segment
 * - ** matches anything including an empty path segment
 * - simple brace expansion ({js,ts} => js or ts)
 * - character ranges (using [...])
 */
export declare function parse(pattern: string | IRelativePattern, options?: IGlobOptions): ParsedPattern;
export declare function parse(expression: IExpression, options?: IGlobOptions): ParsedExpression;
export declare function hasSiblingPromiseFn(siblingsFn?: () => Promise<string[]>): (name: string) => Promise<boolean>;
export declare function hasSiblingFn(siblingsFn?: () => string[]): (name: string) => boolean;
export declare function isRelativePattern(obj: unknown): obj is IRelativePattern;
export declare function getBasenameTerms(patternOrExpression: ParsedPattern | ParsedExpression): string[];
export declare function getPathTerms(patternOrExpression: ParsedPattern | ParsedExpression): string[];
