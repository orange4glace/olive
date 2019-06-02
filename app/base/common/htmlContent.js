/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { equals } from 'base/common/arrays';
export class MarkdownString {
    constructor(value = '') {
        this.value = value;
    }
    appendText(value) {
        // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
        this.value += value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
        return this;
    }
    appendMarkdown(value) {
        this.value += value;
        return this;
    }
    appendCodeblock(langId, code) {
        this.value += '\n```';
        this.value += langId;
        this.value += '\n';
        this.value += code;
        this.value += '\n```\n';
        return this;
    }
}
export function isEmptyMarkdownString(oneOrMany) {
    if (isMarkdownString(oneOrMany)) {
        return !oneOrMany.value;
    }
    else if (Array.isArray(oneOrMany)) {
        return oneOrMany.every(isEmptyMarkdownString);
    }
    else {
        return true;
    }
}
export function isMarkdownString(thing) {
    if (thing instanceof MarkdownString) {
        return true;
    }
    else if (thing && typeof thing === 'object') {
        return typeof thing.value === 'string'
            && (typeof thing.isTrusted === 'boolean' || thing.isTrusted === undefined);
    }
    return false;
}
export function markedStringsEquals(a, b) {
    if (!a && !b) {
        return true;
    }
    else if (!a || !b) {
        return false;
    }
    else if (Array.isArray(a) && Array.isArray(b)) {
        return equals(a, b, markdownStringEqual);
    }
    else if (isMarkdownString(a) && isMarkdownString(b)) {
        return markdownStringEqual(a, b);
    }
    else {
        return false;
    }
}
function markdownStringEqual(a, b) {
    if (a === b) {
        return true;
    }
    else if (!a || !b) {
        return false;
    }
    else {
        return a.value === b.value && a.isTrusted === b.isTrusted;
    }
}
export function removeMarkdownEscapes(text) {
    if (!text) {
        return text;
    }
    return text.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');
}
//# sourceMappingURL=htmlContent.js.map