import { Keybinding, SimpleKeybinding } from 'base/common/keyCodes';
import { OperatingSystem } from 'base/common/platform';
import { ScanCodeBinding } from 'base/common/scanCode';
export declare class KeybindingParser {
    private static _readModifiers;
    private static parseSimpleKeybinding;
    static parseKeybinding(input: string, OS: OperatingSystem): Keybinding | null;
    private static parseSimpleUserBinding;
    static parseUserBinding(input: string): (SimpleKeybinding | ScanCodeBinding)[];
}
