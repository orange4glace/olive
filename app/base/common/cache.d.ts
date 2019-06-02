import { CancellationToken } from 'base/common/cancellation';
export interface CacheResult<T> {
    promise: Promise<T>;
    dispose(): void;
}
export declare class Cache<T> {
    private task;
    private result;
    constructor(task: (ct: CancellationToken) => Promise<T>);
    get(): CacheResult<T>;
}
