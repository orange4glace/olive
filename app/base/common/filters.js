/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CharCode } from 'base/common/charCode';
import { LRUCache } from 'base/common/map';
import * as strings from 'base/common/strings';
// Combined filters
/**
 * @returns A filter which combines the provided set
 * of filters with an or. The *first* filters that
 * matches defined the return value of the returned
 * filter.
 */
export function or(...filter) {
    return function (word, wordToMatchAgainst) {
        for (let i = 0, len = filter.length; i < len; i++) {
            const match = filter[i](word, wordToMatchAgainst);
            if (match) {
                return match;
            }
        }
        return null;
    };
}
// Prefix
export const matchesStrictPrefix = _matchesPrefix.bind(undefined, false);
export const matchesPrefix = _matchesPrefix.bind(undefined, true);
function _matchesPrefix(ignoreCase, word, wordToMatchAgainst) {
    if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
        return null;
    }
    let matches;
    if (ignoreCase) {
        matches = strings.startsWithIgnoreCase(wordToMatchAgainst, word);
    }
    else {
        matches = wordToMatchAgainst.indexOf(word) === 0;
    }
    if (!matches) {
        return null;
    }
    return word.length > 0 ? [{ start: 0, end: word.length }] : [];
}
// Contiguous Substring
export function matchesContiguousSubString(word, wordToMatchAgainst) {
    const index = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) {
        return null;
    }
    return [{ start: index, end: index + word.length }];
}
// Substring
export function matchesSubString(word, wordToMatchAgainst) {
    return _matchesSubString(word.toLowerCase(), wordToMatchAgainst.toLowerCase(), 0, 0);
}
function _matchesSubString(word, wordToMatchAgainst, i, j) {
    if (i === word.length) {
        return [];
    }
    else if (j === wordToMatchAgainst.length) {
        return null;
    }
    else {
        if (word[i] === wordToMatchAgainst[j]) {
            let result = null;
            if (result = _matchesSubString(word, wordToMatchAgainst, i + 1, j + 1)) {
                return join({ start: j, end: j + 1 }, result);
            }
            return null;
        }
        return _matchesSubString(word, wordToMatchAgainst, i, j + 1);
    }
}
// CamelCase
function isLower(code) {
    return CharCode.a <= code && code <= CharCode.z;
}
export function isUpper(code) {
    return CharCode.A <= code && code <= CharCode.Z;
}
function isNumber(code) {
    return CharCode.Digit0 <= code && code <= CharCode.Digit9;
}
function isWhitespace(code) {
    return (code === CharCode.Space
        || code === CharCode.Tab
        || code === CharCode.LineFeed
        || code === CharCode.CarriageReturn);
}
const wordSeparators = new Set();
'`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'
    .split('')
    .forEach(s => wordSeparators.add(s.charCodeAt(0)));
function isWordSeparator(code) {
    return wordSeparators.has(code);
}
function isAlphanumeric(code) {
    return isLower(code) || isUpper(code) || isNumber(code);
}
function join(head, tail) {
    if (tail.length === 0) {
        tail = [head];
    }
    else if (head.end === tail[0].start) {
        tail[0].start = head.start;
    }
    else {
        tail.unshift(head);
    }
    return tail;
}
function nextAnchor(camelCaseWord, start) {
    for (let i = start; i < camelCaseWord.length; i++) {
        const c = camelCaseWord.charCodeAt(i);
        if (isUpper(c) || isNumber(c) || (i > 0 && !isAlphanumeric(camelCaseWord.charCodeAt(i - 1)))) {
            return i;
        }
    }
    return camelCaseWord.length;
}
function _matchesCamelCase(word, camelCaseWord, i, j) {
    if (i === word.length) {
        return [];
    }
    else if (j === camelCaseWord.length) {
        return null;
    }
    else if (word[i] !== camelCaseWord[j].toLowerCase()) {
        return null;
    }
    else {
        let result = null;
        let nextUpperIndex = j + 1;
        result = _matchesCamelCase(word, camelCaseWord, i + 1, j + 1);
        while (!result && (nextUpperIndex = nextAnchor(camelCaseWord, nextUpperIndex)) < camelCaseWord.length) {
            result = _matchesCamelCase(word, camelCaseWord, i + 1, nextUpperIndex);
            nextUpperIndex++;
        }
        return result === null ? null : join({ start: j, end: j + 1 }, result);
    }
}
// Heuristic to avoid computing camel case matcher for words that don't
// look like camelCaseWords.
function analyzeCamelCaseWord(word) {
    let upper = 0, lower = 0, alpha = 0, numeric = 0, code = 0;
    for (let i = 0; i < word.length; i++) {
        code = word.charCodeAt(i);
        if (isUpper(code)) {
            upper++;
        }
        if (isLower(code)) {
            lower++;
        }
        if (isAlphanumeric(code)) {
            alpha++;
        }
        if (isNumber(code)) {
            numeric++;
        }
    }
    const upperPercent = upper / word.length;
    const lowerPercent = lower / word.length;
    const alphaPercent = alpha / word.length;
    const numericPercent = numeric / word.length;
    return { upperPercent, lowerPercent, alphaPercent, numericPercent };
}
function isUpperCaseWord(analysis) {
    const { upperPercent, lowerPercent } = analysis;
    return lowerPercent === 0 && upperPercent > 0.6;
}
function isCamelCaseWord(analysis) {
    const { upperPercent, lowerPercent, alphaPercent, numericPercent } = analysis;
    return lowerPercent > 0.2 && upperPercent < 0.8 && alphaPercent > 0.6 && numericPercent < 0.2;
}
// Heuristic to avoid computing camel case matcher for words that don't
// look like camel case patterns.
function isCamelCasePattern(word) {
    let upper = 0, lower = 0, code = 0, whitespace = 0;
    for (let i = 0; i < word.length; i++) {
        code = word.charCodeAt(i);
        if (isUpper(code)) {
            upper++;
        }
        if (isLower(code)) {
            lower++;
        }
        if (isWhitespace(code)) {
            whitespace++;
        }
    }
    if ((upper === 0 || lower === 0) && whitespace === 0) {
        return word.length <= 30;
    }
    else {
        return upper <= 5;
    }
}
export function matchesCamelCase(word, camelCaseWord) {
    if (!camelCaseWord) {
        return null;
    }
    camelCaseWord = camelCaseWord.trim();
    if (camelCaseWord.length === 0) {
        return null;
    }
    if (!isCamelCasePattern(word)) {
        return null;
    }
    if (camelCaseWord.length > 60) {
        return null;
    }
    const analysis = analyzeCamelCaseWord(camelCaseWord);
    if (!isCamelCaseWord(analysis)) {
        if (!isUpperCaseWord(analysis)) {
            return null;
        }
        camelCaseWord = camelCaseWord.toLowerCase();
    }
    let result = null;
    let i = 0;
    word = word.toLowerCase();
    while (i < camelCaseWord.length && (result = _matchesCamelCase(word, camelCaseWord, 0, i)) === null) {
        i = nextAnchor(camelCaseWord, i + 1);
    }
    return result;
}
// Matches beginning of words supporting non-ASCII languages
// If `contiguous` is true then matches word with beginnings of the words in the target. E.g. "pul" will match "Git: Pull"
// Otherwise also matches sub string of the word with beginnings of the words in the target. E.g. "gp" or "g p" will match "Git: Pull"
// Useful in cases where the target is words (e.g. command labels)
export function matchesWords(word, target, contiguous = false) {
    if (!target || target.length === 0) {
        return null;
    }
    let result = null;
    let i = 0;
    word = word.toLowerCase();
    target = target.toLowerCase();
    while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) {
        i = nextWord(target, i + 1);
    }
    return result;
}
function _matchesWords(word, target, i, j, contiguous) {
    if (i === word.length) {
        return [];
    }
    else if (j === target.length) {
        return null;
    }
    else if (word[i] !== target[j]) {
        return null;
    }
    else {
        let result = null;
        let nextWordIndex = j + 1;
        result = _matchesWords(word, target, i + 1, j + 1, contiguous);
        if (!contiguous) {
            while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
                result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
                nextWordIndex++;
            }
        }
        return result === null ? null : join({ start: j, end: j + 1 }, result);
    }
}
function nextWord(word, start) {
    for (let i = start; i < word.length; i++) {
        const c = word.charCodeAt(i);
        if (isWhitespace(c) || (i > 0 && isWhitespace(word.charCodeAt(i - 1))) ||
            isWordSeparator(c) || (i > 0 && isWordSeparator(word.charCodeAt(i - 1)))) {
            return i;
        }
    }
    return word.length;
}
// Fuzzy
const fuzzyContiguousFilter = or(matchesPrefix, matchesCamelCase, matchesContiguousSubString);
const fuzzySeparateFilter = or(matchesPrefix, matchesCamelCase, matchesSubString);
const fuzzyRegExpCache = new LRUCache(10000); // bounded to 10000 elements
export function matchesFuzzy(word, wordToMatchAgainst, enableSeparateSubstringMatching = false) {
    if (typeof word !== 'string' || typeof wordToMatchAgainst !== 'string') {
        return null; // return early for invalid input
    }
    // Form RegExp for wildcard matches
    let regexp = fuzzyRegExpCache.get(word);
    if (!regexp) {
        regexp = new RegExp(strings.convertSimple2RegExpPattern(word), 'i');
        fuzzyRegExpCache.set(word, regexp);
    }
    // RegExp Filter
    const match = regexp.exec(wordToMatchAgainst);
    if (match) {
        return [{ start: match.index, end: match.index + match[0].length }];
    }
    // Default Filter
    return enableSeparateSubstringMatching ? fuzzySeparateFilter(word, wordToMatchAgainst) : fuzzyContiguousFilter(word, wordToMatchAgainst);
}
/**
 * Match pattern againt word in a fuzzy way. As in IntelliSense and faster and more
 * powerfull than `matchesFuzzy`
 */
export function matchesFuzzy2(pattern, word) {
    const score = fuzzyScore(pattern, pattern.toLowerCase(), 0, word, word.toLowerCase(), 0, true);
    return score ? createMatches(score) : null;
}
export function anyScore(pattern, lowPattern, _patternPos, word, lowWord, _wordPos) {
    const result = fuzzyScore(pattern, lowPattern, 0, word, lowWord, 0, true);
    if (result) {
        return result;
    }
    let matches = 0;
    let score = 0;
    let idx = _wordPos;
    for (let patternPos = 0; patternPos < lowPattern.length && patternPos < _maxLen; ++patternPos) {
        const wordPos = lowWord.indexOf(lowPattern.charAt(patternPos), idx);
        if (wordPos >= 0) {
            score += 1;
            matches += Math.pow(2, wordPos);
            idx = wordPos + 1;
        }
    }
    return [score, matches, _wordPos];
}
//#region --- fuzzyScore ---
export function createMatches(score) {
    if (typeof score === 'undefined') {
        return [];
    }
    const matches = score[1].toString(2);
    const wordStart = score[2];
    const res = [];
    for (let pos = wordStart; pos < _maxLen; pos++) {
        if (matches[matches.length - (pos + 1)] === '1') {
            const last = res[res.length - 1];
            if (last && last.end === pos) {
                last.end = pos + 1;
            }
            else {
                res.push({ start: pos, end: pos + 1 });
            }
        }
    }
    return res;
}
const _maxLen = 53;
function initTable() {
    const table = [];
    const row = [0];
    for (let i = 1; i <= _maxLen; i++) {
        row.push(-i);
    }
    for (let i = 0; i <= _maxLen; i++) {
        const thisRow = row.slice(0);
        thisRow[0] = -i;
        table.push(thisRow);
    }
    return table;
}
const _table = initTable();
const _scores = initTable();
const _arrows = initTable();
const _debug = false;
function printTable(table, pattern, patternLen, word, wordLen) {
    function pad(s, n, pad = ' ') {
        while (s.length < n) {
            s = pad + s;
        }
        return s;
    }
    let ret = ` |   |${word.split('').map(c => pad(c, 3)).join('|')}\n`;
    for (let i = 0; i <= patternLen; i++) {
        if (i === 0) {
            ret += ' |';
        }
        else {
            ret += `${pattern[i - 1]}|`;
        }
        ret += table[i].slice(0, wordLen + 1).map(n => pad(n.toString(), 3)).join('|') + '\n';
    }
    return ret;
}
function isSeparatorAtPos(value, index) {
    if (index < 0 || index >= value.length) {
        return false;
    }
    const code = value.charCodeAt(index);
    switch (code) {
        case CharCode.Underline:
        case CharCode.Dash:
        case CharCode.Period:
        case CharCode.Space:
        case CharCode.Slash:
        case CharCode.Backslash:
        case CharCode.SingleQuote:
        case CharCode.DoubleQuote:
        case CharCode.Colon:
        case CharCode.DollarSign:
            return true;
        default:
            return false;
    }
}
function isWhitespaceAtPos(value, index) {
    if (index < 0 || index >= value.length) {
        return false;
    }
    const code = value.charCodeAt(index);
    switch (code) {
        case CharCode.Space:
        case CharCode.Tab:
            return true;
        default:
            return false;
    }
}
function isUpperCaseAtPos(pos, word, wordLow) {
    return word[pos] !== wordLow[pos];
}
function isPatternInWord(patternLow, patternPos, patternLen, wordLow, wordPos, wordLen) {
    while (patternPos < patternLen && wordPos < wordLen) {
        if (patternLow[patternPos] === wordLow[wordPos]) {
            patternPos += 1;
        }
        wordPos += 1;
    }
    return patternPos === patternLen; // pattern must be exhausted
}
var Arrow;
(function (Arrow) {
    Arrow[Arrow["Top"] = 1] = "Top";
    Arrow[Arrow["Diag"] = 2] = "Diag";
    Arrow[Arrow["Left"] = 4] = "Left";
})(Arrow || (Arrow = {}));
export var FuzzyScore;
(function (FuzzyScore) {
    /**
     * No matches and value `-100`
     */
    FuzzyScore.Default = [-100, 0, 0];
    function isDefault(score) {
        return !score || (score[0] === -100 && score[1] === 0 && score[2] === 0);
    }
    FuzzyScore.isDefault = isDefault;
})(FuzzyScore || (FuzzyScore = {}));
export function fuzzyScore(pattern, patternLow, patternPos, word, wordLow, wordPos, firstMatchCanBeWeak) {
    const patternLen = pattern.length > _maxLen ? _maxLen : pattern.length;
    const wordLen = word.length > _maxLen ? _maxLen : word.length;
    if (patternPos >= patternLen || wordPos >= wordLen || patternLen > wordLen) {
        return undefined;
    }
    // Run a simple check if the characters of pattern occur
    // (in order) at all in word. If that isn't the case we
    // stop because no match will be possible
    if (!isPatternInWord(patternLow, patternPos, patternLen, wordLow, wordPos, wordLen)) {
        return undefined;
    }
    const patternStartPos = patternPos;
    const wordStartPos = wordPos;
    // There will be a mach, fill in tables
    for (patternPos = patternStartPos + 1; patternPos <= patternLen; patternPos++) {
        for (wordPos = 1; wordPos <= wordLen; wordPos++) {
            let score = -1;
            if (patternLow[patternPos - 1] === wordLow[wordPos - 1]) {
                if (wordPos === (patternPos - patternStartPos)) {
                    // common prefix: `foobar <-> foobaz`
                    //                            ^^^^^
                    if (pattern[patternPos - 1] === word[wordPos - 1]) {
                        score = 7;
                    }
                    else {
                        score = 5;
                    }
                }
                else if (isUpperCaseAtPos(wordPos - 1, word, wordLow) && (wordPos === 1 || !isUpperCaseAtPos(wordPos - 2, word, wordLow))) {
                    // hitting upper-case: `foo <-> forOthers`
                    //                              ^^ ^
                    if (pattern[patternPos - 1] === word[wordPos - 1]) {
                        score = 7;
                    }
                    else {
                        score = 5;
                    }
                }
                else if (isSeparatorAtPos(wordLow, wordPos - 2) || isWhitespaceAtPos(wordLow, wordPos - 2)) {
                    // post separator: `foo <-> bar_foo`
                    //                              ^^^
                    score = 5;
                }
                else {
                    score = 1;
                }
            }
            _scores[patternPos][wordPos] = score;
            const diag = _table[patternPos - 1][wordPos - 1] + (score > 1 ? 1 : score);
            const top = _table[patternPos - 1][wordPos] + -1;
            const left = _table[patternPos][wordPos - 1] + -1;
            if (left >= top) {
                // left or diag
                if (left > diag) {
                    _table[patternPos][wordPos] = left;
                    _arrows[patternPos][wordPos] = Arrow.Left;
                }
                else if (left === diag) {
                    _table[patternPos][wordPos] = left;
                    _arrows[patternPos][wordPos] = Arrow.Left | Arrow.Diag;
                }
                else {
                    _table[patternPos][wordPos] = diag;
                    _arrows[patternPos][wordPos] = Arrow.Diag;
                }
            }
            else {
                // top or diag
                if (top > diag) {
                    _table[patternPos][wordPos] = top;
                    _arrows[patternPos][wordPos] = Arrow.Top;
                }
                else if (top === diag) {
                    _table[patternPos][wordPos] = top;
                    _arrows[patternPos][wordPos] = Arrow.Top | Arrow.Diag;
                }
                else {
                    _table[patternPos][wordPos] = diag;
                    _arrows[patternPos][wordPos] = Arrow.Diag;
                }
            }
        }
    }
    if (_debug) {
        console.log(printTable(_table, pattern, patternLen, word, wordLen));
        console.log(printTable(_arrows, pattern, patternLen, word, wordLen));
        console.log(printTable(_scores, pattern, patternLen, word, wordLen));
    }
    _matchesCount = 0;
    _topScore = -100;
    _patternStartPos = patternStartPos;
    _firstMatchCanBeWeak = firstMatchCanBeWeak;
    _findAllMatches2(patternLen, wordLen, patternLen === wordLen ? 1 : 0, 0, false);
    if (_matchesCount === 0) {
        return undefined;
    }
    return [_topScore, _topMatch2, wordStartPos];
}
let _matchesCount = 0;
let _topMatch2 = 0;
let _topScore = 0;
let _patternStartPos = 0;
let _firstMatchCanBeWeak = false;
function _findAllMatches2(patternPos, wordPos, total, matches, lastMatched) {
    if (_matchesCount >= 10 || total < -25) {
        // stop when having already 10 results, or
        // when a potential alignment as already 5 gaps
        return;
    }
    let simpleMatchCount = 0;
    while (patternPos > _patternStartPos && wordPos > 0) {
        const score = _scores[patternPos][wordPos];
        const arrow = _arrows[patternPos][wordPos];
        if (arrow === Arrow.Left) {
            // left -> no match, skip a word character
            wordPos -= 1;
            if (lastMatched) {
                total -= 5; // new gap penalty
            }
            else if (matches !== 0) {
                total -= 1; // gap penalty after first match
            }
            lastMatched = false;
            simpleMatchCount = 0;
        }
        else if (arrow & Arrow.Diag) {
            if (arrow & Arrow.Left) {
                // left
                _findAllMatches2(patternPos, wordPos - 1, matches !== 0 ? total - 1 : total, // gap penalty after first match
                matches, lastMatched);
            }
            // diag
            total += score;
            patternPos -= 1;
            wordPos -= 1;
            lastMatched = true;
            // match -> set a 1 at the word pos
            matches += Math.pow(2, wordPos);
            // count simple matches and boost a row of
            // simple matches when they yield in a
            // strong match.
            if (score === 1) {
                simpleMatchCount += 1;
                if (patternPos === _patternStartPos && !_firstMatchCanBeWeak) {
                    // when the first match is a weak
                    // match we discard it
                    return undefined;
                }
            }
            else {
                // boost
                total += 1 + (simpleMatchCount * (score - 1));
                simpleMatchCount = 0;
            }
        }
        else {
            return undefined;
        }
    }
    total -= wordPos >= 3 ? 9 : wordPos * 3; // late start penalty
    // dynamically keep track of the current top score
    // and insert the current best score at head, the rest at tail
    _matchesCount += 1;
    if (total > _topScore) {
        _topScore = total;
        _topMatch2 = matches;
    }
}
//#endregion
//#region --- graceful ---
export function fuzzyScoreGracefulAggressive(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak) {
    return fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, true, firstMatchCanBeWeak);
}
export function fuzzyScoreGraceful(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak) {
    return fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, false, firstMatchCanBeWeak);
}
function fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, aggressive, firstMatchCanBeWeak) {
    let top = fuzzyScore(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);
    if (top && !aggressive) {
        // when using the original pattern yield a result we`
        // return it unless we are aggressive and try to find
        // a better alignment, e.g. `cno` -> `^co^ns^ole` or `^c^o^nsole`.
        return top;
    }
    if (pattern.length >= 3) {
        // When the pattern is long enough then try a few (max 7)
        // permutations of the pattern to find a better match. The
        // permutations only swap neighbouring characters, e.g
        // `cnoso` becomes `conso`, `cnsoo`, `cnoos`.
        const tries = Math.min(7, pattern.length - 1);
        for (let movingPatternPos = patternPos + 1; movingPatternPos < tries; movingPatternPos++) {
            const newPattern = nextTypoPermutation(pattern, movingPatternPos);
            if (newPattern) {
                const candidate = fuzzyScore(newPattern, newPattern.toLowerCase(), patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);
                if (candidate) {
                    candidate[0] -= 3; // permutation penalty
                    if (!top || candidate[0] > top[0]) {
                        top = candidate;
                    }
                }
            }
        }
    }
    return top;
}
function nextTypoPermutation(pattern, patternPos) {
    if (patternPos + 1 >= pattern.length) {
        return undefined;
    }
    const swap1 = pattern[patternPos];
    const swap2 = pattern[patternPos + 1];
    if (swap1 === swap2) {
        return undefined;
    }
    return pattern.slice(0, patternPos)
        + swap2
        + swap1
        + pattern.slice(patternPos + 2);
}
//#endregion
//# sourceMappingURL=filters.js.map