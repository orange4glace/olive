export declare function stringify(obj: any): string;
export declare function parse(text: string): any;
export interface MarshalledObject {
    $mid: number;
}
export declare function revive(obj: any, depth: number): any;
