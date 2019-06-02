export interface IFilter {
    (word: string, wordToMatchAgainst: string): IMatch[] | null;
}
export interface IMatch {
    start: number;
    end: number;
}
/**
 * @returns A filter which combines the provided set
 * of filters with an or. The *first* filters that
 * matches defined the return value of the returned
 * filter.
 */
export declare function or(...filter: IFilter[]): IFilter;
export declare const matchesStrictPrefix: IFilter;
export declare const matchesPrefix: IFilter;
export declare function matchesContiguousSubString(word: string, wordToMatchAgainst: string): IMatch[] | null;
export declare function matchesSubString(word: string, wordToMatchAgainst: string): IMatch[] | null;
export declare function isUpper(code: number): boolean;
export declare function matchesCamelCase(word: string, camelCaseWord: string): IMatch[] | null;
export declare function matchesWords(word: string, target: string, contiguous?: boolean): IMatch[] | null;
export declare function matchesFuzzy(word: string, wordToMatchAgainst: string, enableSeparateSubstringMatching?: boolean): IMatch[] | null;
/**
 * Match pattern againt word in a fuzzy way. As in IntelliSense and faster and more
 * powerfull than `matchesFuzzy`
 */
export declare function matchesFuzzy2(pattern: string, word: string): IMatch[] | null;
export declare function anyScore(pattern: string, lowPattern: string, _patternPos: number, word: string, lowWord: string, _wordPos: number): FuzzyScore;
export declare function createMatches(score: undefined | FuzzyScore): IMatch[];
/**
 * A tuple of three values.
 * 0. the score
 * 1. the matches encoded as bitmask (2^53)
 * 2. the offset at which matching started
 */
export declare type FuzzyScore = [number, number, number];
export declare namespace FuzzyScore {
    /**
     * No matches and value `-100`
     */
    const Default: [-100, 0, 0];
    function isDefault(score?: FuzzyScore): score is [-100, 0, 0];
}
export interface FuzzyScorer {
    (pattern: string, lowPattern: string, patternPos: number, word: string, lowWord: string, wordPos: number, firstMatchCanBeWeak: boolean): FuzzyScore | undefined;
}
export declare function fuzzyScore(pattern: string, patternLow: string, patternPos: number, word: string, wordLow: string, wordPos: number, firstMatchCanBeWeak: boolean): FuzzyScore | undefined;
export declare function fuzzyScoreGracefulAggressive(pattern: string, lowPattern: string, patternPos: number, word: string, lowWord: string, wordPos: number, firstMatchCanBeWeak: boolean): FuzzyScore | undefined;
export declare function fuzzyScoreGraceful(pattern: string, lowPattern: string, patternPos: number, word: string, lowWord: string, wordPos: number, firstMatchCanBeWeak: boolean): FuzzyScore | undefined;
