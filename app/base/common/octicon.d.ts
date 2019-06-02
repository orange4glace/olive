import { IMatch } from 'base/common/filters';
export interface IParsedOcticons {
    text: string;
    octiconOffsets?: number[];
}
export declare function parseOcticons(text: string): IParsedOcticons;
export declare function matchesFuzzyOcticonAware(query: string, target: IParsedOcticons, enableSeparateSubstringMatching?: boolean): IMatch[] | null;
