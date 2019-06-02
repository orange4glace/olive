/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function rot(index, modulo) {
    return (modulo + (index % modulo)) % modulo;
}
export class Counter {
    constructor() {
        this._next = 0;
    }
    getNext() {
        return this._next++;
    }
}
//# sourceMappingURL=numbers.js.map