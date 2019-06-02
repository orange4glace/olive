import { Disposable } from 'base/common/lifecycle';
export interface IWorker {
    getId(): number;
    postMessage(message: string): void;
    dispose(): void;
}
export interface IWorkerCallback {
    (message: string): void;
}
export interface IWorkerFactory {
    create(moduleId: string, callback: IWorkerCallback, onErrorCallback: (err: any) => void): IWorker;
}
export declare function logOnceWebWorkerWarning(err: any): void;
/**
 * Main thread side
 */
export declare class SimpleWorkerClient<T> extends Disposable {
    private _worker;
    private _onModuleLoaded;
    private _protocol;
    private _lazyProxy;
    constructor(workerFactory: IWorkerFactory, moduleId: string);
    getProxyObject(): Promise<T>;
    private _request;
    private _onError;
}
export interface IRequestHandler {
    _requestHandlerBrand: any;
    [prop: string]: any;
}
/**
 * Worker side
 */
export declare class SimpleWorkerServer {
    private _requestHandler;
    private _protocol;
    constructor(postSerializedMessage: (msg: string) => void, requestHandler: IRequestHandler | null);
    onmessage(msg: string): void;
    private _handleMessage;
    private initialize;
}
/**
 * Called on the worker side
 */
export declare function create(postMessage: (msg: string) => void): SimpleWorkerServer;
