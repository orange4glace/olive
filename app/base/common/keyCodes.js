/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { OperatingSystem } from 'base/common/platform';
import { illegalArgument } from 'base/common/errors';
/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */
export var KeyCode;
(function (KeyCode) {
    /**
     * Placed first to cover the 0 value of the enum.
     */
    KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
    KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
    KeyCode[KeyCode["Tab"] = 2] = "Tab";
    KeyCode[KeyCode["Enter"] = 3] = "Enter";
    KeyCode[KeyCode["Shift"] = 4] = "Shift";
    KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
    KeyCode[KeyCode["Alt"] = 6] = "Alt";
    KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
    KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
    KeyCode[KeyCode["Escape"] = 9] = "Escape";
    KeyCode[KeyCode["Space"] = 10] = "Space";
    KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
    KeyCode[KeyCode["End"] = 13] = "End";
    KeyCode[KeyCode["Home"] = 14] = "Home";
    KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
    KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
    KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
    KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
    KeyCode[KeyCode["Insert"] = 19] = "Insert";
    KeyCode[KeyCode["Delete"] = 20] = "Delete";
    KeyCode[KeyCode["KEY_0"] = 21] = "KEY_0";
    KeyCode[KeyCode["KEY_1"] = 22] = "KEY_1";
    KeyCode[KeyCode["KEY_2"] = 23] = "KEY_2";
    KeyCode[KeyCode["KEY_3"] = 24] = "KEY_3";
    KeyCode[KeyCode["KEY_4"] = 25] = "KEY_4";
    KeyCode[KeyCode["KEY_5"] = 26] = "KEY_5";
    KeyCode[KeyCode["KEY_6"] = 27] = "KEY_6";
    KeyCode[KeyCode["KEY_7"] = 28] = "KEY_7";
    KeyCode[KeyCode["KEY_8"] = 29] = "KEY_8";
    KeyCode[KeyCode["KEY_9"] = 30] = "KEY_9";
    KeyCode[KeyCode["KEY_A"] = 31] = "KEY_A";
    KeyCode[KeyCode["KEY_B"] = 32] = "KEY_B";
    KeyCode[KeyCode["KEY_C"] = 33] = "KEY_C";
    KeyCode[KeyCode["KEY_D"] = 34] = "KEY_D";
    KeyCode[KeyCode["KEY_E"] = 35] = "KEY_E";
    KeyCode[KeyCode["KEY_F"] = 36] = "KEY_F";
    KeyCode[KeyCode["KEY_G"] = 37] = "KEY_G";
    KeyCode[KeyCode["KEY_H"] = 38] = "KEY_H";
    KeyCode[KeyCode["KEY_I"] = 39] = "KEY_I";
    KeyCode[KeyCode["KEY_J"] = 40] = "KEY_J";
    KeyCode[KeyCode["KEY_K"] = 41] = "KEY_K";
    KeyCode[KeyCode["KEY_L"] = 42] = "KEY_L";
    KeyCode[KeyCode["KEY_M"] = 43] = "KEY_M";
    KeyCode[KeyCode["KEY_N"] = 44] = "KEY_N";
    KeyCode[KeyCode["KEY_O"] = 45] = "KEY_O";
    KeyCode[KeyCode["KEY_P"] = 46] = "KEY_P";
    KeyCode[KeyCode["KEY_Q"] = 47] = "KEY_Q";
    KeyCode[KeyCode["KEY_R"] = 48] = "KEY_R";
    KeyCode[KeyCode["KEY_S"] = 49] = "KEY_S";
    KeyCode[KeyCode["KEY_T"] = 50] = "KEY_T";
    KeyCode[KeyCode["KEY_U"] = 51] = "KEY_U";
    KeyCode[KeyCode["KEY_V"] = 52] = "KEY_V";
    KeyCode[KeyCode["KEY_W"] = 53] = "KEY_W";
    KeyCode[KeyCode["KEY_X"] = 54] = "KEY_X";
    KeyCode[KeyCode["KEY_Y"] = 55] = "KEY_Y";
    KeyCode[KeyCode["KEY_Z"] = 56] = "KEY_Z";
    KeyCode[KeyCode["Meta"] = 57] = "Meta";
    KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
    KeyCode[KeyCode["F1"] = 59] = "F1";
    KeyCode[KeyCode["F2"] = 60] = "F2";
    KeyCode[KeyCode["F3"] = 61] = "F3";
    KeyCode[KeyCode["F4"] = 62] = "F4";
    KeyCode[KeyCode["F5"] = 63] = "F5";
    KeyCode[KeyCode["F6"] = 64] = "F6";
    KeyCode[KeyCode["F7"] = 65] = "F7";
    KeyCode[KeyCode["F8"] = 66] = "F8";
    KeyCode[KeyCode["F9"] = 67] = "F9";
    KeyCode[KeyCode["F10"] = 68] = "F10";
    KeyCode[KeyCode["F11"] = 69] = "F11";
    KeyCode[KeyCode["F12"] = 70] = "F12";
    KeyCode[KeyCode["F13"] = 71] = "F13";
    KeyCode[KeyCode["F14"] = 72] = "F14";
    KeyCode[KeyCode["F15"] = 73] = "F15";
    KeyCode[KeyCode["F16"] = 74] = "F16";
    KeyCode[KeyCode["F17"] = 75] = "F17";
    KeyCode[KeyCode["F18"] = 76] = "F18";
    KeyCode[KeyCode["F19"] = 77] = "F19";
    KeyCode[KeyCode["NumLock"] = 78] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 79] = "ScrollLock";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ';:' key
     */
    KeyCode[KeyCode["US_SEMICOLON"] = 80] = "US_SEMICOLON";
    /**
     * For any country/region, the '+' key
     * For the US standard keyboard, the '=+' key
     */
    KeyCode[KeyCode["US_EQUAL"] = 81] = "US_EQUAL";
    /**
     * For any country/region, the ',' key
     * For the US standard keyboard, the ',<' key
     */
    KeyCode[KeyCode["US_COMMA"] = 82] = "US_COMMA";
    /**
     * For any country/region, the '-' key
     * For the US standard keyboard, the '-_' key
     */
    KeyCode[KeyCode["US_MINUS"] = 83] = "US_MINUS";
    /**
     * For any country/region, the '.' key
     * For the US standard keyboard, the '.>' key
     */
    KeyCode[KeyCode["US_DOT"] = 84] = "US_DOT";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '/?' key
     */
    KeyCode[KeyCode["US_SLASH"] = 85] = "US_SLASH";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '`~' key
     */
    KeyCode[KeyCode["US_BACKTICK"] = 86] = "US_BACKTICK";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '[{' key
     */
    KeyCode[KeyCode["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '\|' key
     */
    KeyCode[KeyCode["US_BACKSLASH"] = 88] = "US_BACKSLASH";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ']}' key
     */
    KeyCode[KeyCode["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ''"' key
     */
    KeyCode[KeyCode["US_QUOTE"] = 90] = "US_QUOTE";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     */
    KeyCode[KeyCode["OEM_8"] = 91] = "OEM_8";
    /**
     * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
     */
    KeyCode[KeyCode["OEM_102"] = 92] = "OEM_102";
    KeyCode[KeyCode["NUMPAD_0"] = 93] = "NUMPAD_0";
    KeyCode[KeyCode["NUMPAD_1"] = 94] = "NUMPAD_1";
    KeyCode[KeyCode["NUMPAD_2"] = 95] = "NUMPAD_2";
    KeyCode[KeyCode["NUMPAD_3"] = 96] = "NUMPAD_3";
    KeyCode[KeyCode["NUMPAD_4"] = 97] = "NUMPAD_4";
    KeyCode[KeyCode["NUMPAD_5"] = 98] = "NUMPAD_5";
    KeyCode[KeyCode["NUMPAD_6"] = 99] = "NUMPAD_6";
    KeyCode[KeyCode["NUMPAD_7"] = 100] = "NUMPAD_7";
    KeyCode[KeyCode["NUMPAD_8"] = 101] = "NUMPAD_8";
    KeyCode[KeyCode["NUMPAD_9"] = 102] = "NUMPAD_9";
    KeyCode[KeyCode["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
    KeyCode[KeyCode["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
    KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
    KeyCode[KeyCode["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
    KeyCode[KeyCode["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
    KeyCode[KeyCode["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
    /**
     * Cover all key codes when IME is processing input.
     */
    KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
    KeyCode[KeyCode["ABNT_C1"] = 110] = "ABNT_C1";
    KeyCode[KeyCode["ABNT_C2"] = 111] = "ABNT_C2";
    /**
     * Placed last to cover the length of the enum.
     * Please do not depend on this value!
     */
    KeyCode[KeyCode["MAX_VALUE"] = 112] = "MAX_VALUE";
})(KeyCode || (KeyCode = {}));
class KeyCodeStrMap {
    constructor() {
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
    }
    define(keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
    }
    keyCodeToStr(keyCode) {
        return this._keyCodeToStr[keyCode];
    }
    strToKeyCode(str) {
        return this._strToKeyCode[str.toLowerCase()] || KeyCode.Unknown;
    }
}
const uiMap = new KeyCodeStrMap();
const userSettingsUSMap = new KeyCodeStrMap();
const userSettingsGeneralMap = new KeyCodeStrMap();
(function () {
    function define(keyCode, uiLabel, usUserSettingsLabel = uiLabel, generalUserSettingsLabel = usUserSettingsLabel) {
        uiMap.define(keyCode, uiLabel);
        userSettingsUSMap.define(keyCode, usUserSettingsLabel);
        userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
    }
    define(KeyCode.Unknown, 'unknown');
    define(KeyCode.Backspace, 'Backspace');
    define(KeyCode.Tab, 'Tab');
    define(KeyCode.Enter, 'Enter');
    define(KeyCode.Shift, 'Shift');
    define(KeyCode.Ctrl, 'Ctrl');
    define(KeyCode.Alt, 'Alt');
    define(KeyCode.PauseBreak, 'PauseBreak');
    define(KeyCode.CapsLock, 'CapsLock');
    define(KeyCode.Escape, 'Escape');
    define(KeyCode.Space, 'Space');
    define(KeyCode.PageUp, 'PageUp');
    define(KeyCode.PageDown, 'PageDown');
    define(KeyCode.End, 'End');
    define(KeyCode.Home, 'Home');
    define(KeyCode.LeftArrow, 'LeftArrow', 'Left');
    define(KeyCode.UpArrow, 'UpArrow', 'Up');
    define(KeyCode.RightArrow, 'RightArrow', 'Right');
    define(KeyCode.DownArrow, 'DownArrow', 'Down');
    define(KeyCode.Insert, 'Insert');
    define(KeyCode.Delete, 'Delete');
    define(KeyCode.KEY_0, '0');
    define(KeyCode.KEY_1, '1');
    define(KeyCode.KEY_2, '2');
    define(KeyCode.KEY_3, '3');
    define(KeyCode.KEY_4, '4');
    define(KeyCode.KEY_5, '5');
    define(KeyCode.KEY_6, '6');
    define(KeyCode.KEY_7, '7');
    define(KeyCode.KEY_8, '8');
    define(KeyCode.KEY_9, '9');
    define(KeyCode.KEY_A, 'A');
    define(KeyCode.KEY_B, 'B');
    define(KeyCode.KEY_C, 'C');
    define(KeyCode.KEY_D, 'D');
    define(KeyCode.KEY_E, 'E');
    define(KeyCode.KEY_F, 'F');
    define(KeyCode.KEY_G, 'G');
    define(KeyCode.KEY_H, 'H');
    define(KeyCode.KEY_I, 'I');
    define(KeyCode.KEY_J, 'J');
    define(KeyCode.KEY_K, 'K');
    define(KeyCode.KEY_L, 'L');
    define(KeyCode.KEY_M, 'M');
    define(KeyCode.KEY_N, 'N');
    define(KeyCode.KEY_O, 'O');
    define(KeyCode.KEY_P, 'P');
    define(KeyCode.KEY_Q, 'Q');
    define(KeyCode.KEY_R, 'R');
    define(KeyCode.KEY_S, 'S');
    define(KeyCode.KEY_T, 'T');
    define(KeyCode.KEY_U, 'U');
    define(KeyCode.KEY_V, 'V');
    define(KeyCode.KEY_W, 'W');
    define(KeyCode.KEY_X, 'X');
    define(KeyCode.KEY_Y, 'Y');
    define(KeyCode.KEY_Z, 'Z');
    define(KeyCode.Meta, 'Meta');
    define(KeyCode.ContextMenu, 'ContextMenu');
    define(KeyCode.F1, 'F1');
    define(KeyCode.F2, 'F2');
    define(KeyCode.F3, 'F3');
    define(KeyCode.F4, 'F4');
    define(KeyCode.F5, 'F5');
    define(KeyCode.F6, 'F6');
    define(KeyCode.F7, 'F7');
    define(KeyCode.F8, 'F8');
    define(KeyCode.F9, 'F9');
    define(KeyCode.F10, 'F10');
    define(KeyCode.F11, 'F11');
    define(KeyCode.F12, 'F12');
    define(KeyCode.F13, 'F13');
    define(KeyCode.F14, 'F14');
    define(KeyCode.F15, 'F15');
    define(KeyCode.F16, 'F16');
    define(KeyCode.F17, 'F17');
    define(KeyCode.F18, 'F18');
    define(KeyCode.F19, 'F19');
    define(KeyCode.NumLock, 'NumLock');
    define(KeyCode.ScrollLock, 'ScrollLock');
    define(KeyCode.US_SEMICOLON, ';', ';', 'OEM_1');
    define(KeyCode.US_EQUAL, '=', '=', 'OEM_PLUS');
    define(KeyCode.US_COMMA, ',', ',', 'OEM_COMMA');
    define(KeyCode.US_MINUS, '-', '-', 'OEM_MINUS');
    define(KeyCode.US_DOT, '.', '.', 'OEM_PERIOD');
    define(KeyCode.US_SLASH, '/', '/', 'OEM_2');
    define(KeyCode.US_BACKTICK, '`', '`', 'OEM_3');
    define(KeyCode.ABNT_C1, 'ABNT_C1');
    define(KeyCode.ABNT_C2, 'ABNT_C2');
    define(KeyCode.US_OPEN_SQUARE_BRACKET, '[', '[', 'OEM_4');
    define(KeyCode.US_BACKSLASH, '\\', '\\', 'OEM_5');
    define(KeyCode.US_CLOSE_SQUARE_BRACKET, ']', ']', 'OEM_6');
    define(KeyCode.US_QUOTE, '\'', '\'', 'OEM_7');
    define(KeyCode.OEM_8, 'OEM_8');
    define(KeyCode.OEM_102, 'OEM_102');
    define(KeyCode.NUMPAD_0, 'NumPad0');
    define(KeyCode.NUMPAD_1, 'NumPad1');
    define(KeyCode.NUMPAD_2, 'NumPad2');
    define(KeyCode.NUMPAD_3, 'NumPad3');
    define(KeyCode.NUMPAD_4, 'NumPad4');
    define(KeyCode.NUMPAD_5, 'NumPad5');
    define(KeyCode.NUMPAD_6, 'NumPad6');
    define(KeyCode.NUMPAD_7, 'NumPad7');
    define(KeyCode.NUMPAD_8, 'NumPad8');
    define(KeyCode.NUMPAD_9, 'NumPad9');
    define(KeyCode.NUMPAD_MULTIPLY, 'NumPad_Multiply');
    define(KeyCode.NUMPAD_ADD, 'NumPad_Add');
    define(KeyCode.NUMPAD_SEPARATOR, 'NumPad_Separator');
    define(KeyCode.NUMPAD_SUBTRACT, 'NumPad_Subtract');
    define(KeyCode.NUMPAD_DECIMAL, 'NumPad_Decimal');
    define(KeyCode.NUMPAD_DIVIDE, 'NumPad_Divide');
})();
export var KeyCodeUtils;
(function (KeyCodeUtils) {
    function toString(keyCode) {
        return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toString = toString;
    function fromString(key) {
        return uiMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromString = fromString;
    function toUserSettingsUS(keyCode) {
        return userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
        return userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
        return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromUserSettings = fromUserSettings;
})(KeyCodeUtils || (KeyCodeUtils = {}));
/**
 * Binary encoding strategy:
 * ```
 *    1111 11
 *    5432 1098 7654 3210
 *    ---- CSAW KKKK KKKK
 *  C = bit 11 = ctrlCmd flag
 *  S = bit 10 = shift flag
 *  A = bit 9 = alt flag
 *  W = bit 8 = winCtrl flag
 *  K = bits 0-7 = key code
 * ```
 */
var BinaryKeybindingsMask;
(function (BinaryKeybindingsMask) {
    BinaryKeybindingsMask[BinaryKeybindingsMask["CtrlCmd"] = 2048] = "CtrlCmd";
    BinaryKeybindingsMask[BinaryKeybindingsMask["Shift"] = 1024] = "Shift";
    BinaryKeybindingsMask[BinaryKeybindingsMask["Alt"] = 512] = "Alt";
    BinaryKeybindingsMask[BinaryKeybindingsMask["WinCtrl"] = 256] = "WinCtrl";
    BinaryKeybindingsMask[BinaryKeybindingsMask["KeyCode"] = 255] = "KeyCode";
})(BinaryKeybindingsMask || (BinaryKeybindingsMask = {}));
export var KeyMod;
(function (KeyMod) {
    KeyMod[KeyMod["CtrlCmd"] = 2048] = "CtrlCmd";
    KeyMod[KeyMod["Shift"] = 1024] = "Shift";
    KeyMod[KeyMod["Alt"] = 512] = "Alt";
    KeyMod[KeyMod["WinCtrl"] = 256] = "WinCtrl";
})(KeyMod || (KeyMod = {}));
export function KeyChord(firstPart, secondPart) {
    const chordPart = ((secondPart & 0x0000FFFF) << 16) >>> 0;
    return (firstPart | chordPart) >>> 0;
}
export function createKeybinding(keybinding, OS) {
    if (keybinding === 0) {
        return null;
    }
    const firstPart = (keybinding & 0x0000FFFF) >>> 0;
    const chordPart = (keybinding & 0xFFFF0000) >>> 16;
    if (chordPart !== 0) {
        return new ChordKeybinding([
            createSimpleKeybinding(firstPart, OS),
            createSimpleKeybinding(chordPart, OS)
        ]);
    }
    return new ChordKeybinding([createSimpleKeybinding(firstPart, OS)]);
}
export function createSimpleKeybinding(keybinding, OS) {
    const ctrlCmd = (keybinding & BinaryKeybindingsMask.CtrlCmd ? true : false);
    const winCtrl = (keybinding & BinaryKeybindingsMask.WinCtrl ? true : false);
    const ctrlKey = (OS === OperatingSystem.Macintosh ? winCtrl : ctrlCmd);
    const shiftKey = (keybinding & BinaryKeybindingsMask.Shift ? true : false);
    const altKey = (keybinding & BinaryKeybindingsMask.Alt ? true : false);
    const metaKey = (OS === OperatingSystem.Macintosh ? ctrlCmd : winCtrl);
    const keyCode = (keybinding & BinaryKeybindingsMask.KeyCode);
    return new SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode);
}
export class SimpleKeybinding {
    constructor(ctrlKey, shiftKey, altKey, metaKey, keyCode) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyCode = keyCode;
    }
    equals(other) {
        return (this.ctrlKey === other.ctrlKey
            && this.shiftKey === other.shiftKey
            && this.altKey === other.altKey
            && this.metaKey === other.metaKey
            && this.keyCode === other.keyCode);
    }
    getHashCode() {
        const ctrl = this.ctrlKey ? '1' : '0';
        const shift = this.shiftKey ? '1' : '0';
        const alt = this.altKey ? '1' : '0';
        const meta = this.metaKey ? '1' : '0';
        return `${ctrl}${shift}${alt}${meta}${this.keyCode}`;
    }
    isModifierKey() {
        return (this.keyCode === KeyCode.Unknown
            || this.keyCode === KeyCode.Ctrl
            || this.keyCode === KeyCode.Meta
            || this.keyCode === KeyCode.Alt
            || this.keyCode === KeyCode.Shift);
    }
    toChord() {
        return new ChordKeybinding([this]);
    }
    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    isDuplicateModifierCase() {
        return ((this.ctrlKey && this.keyCode === KeyCode.Ctrl)
            || (this.shiftKey && this.keyCode === KeyCode.Shift)
            || (this.altKey && this.keyCode === KeyCode.Alt)
            || (this.metaKey && this.keyCode === KeyCode.Meta));
    }
}
export class ChordKeybinding {
    constructor(parts) {
        if (parts.length === 0) {
            throw illegalArgument(`parts`);
        }
        this.parts = parts;
    }
    getHashCode() {
        let result = '';
        for (let i = 0, len = this.parts.length; i < len; i++) {
            if (i !== 0) {
                result += ';';
            }
            result += this.parts[i].getHashCode();
        }
        return result;
    }
    equals(other) {
        if (other === null) {
            return false;
        }
        if (this.parts.length !== other.parts.length) {
            return false;
        }
        for (let i = 0; i < this.parts.length; i++) {
            if (!this.parts[i].equals(other.parts[i])) {
                return false;
            }
        }
        return true;
    }
}
export class ResolvedKeybindingPart {
    constructor(ctrlKey, shiftKey, altKey, metaKey, kbLabel, kbAriaLabel) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyLabel = kbLabel;
        this.keyAriaLabel = kbAriaLabel;
    }
}
/**
 * A resolved keybinding. Can be a simple keybinding or a chord keybinding.
 */
export class ResolvedKeybinding {
}
//# sourceMappingURL=keyCodes.js.map