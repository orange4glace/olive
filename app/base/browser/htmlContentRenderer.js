/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as DOM from 'base/browser/dom';
import { defaultGenerator } from 'base/common/idGenerator';
import { escape } from 'base/common/strings';
import { removeMarkdownEscapes } from 'base/common/htmlContent';
import * as marked from 'base/common/marked/marked';
import { onUnexpectedError } from 'base/common/errors';
import { URI } from 'base/common/uri';
import { parse } from 'base/common/marshalling';
import { cloneAndChange } from 'base/common/objects';
function createElement(options) {
    const tagName = options.inline ? 'span' : 'div';
    const element = document.createElement(tagName);
    if (options.className) {
        element.className = options.className;
    }
    return element;
}
export function renderText(text, options = {}) {
    const element = createElement(options);
    element.textContent = text;
    return element;
}
export function renderFormattedText(formattedText, options = {}) {
    const element = createElement(options);
    _renderFormattedText(element, parseFormattedText(formattedText), options.actionHandler);
    return element;
}
/**
 * Create html nodes for the given content element.
 */
export function renderMarkdown(markdown, options = {}) {
    const element = createElement(options);
    const _uriMassage = function (part) {
        let data;
        try {
            data = parse(decodeURIComponent(part));
        }
        catch (e) {
            // ignore
        }
        if (!data) {
            return part;
        }
        data = cloneAndChange(data, value => {
            if (markdown.uris && markdown.uris[value]) {
                return URI.revive(markdown.uris[value]);
            }
            else {
                return undefined;
            }
        });
        return encodeURIComponent(JSON.stringify(data));
    };
    const _href = function (href) {
        const data = markdown.uris && markdown.uris[href];
        if (!data) {
            return href;
        }
        let uri = URI.revive(data);
        if (uri.query) {
            uri = uri.with({ query: _uriMassage(uri.query) });
        }
        if (data) {
            href = uri.toString(true);
        }
        return href;
    };
    // signal to code-block render that the
    // element has been created
    let signalInnerHTML;
    const withInnerHTML = new Promise(c => signalInnerHTML = c);
    const renderer = new marked.Renderer();
    renderer.image = (href, title, text) => {
        href = _href(href);
        let dimensions = [];
        if (href) {
            const splitted = href.split('|').map(s => s.trim());
            href = splitted[0];
            const parameters = splitted[1];
            if (parameters) {
                const heightFromParams = /height=(\d+)/.exec(parameters);
                const widthFromParams = /width=(\d+)/.exec(parameters);
                const height = heightFromParams ? heightFromParams[1] : '';
                const width = widthFromParams ? widthFromParams[1] : '';
                const widthIsFinite = isFinite(parseInt(width));
                const heightIsFinite = isFinite(parseInt(height));
                if (widthIsFinite) {
                    dimensions.push(`width="${width}"`);
                }
                if (heightIsFinite) {
                    dimensions.push(`height="${height}"`);
                }
            }
        }
        let attributes = [];
        if (href) {
            attributes.push(`src="${href}"`);
        }
        if (text) {
            attributes.push(`alt="${text}"`);
        }
        if (title) {
            attributes.push(`title="${title}"`);
        }
        if (dimensions.length) {
            attributes = attributes.concat(dimensions);
        }
        return '<img ' + attributes.join(' ') + '>';
    };
    renderer.link = (href, title, text) => {
        // Remove markdown escapes. Workaround for https://github.com/chjj/marked/issues/829
        if (href === text) { // raw link case
            text = removeMarkdownEscapes(text);
        }
        href = _href(href);
        title = removeMarkdownEscapes(title);
        href = removeMarkdownEscapes(href);
        if (!href
            || href.match(/^data:|javascript:/i)
            || (href.match(/^command:/i) && !markdown.isTrusted)
            || href.match(/^command:(\/\/\/)?_workbench\.downloadResource/i)) {
            // drop the link
            return text;
        }
        else {
            // HTML Encode href
            href = href.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            return `<a href="#" data-href="${href}" title="${title || href}">${text}</a>`;
        }
    };
    renderer.paragraph = (text) => {
        return `<p>${text}</p>`;
    };
    if (options.codeBlockRenderer) {
        renderer.code = (code, lang) => {
            const value = options.codeBlockRenderer(lang, code);
            // when code-block rendering is async we return sync
            // but update the node with the real result later.
            const id = defaultGenerator.nextId();
            const promise = Promise.all([value, withInnerHTML]).then(values => {
                const strValue = values[0];
                const span = element.querySelector(`div[data-code="${id}"]`);
                if (span) {
                    span.innerHTML = strValue;
                }
            }).catch(err => {
                // ignore
            });
            if (options.codeBlockRenderCallback) {
                promise.then(options.codeBlockRenderCallback);
            }
            return `<div class="code" data-code="${id}">${escape(code)}</div>`;
        };
    }
    if (options.actionHandler) {
        options.actionHandler.disposeables.push(DOM.addStandardDisposableListener(element, 'click', event => {
            let target = event.target;
            if (target.tagName !== 'A') {
                target = target.parentElement;
                if (!target || target.tagName !== 'A') {
                    return;
                }
            }
            try {
                const href = target.dataset['href'];
                if (href) {
                    options.actionHandler.callback(href, event);
                }
            }
            catch (err) {
                onUnexpectedError(err);
            }
            finally {
                event.preventDefault();
            }
        }));
    }
    const markedOptions = {
        sanitize: true,
        renderer
    };
    element.innerHTML = marked.parse(markdown.value, markedOptions);
    signalInnerHTML();
    return element;
}
// --- formatted string parsing
class StringStream {
    constructor(source) {
        this.source = source;
        this.index = 0;
    }
    eos() {
        return this.index >= this.source.length;
    }
    next() {
        const next = this.peek();
        this.advance();
        return next;
    }
    peek() {
        return this.source[this.index];
    }
    advance() {
        this.index++;
    }
}
var FormatType;
(function (FormatType) {
    FormatType[FormatType["Invalid"] = 0] = "Invalid";
    FormatType[FormatType["Root"] = 1] = "Root";
    FormatType[FormatType["Text"] = 2] = "Text";
    FormatType[FormatType["Bold"] = 3] = "Bold";
    FormatType[FormatType["Italics"] = 4] = "Italics";
    FormatType[FormatType["Action"] = 5] = "Action";
    FormatType[FormatType["ActionClose"] = 6] = "ActionClose";
    FormatType[FormatType["NewLine"] = 7] = "NewLine";
})(FormatType || (FormatType = {}));
function _renderFormattedText(element, treeNode, actionHandler) {
    let child;
    if (treeNode.type === FormatType.Text) {
        child = document.createTextNode(treeNode.content || '');
    }
    else if (treeNode.type === FormatType.Bold) {
        child = document.createElement('b');
    }
    else if (treeNode.type === FormatType.Italics) {
        child = document.createElement('i');
    }
    else if (treeNode.type === FormatType.Action && actionHandler) {
        const a = document.createElement('a');
        a.href = '#';
        actionHandler.disposeables.push(DOM.addStandardDisposableListener(a, 'click', (event) => {
            actionHandler.callback(String(treeNode.index), event);
        }));
        child = a;
    }
    else if (treeNode.type === FormatType.NewLine) {
        child = document.createElement('br');
    }
    else if (treeNode.type === FormatType.Root) {
        child = element;
    }
    if (child && element !== child) {
        element.appendChild(child);
    }
    if (child && Array.isArray(treeNode.children)) {
        treeNode.children.forEach((nodeChild) => {
            _renderFormattedText(child, nodeChild, actionHandler);
        });
    }
}
function parseFormattedText(content) {
    const root = {
        type: FormatType.Root,
        children: []
    };
    let actionItemIndex = 0;
    let current = root;
    const stack = [];
    const stream = new StringStream(content);
    while (!stream.eos()) {
        let next = stream.next();
        const isEscapedFormatType = (next === '\\' && formatTagType(stream.peek()) !== FormatType.Invalid);
        if (isEscapedFormatType) {
            next = stream.next(); // unread the backslash if it escapes a format tag type
        }
        if (!isEscapedFormatType && isFormatTag(next) && next === stream.peek()) {
            stream.advance();
            if (current.type === FormatType.Text) {
                current = stack.pop();
            }
            const type = formatTagType(next);
            if (current.type === type || (current.type === FormatType.Action && type === FormatType.ActionClose)) {
                current = stack.pop();
            }
            else {
                const newCurrent = {
                    type: type,
                    children: []
                };
                if (type === FormatType.Action) {
                    newCurrent.index = actionItemIndex;
                    actionItemIndex++;
                }
                current.children.push(newCurrent);
                stack.push(current);
                current = newCurrent;
            }
        }
        else if (next === '\n') {
            if (current.type === FormatType.Text) {
                current = stack.pop();
            }
            current.children.push({
                type: FormatType.NewLine
            });
        }
        else {
            if (current.type !== FormatType.Text) {
                const textCurrent = {
                    type: FormatType.Text,
                    content: next
                };
                current.children.push(textCurrent);
                stack.push(current);
                current = textCurrent;
            }
            else {
                current.content += next;
            }
        }
    }
    if (current.type === FormatType.Text) {
        current = stack.pop();
    }
    if (stack.length) {
        // incorrectly formatted string literal
    }
    return root;
}
function isFormatTag(char) {
    return formatTagType(char) !== FormatType.Invalid;
}
function formatTagType(char) {
    switch (char) {
        case '*':
            return FormatType.Bold;
        case '_':
            return FormatType.Italics;
        case '[':
            return FormatType.Action;
        case ']':
            return FormatType.ActionClose;
        default:
            return FormatType.Invalid;
    }
}
//# sourceMappingURL=htmlContentRenderer.js.map