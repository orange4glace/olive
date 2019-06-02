/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Returns an array which contains all values that reside
 * in the given set.
 */
export function values(from) {
    const result = [];
    for (let key in from) {
        if (hasOwnProperty.call(from, key)) {
            result.push(from[key]);
        }
    }
    return result;
}
export function size(from) {
    let count = 0;
    for (let key in from) {
        if (hasOwnProperty.call(from, key)) {
            count += 1;
        }
    }
    return count;
}
export function first(from) {
    for (let key in from) {
        if (hasOwnProperty.call(from, key)) {
            return from[key];
        }
    }
    return undefined;
}
/**
 * Iterates over each entry in the provided set. The iterator allows
 * to remove elements and will stop when the callback returns {{false}}.
 */
export function forEach(from, callback) {
    for (let key in from) {
        if (hasOwnProperty.call(from, key)) {
            const result = callback({ key: key, value: from[key] }, function () {
                delete from[key];
            });
            if (result === false) {
                return;
            }
        }
    }
}
/**
 * Groups the collection into a dictionary based on the provided
 * group function.
 */
export function groupBy(data, groupFn) {
    const result = Object.create(null);
    for (const element of data) {
        const key = groupFn(element);
        let target = result[key];
        if (!target) {
            target = result[key] = [];
        }
        target.push(element);
    }
    return result;
}
export function fromMap(original) {
    const result = Object.create(null);
    if (original) {
        original.forEach((value, key) => {
            result[key] = value;
        });
    }
    return result;
}
//# sourceMappingURL=collections.js.map