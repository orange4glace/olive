import { Checkbox } from 'base/browser/ui/checkbox/checkbox';
import { Color } from 'base/common/color';
import './findInputCheckboxes.css';
export interface IFindInputCheckboxOpts {
    readonly appendTitle: string;
    readonly isChecked: boolean;
    readonly inputActiveOptionBorder?: Color;
}
export declare class CaseSensitiveCheckbox extends Checkbox {
    constructor(opts: IFindInputCheckboxOpts);
}
export declare class WholeWordsCheckbox extends Checkbox {
    constructor(opts: IFindInputCheckboxOpts);
}
export declare class RegexCheckbox extends Checkbox {
    constructor(opts: IFindInputCheckboxOpts);
}
