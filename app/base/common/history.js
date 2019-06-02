/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ArrayNavigator } from 'base/common/iterator';
export class HistoryNavigator {
    constructor(history = [], limit = 10) {
        this._initialize(history);
        this._limit = limit;
        this._onChange();
    }
    getHistory() {
        return this._elements;
    }
    add(t) {
        this._history.delete(t);
        this._history.add(t);
        this._onChange();
    }
    next() {
        return this._navigator.next();
    }
    previous() {
        return this._navigator.previous();
    }
    current() {
        return this._navigator.current();
    }
    parent() {
        return null;
    }
    first() {
        return this._navigator.first();
    }
    last() {
        return this._navigator.last();
    }
    has(t) {
        return this._history.has(t);
    }
    clear() {
        this._initialize([]);
        this._onChange();
    }
    _onChange() {
        this._reduceToLimit();
        this._navigator = new ArrayNavigator(this._elements, 0, this._elements.length, this._elements.length);
    }
    _reduceToLimit() {
        const data = this._elements;
        if (data.length > this._limit) {
            this._initialize(data.slice(data.length - this._limit));
        }
    }
    _initialize(history) {
        this._history = new Set();
        for (const entry of history) {
            this._history.add(entry);
        }
    }
    get _elements() {
        const elements = [];
        this._history.forEach(e => elements.push(e));
        return elements;
    }
}
//# sourceMappingURL=history.js.map