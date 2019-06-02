import { Event } from 'base/common/event';
export interface CancellationToken {
    readonly isCancellationRequested: boolean;
    /**
     * An event emitted when cancellation is requested
     * @event
     */
    readonly onCancellationRequested: Event<any>;
}
export declare namespace CancellationToken {
    function isCancellationToken(thing: any): thing is CancellationToken;
    const None: CancellationToken;
    const Cancelled: CancellationToken;
}
export declare class CancellationTokenSource {
    private _token?;
    private _parentListener?;
    constructor(parent?: CancellationToken);
    readonly token: CancellationToken;
    cancel(): void;
    dispose(): void;
}
