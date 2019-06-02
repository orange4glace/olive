/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { escape } from 'base/common/strings';
export function renderOcticons(text) {
    return escape(text);
}
export class OcticonLabel {
    constructor(container) {
        this._container = container;
    }
    set text(text) {
        this._container.innerHTML = renderOcticons(text || '');
    }
}
//# sourceMappingURL=octiconLabel.mock.js.map