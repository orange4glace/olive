/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './selectBox.css';
import { Widget } from 'base/browser/ui/widget';
import { Color } from 'base/common/color';
import { deepClone, mixin } from 'base/common/objects';
import { SelectBoxNative } from 'base/browser/ui/selectBox/selectBoxNative';
import { SelectBoxList } from 'base/browser/ui/selectBox/selectBoxCustom';
import { isMacintosh } from 'base/common/platform';
export const defaultStyles = {
    selectBackground: Color.fromHex('#3C3C3C'),
    selectForeground: Color.fromHex('#F0F0F0'),
    selectBorder: Color.fromHex('#3C3C3C')
};
export class SelectBox extends Widget {
    constructor(options, selected, contextViewProvider, styles = deepClone(defaultStyles), selectBoxOptions) {
        super();
        mixin(this.styles, defaultStyles, false);
        // Default to native SelectBox for OSX unless overridden
        if (isMacintosh && !(selectBoxOptions && selectBoxOptions.useCustomDrawn)) {
            this.selectBoxDelegate = new SelectBoxNative(options, selected, styles, selectBoxOptions);
        }
        else {
            this.selectBoxDelegate = new SelectBoxList(options, selected, contextViewProvider, styles, selectBoxOptions);
        }
        this._register(this.selectBoxDelegate);
    }
    // Public SelectBox Methods - routed through delegate interface
    get onDidSelect() {
        return this.selectBoxDelegate.onDidSelect;
    }
    setOptions(options, selected) {
        this.selectBoxDelegate.setOptions(options, selected);
    }
    select(index) {
        this.selectBoxDelegate.select(index);
    }
    setAriaLabel(label) {
        this.selectBoxDelegate.setAriaLabel(label);
    }
    focus() {
        this.selectBoxDelegate.focus();
    }
    blur() {
        this.selectBoxDelegate.blur();
    }
    // Public Widget Methods - routed through delegate interface
    render(container) {
        this.selectBoxDelegate.render(container);
    }
    style(styles) {
        this.selectBoxDelegate.style(styles);
    }
    applyStyles() {
        this.selectBoxDelegate.applyStyles();
    }
}
//# sourceMappingURL=selectBox.js.map