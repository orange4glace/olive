/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { canceled } from 'base/common/errors';
/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */
export function tail(array, n = 0) {
    return array[array.length - (1 + n)];
}
export function tail2(arr) {
    if (arr.length === 0) {
        throw new Error('Invalid tail call');
    }
    return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
export function equals(one, other, itemEquals = (a, b) => a === b) {
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
export function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
export function findFirstInSorted(array, p) {
    let low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}
/**
 * Like `Array#sort` but always stable. Usually runs a little slower `than Array#sort`
 * so only use this when actually needing stable sort.
 */
export function mergeSort(data, compare) {
    _sort(data, compare, 0, data.length - 1, []);
    return data;
}
function _merge(a, compare, lo, mid, hi, aux) {
    let leftIdx = lo, rightIdx = mid + 1;
    for (let i = lo; i <= hi; i++) {
        aux[i] = a[i];
    }
    for (let i = lo; i <= hi; i++) {
        if (leftIdx > mid) {
            // left side consumed
            a[i] = aux[rightIdx++];
        }
        else if (rightIdx > hi) {
            // right side consumed
            a[i] = aux[leftIdx++];
        }
        else if (compare(aux[rightIdx], aux[leftIdx]) < 0) {
            // right element is less -> comes first
            a[i] = aux[rightIdx++];
        }
        else {
            // left element comes first (less or equal)
            a[i] = aux[leftIdx++];
        }
    }
}
function _sort(a, compare, lo, hi, aux) {
    if (hi <= lo) {
        return;
    }
    const mid = lo + ((hi - lo) / 2) | 0;
    _sort(a, compare, lo, mid, aux);
    _sort(a, compare, mid + 1, hi, aux);
    if (compare(a[mid], a[mid + 1]) <= 0) {
        // left and right are sorted and if the last-left element is less
        // or equals than the first-right element there is nothing else
        // to do
        return;
    }
    _merge(a, compare, lo, mid, hi, aux);
}
export function groupBy(data, compare) {
    const result = [];
    let currentGroup = undefined;
    for (const element of mergeSort(data.slice(0), compare)) {
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
            currentGroup = [element];
            result.push(currentGroup);
        }
        else {
            currentGroup.push(element);
        }
    }
    return result;
}
/**
 * Diffs two *sorted* arrays and computes the splices which apply the diff.
 */
export function sortedDiff(before, after, compare) {
    const result = [];
    function pushSplice(start, deleteCount, toInsert) {
        if (deleteCount === 0 && toInsert.length === 0) {
            return;
        }
        const latest = result[result.length - 1];
        if (latest && latest.start + latest.deleteCount === start) {
            latest.deleteCount += deleteCount;
            latest.toInsert.push(...toInsert);
        }
        else {
            result.push({ start, deleteCount, toInsert });
        }
    }
    let beforeIdx = 0;
    let afterIdx = 0;
    while (true) {
        if (beforeIdx === before.length) {
            pushSplice(beforeIdx, 0, after.slice(afterIdx));
            break;
        }
        if (afterIdx === after.length) {
            pushSplice(beforeIdx, before.length - beforeIdx, []);
            break;
        }
        const beforeElement = before[beforeIdx];
        const afterElement = after[afterIdx];
        const n = compare(beforeElement, afterElement);
        if (n === 0) {
            // equal
            beforeIdx += 1;
            afterIdx += 1;
        }
        else if (n < 0) {
            // beforeElement is smaller -> before element removed
            pushSplice(beforeIdx, 1, []);
            beforeIdx += 1;
        }
        else if (n > 0) {
            // beforeElement is greater -> after element added
            pushSplice(beforeIdx, 0, [afterElement]);
            afterIdx += 1;
        }
    }
    return result;
}
/**
 * Takes two *sorted* arrays and computes their delta (removed, added elements).
 * Finishes in `Math.min(before.length, after.length)` steps.
 */
export function delta(before, after, compare) {
    const splices = sortedDiff(before, after, compare);
    const removed = [];
    const added = [];
    for (const splice of splices) {
        removed.push(...before.slice(splice.start, splice.start + splice.deleteCount));
        added.push(...splice.toInsert);
    }
    return { removed, added };
}
/**
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @return The first n elemnts from array when sorted with compare.
 */
export function top(array, compare, n) {
    if (n === 0) {
        return [];
    }
    const result = array.slice(0, n).sort(compare);
    topStep(array, compare, result, n, array.length);
    return result;
}
/**
 * Asynchronous variant of `top()` allowing for splitting up work in batches between which the event loop can run.
 *
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @param batch The number of elements to examine before yielding to the event loop.
 * @return The first n elemnts from array when sorted with compare.
 */
export function topAsync(array, compare, n, batch, token) {
    if (n === 0) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const o = array.length;
            const result = array.slice(0, n).sort(compare);
            for (let i = n, m = Math.min(n + batch, o); i < o; i = m, m = Math.min(m + batch, o)) {
                if (i > n) {
                    yield new Promise(resolve => setTimeout(resolve)); // nextTick() would starve I/O.
                }
                if (token && token.isCancellationRequested) {
                    throw canceled();
                }
                topStep(array, compare, result, i, m);
            }
            return result;
        }))()
            .then(resolve, reject);
    });
}
function topStep(array, compare, result, i, m) {
    for (const n = result.length; i < m; i++) {
        const element = array[i];
        if (compare(element, result[n - 1]) < 0) {
            result.pop();
            const j = findFirstInSorted(result, e => compare(element, e) < 0);
            result.splice(j, 0, element);
        }
    }
}
/**
 * @returns a new array with all falsy values removed. The original array IS NOT modified.
 */
export function coalesce(array) {
    if (!array) {
        return array;
    }
    return array.filter(e => !!e);
}
/**
 * Remove all falsey values from `array`. The original array IS modified.
 */
export function coalesceInPlace(array) {
    if (!array) {
        return;
    }
    let to = 0;
    for (let i = 0; i < array.length; i++) {
        if (!!array[i]) {
            array[to] = array[i];
            to += 1;
        }
    }
    array.length = to;
}
/**
 * Moves the element in the array for the provided positions.
 */
export function move(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}
/**
 * @returns false if the provided object is an array and not empty.
 */
export function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
/**
 * @returns True if the provided object is an array and has at least one element.
 */
export function isNonEmptyArray(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
export function distinct(array, keyFn) {
    if (!keyFn) {
        return array.filter((element, position) => {
            return array.indexOf(element) === position;
        });
    }
    const seen = Object.create(null);
    return array.filter((elem) => {
        const key = keyFn(elem);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    });
}
export function distinctES6(array) {
    const seen = new Set();
    return array.filter(element => {
        if (seen.has(element)) {
            return false;
        }
        seen.add(element);
        return true;
    });
}
export function uniqueFilter(keyFn) {
    const seen = Object.create(null);
    return element => {
        const key = keyFn(element);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    };
}
export function lastIndex(array, fn) {
    for (let i = array.length - 1; i >= 0; i--) {
        const element = array[i];
        if (fn(element)) {
            return i;
        }
    }
    return -1;
}
export function firstIndex(array, fn) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (fn(element)) {
            return i;
        }
    }
    return -1;
}
export function first(array, fn, notFoundValue = undefined) {
    const index = firstIndex(array, fn);
    return index < 0 ? notFoundValue : array[index];
}
export function commonPrefixLength(one, other, equals = (a, b) => a === b) {
    let result = 0;
    for (let i = 0, len = Math.min(one.length, other.length); i < len && equals(one[i], other[i]); i++) {
        result++;
    }
    return result;
}
export function flatten(arr) {
    return [].concat(...arr);
}
export function range(arg, to) {
    let from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') {
        from = arg;
    }
    else {
        from = 0;
        to = arg;
    }
    const result = [];
    if (from <= to) {
        for (let i = from; i < to; i++) {
            result.push(i);
        }
    }
    else {
        for (let i = from; i > to; i--) {
            result.push(i);
        }
    }
    return result;
}
export function fill(num, value, arr = []) {
    for (let i = 0; i < num; i++) {
        arr[i] = value;
    }
    return arr;
}
export function index(array, indexer, merger = t => t) {
    return array.reduce((r, t) => {
        const key = indexer(t);
        r[key] = merger(t, r[key]);
        return r;
    }, Object.create(null));
}
/**
 * Inserts an element into an array. Returns a function which, when
 * called, will remove that element from the array.
 */
export function insert(array, element) {
    array.push(element);
    return () => {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    };
}
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 */
export function arrayInsert(target, insertIndex, insertArr) {
    const before = target.slice(0, insertIndex);
    const after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}
/**
 * Uses Fisher-Yates shuffle to shuffle the given array
 */
export function shuffle(array, _seed) {
    let rand;
    if (typeof _seed === 'number') {
        let seed = _seed;
        // Seeded random number generator in JS. Modified from:
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        rand = () => {
            const x = Math.sin(seed++) * 179426549; // throw away most significant digits and reduce any potential bias
            return x - Math.floor(x);
        };
    }
    else {
        rand = Math.random;
    }
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/**
 * Pushes an element to the start of the array, if found.
 */
export function pushToStart(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
    }
}
/**
 * Pushes an element to the end of the array, if found.
 */
export function pushToEnd(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
    }
}
export function find(arr, predicate) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (predicate(element, i, arr)) {
            return element;
        }
    }
    return undefined;
}
export function mapArrayOrNot(items, fn) {
    return Array.isArray(items) ?
        items.map(fn) :
        fn(items);
}
export function asArray(x) {
    return Array.isArray(x) ? x : [x];
}
//# sourceMappingURL=arrays.js.map