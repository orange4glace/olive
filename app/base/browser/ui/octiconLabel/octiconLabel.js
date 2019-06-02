/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './octicons/octicons.css';
import './octicons/octicons-animations.css';
import { escape } from 'base/common/strings';
function expand(text) {
    return text.replace(/\$\(((.+?)(~(.*?))?)\)/g, (_match, _g1, name, _g3, animation) => {
        return `<span class="octicon octicon-${name} ${animation ? `octicon-animation-${animation}` : ''}"></span>`;
    });
}
export function renderOcticons(label) {
    return expand(escape(label));
}
export class OcticonLabel {
    constructor(_container) {
        this._container = _container;
    }
    set text(text) {
        this._container.innerHTML = renderOcticons(text || '');
    }
    set title(title) {
        this._container.title = title;
    }
}
//# sourceMappingURL=octiconLabel.js.map