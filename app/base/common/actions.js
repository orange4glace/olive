/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { combinedDisposable, Disposable } from 'base/common/lifecycle';
import { Emitter } from 'base/common/event';
export class Action {
    constructor(id, label = '', cssClass = '', enabled = true, actionCallback) {
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this._id = id;
        this._label = label;
        this._cssClass = cssClass;
        this._enabled = enabled;
        this._actionCallback = actionCallback;
    }
    get id() {
        return this._id;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._setLabel(value);
    }
    _setLabel(value) {
        if (this._label !== value) {
            this._label = value;
            this._onDidChange.fire({ label: value });
        }
    }
    get tooltip() {
        return this._tooltip;
    }
    set tooltip(value) {
        this._setTooltip(value);
    }
    _setTooltip(value) {
        if (this._tooltip !== value) {
            this._tooltip = value;
            this._onDidChange.fire({ tooltip: value });
        }
    }
    get class() {
        return this._cssClass;
    }
    set class(value) {
        this._setClass(value);
    }
    _setClass(value) {
        if (this._cssClass !== value) {
            this._cssClass = value;
            this._onDidChange.fire({ class: value });
        }
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._setEnabled(value);
    }
    _setEnabled(value) {
        if (this._enabled !== value) {
            this._enabled = value;
            this._onDidChange.fire({ enabled: value });
        }
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._setChecked(value);
    }
    get radio() {
        return this._radio;
    }
    set radio(value) {
        this._setRadio(value);
    }
    _setChecked(value) {
        if (this._checked !== value) {
            this._checked = value;
            this._onDidChange.fire({ checked: value });
        }
    }
    _setRadio(value) {
        if (this._radio !== value) {
            this._radio = value;
            this._onDidChange.fire({ radio: value });
        }
    }
    run(event, _data) {
        if (this._actionCallback) {
            return this._actionCallback(event);
        }
        return Promise.resolve(true);
    }
    dispose() {
        this._onDidChange.dispose();
    }
}
export class ActionRunner extends Disposable {
    constructor() {
        super(...arguments);
        this._onDidBeforeRun = this._register(new Emitter());
        this.onDidBeforeRun = this._onDidBeforeRun.event;
        this._onDidRun = this._register(new Emitter());
        this.onDidRun = this._onDidRun.event;
    }
    run(action, context) {
        if (!action.enabled) {
            return Promise.resolve(null);
        }
        this._onDidBeforeRun.fire({ action: action });
        return this.runAction(action, context).then((result) => {
            this._onDidRun.fire({ action: action, result: result });
        }, (error) => {
            this._onDidRun.fire({ action: action, error: error });
        });
    }
    runAction(action, context) {
        const res = context ? action.run(context) : action.run();
        return Promise.resolve(res);
    }
}
export class RadioGroup extends Disposable {
    constructor(actions) {
        super();
        this.actions = actions;
        this._register(combinedDisposable(actions.map(action => {
            return action.onDidChange(e => {
                if (e.checked && action.checked) {
                    for (const candidate of actions) {
                        if (candidate !== action) {
                            candidate.checked = false;
                        }
                    }
                }
            });
        })));
    }
}
//# sourceMappingURL=actions.js.map