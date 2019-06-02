/**
 * Takes a Windows OS path and changes backward slashes to forward slashes.
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 */
export declare function toSlashes(osPath: string): string;
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
export declare function getRoot(path: string, sep?: string): string;
/**
 * Check if the path follows this pattern: `\\hostname\sharename`.
 *
 * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
 * @return A boolean indication if the path is a UNC path, on none-windows
 * always false.
 */
export declare function isUNC(path: string): boolean;
export declare function isValidBasename(name: string | null | undefined): boolean;
export declare function isEqual(pathA: string, pathB: string, ignoreCase?: boolean): boolean;
export declare function isEqualOrParent(path: string, candidate: string, ignoreCase?: boolean, separator?: "/" | "\\"): boolean;
export declare function isWindowsDriveLetter(char0: number): boolean;
export declare function sanitizeFilePath(candidate: string, cwd: string): string;
export declare function isRootOrDriveLetter(path: string): boolean;
