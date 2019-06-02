import { JSONPath } from './json';
import { Edit, FormattingOptions } from './jsonFormatter';
export declare function removeProperty(text: string, path: JSONPath, formattingOptions: FormattingOptions): Edit[];
export declare function setProperty(text: string, originalPath: JSONPath, value: any, formattingOptions: FormattingOptions, getInsertionIndex?: (properties: string[]) => number): Edit[];
export declare function applyEdit(text: string, edit: Edit): string;
export declare function applyEdits(text: string, edits: Edit[]): string;
export declare function isWS(text: string, offset: number): boolean;
