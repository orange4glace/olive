export declare const MIME_TEXT = "text/plain";
export declare const MIME_BINARY = "application/octet-stream";
export declare const MIME_UNKNOWN = "application/unknown";
export interface ITextMimeAssociation {
    readonly id: string;
    readonly mime: string;
    readonly filename?: string;
    readonly extension?: string;
    readonly filepattern?: string;
    readonly firstline?: RegExp;
    readonly userConfigured?: boolean;
}
/**
 * Associate a text mime to the registry.
 */
export declare function registerTextMime(association: ITextMimeAssociation, warnOnOverwrite?: boolean): void;
/**
 * Clear text mimes from the registry.
 */
export declare function clearTextMimes(onlyUserConfigured?: boolean): void;
/**
 * Given a file, return the best matching mime type for it
 */
export declare function guessMimeTypes(path: string | null, firstLine?: string): string[];
export declare function isUnspecific(mime: string[] | string): boolean;
/**
 * Returns a suggestion for the filename by the following logic:
 * 1. If a relevant extension exists and is an actual filename extension (starting with a dot), suggest the prefix appended by the first one.
 * 2. Otherwise, if there are other extensions, suggest the first one.
 * 3. Otherwise, suggest the prefix.
 */
export declare function suggestFilename(langId: string | null, prefix: string): string;
export declare function getMediaMime(path: string): string | undefined;
