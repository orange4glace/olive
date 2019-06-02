/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { once } from 'base/common/functional';
export function isDisposable(thing) {
    return typeof thing.dispose === 'function'
        && thing.dispose.length === 0;
}
export function dispose(first, ...rest) {
    if (Array.isArray(first)) {
        first.forEach(d => d && d.dispose());
        return [];
    }
    else if (rest.length === 0) {
        if (first) {
            first.dispose();
            return first;
        }
        return undefined;
    }
    else {
        dispose(first);
        dispose(rest);
        return [];
    }
}
export function combinedDisposable(disposables) {
    return { dispose: () => dispose(disposables) };
}
export function toDisposable(fn) {
    return { dispose() { fn(); } };
}
export class Disposable {
    constructor() {
        this._toDispose = [];
        this._lifecycle_disposable_isDisposed = false;
    }
    get toDispose() { return this._toDispose; }
    dispose() {
        this._lifecycle_disposable_isDisposed = true;
        this._toDispose = dispose(this._toDispose);
    }
    _register(t) {
        if (this._lifecycle_disposable_isDisposed) {
            console.warn('Registering disposable on object that has already been disposed.');
            t.dispose();
        }
        else {
            this._toDispose.push(t);
        }
        return t;
    }
}
Disposable.None = Object.freeze({ dispose() { } });
export class ReferenceCollection {
    constructor() {
        this.references = Object.create(null);
    }
    acquire(key) {
        let reference = this.references[key];
        if (!reference) {
            reference = this.references[key] = { counter: 0, object: this.createReferencedObject(key) };
        }
        const { object } = reference;
        const dispose = once(() => {
            if (--reference.counter === 0) {
                this.destroyReferencedObject(key, reference.object);
                delete this.references[key];
            }
        });
        reference.counter++;
        return { object, dispose };
    }
}
export class ImmortalReference {
    constructor(object) {
        this.object = object;
    }
    dispose() { }
}
//# sourceMappingURL=lifecycle.js.map