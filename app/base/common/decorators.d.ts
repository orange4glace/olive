export declare function createDecorator(mapFn: (fn: Function, key: string) => Function): Function;
export declare function memoize(target: any, key: string, descriptor: any): void;
export interface IDebouceReducer<T> {
    (previousValue: T, ...args: any[]): T;
}
export declare function debounce<T>(delay: number, reducer?: IDebouceReducer<T>, initialValueProvider?: () => T): Function;
