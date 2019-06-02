/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { transformErrorForSerialization } from 'base/common/errors';
import { Disposable } from 'base/common/lifecycle';
import { isWeb } from 'base/common/platform';
import { getAllPropertyNames } from 'base/common/types';
const INITIALIZE = '$initialize';
let webWorkerWarningLogged = false;
export function logOnceWebWorkerWarning(err) {
    if (!isWeb) {
        // running tests
        return;
    }
    if (!webWorkerWarningLogged) {
        webWorkerWarningLogged = true;
        console.warn('Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq');
    }
    console.warn(err.message);
}
class SimpleWorkerProtocol {
    constructor(handler) {
        this._workerId = -1;
        this._handler = handler;
        this._lastSentReq = 0;
        this._pendingReplies = Object.create(null);
    }
    setWorkerId(workerId) {
        this._workerId = workerId;
    }
    sendMessage(method, args) {
        let req = String(++this._lastSentReq);
        return new Promise((resolve, reject) => {
            this._pendingReplies[req] = {
                resolve: resolve,
                reject: reject
            };
            this._send({
                vsWorker: this._workerId,
                req: req,
                method: method,
                args: args
            });
        });
    }
    handleMessage(serializedMessage) {
        let message;
        try {
            message = JSON.parse(serializedMessage);
        }
        catch (e) {
            // nothing
            return;
        }
        if (!message || !message.vsWorker) {
            return;
        }
        if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
            return;
        }
        this._handleMessage(message);
    }
    _handleMessage(msg) {
        if (msg.seq) {
            let replyMessage = msg;
            if (!this._pendingReplies[replyMessage.seq]) {
                console.warn('Got reply to unknown seq');
                return;
            }
            let reply = this._pendingReplies[replyMessage.seq];
            delete this._pendingReplies[replyMessage.seq];
            if (replyMessage.err) {
                let err = replyMessage.err;
                if (replyMessage.err.$isError) {
                    err = new Error();
                    err.name = replyMessage.err.name;
                    err.message = replyMessage.err.message;
                    err.stack = replyMessage.err.stack;
                }
                reply.reject(err);
                return;
            }
            reply.resolve(replyMessage.res);
            return;
        }
        let requestMessage = msg;
        let req = requestMessage.req;
        let result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
        result.then((r) => {
            this._send({
                vsWorker: this._workerId,
                seq: req,
                res: r,
                err: undefined
            });
        }, (e) => {
            if (e.detail instanceof Error) {
                // Loading errors have a detail property that points to the actual error
                e.detail = transformErrorForSerialization(e.detail);
            }
            this._send({
                vsWorker: this._workerId,
                seq: req,
                res: undefined,
                err: transformErrorForSerialization(e)
            });
        });
    }
    _send(msg) {
        let strMsg = JSON.stringify(msg);
        // console.log('SENDING: ' + strMsg);
        this._handler.sendMessage(strMsg);
    }
}
/**
 * Main thread side
 */
export class SimpleWorkerClient extends Disposable {
    constructor(workerFactory, moduleId) {
        super();
        let lazyProxyReject = null;
        this._worker = this._register(workerFactory.create('base/common/worker/simpleWorker', (msg) => {
            this._protocol.handleMessage(msg);
        }, (err) => {
            // in Firefox, web workers fail lazily :(
            // we will reject the proxy
            if (lazyProxyReject) {
                lazyProxyReject(err);
            }
        }));
        this._protocol = new SimpleWorkerProtocol({
            sendMessage: (msg) => {
                this._worker.postMessage(msg);
            },
            handleMessage: (method, args) => {
                // Intentionally not supporting worker -> main requests
                return Promise.resolve(null);
            }
        });
        this._protocol.setWorkerId(this._worker.getId());
        // Gather loader configuration
        let loaderConfiguration = null;
        if (typeof self.require !== 'undefined' && typeof self.require.getConfig === 'function') {
            // Get the configuration from the Monaco AMD Loader
            loaderConfiguration = self.require.getConfig();
        }
        else if (typeof self.requirejs !== 'undefined') {
            // Get the configuration from requirejs
            loaderConfiguration = self.requirejs.s.contexts._.config;
        }
        // Send initialize message
        this._onModuleLoaded = this._protocol.sendMessage(INITIALIZE, [
            this._worker.getId(),
            moduleId,
            loaderConfiguration
        ]);
        this._lazyProxy = new Promise((resolve, reject) => {
            lazyProxyReject = reject;
            this._onModuleLoaded.then((availableMethods) => {
                let proxy = {};
                for (const methodName of availableMethods) {
                    proxy[methodName] = createProxyMethod(methodName, proxyMethodRequest);
                }
                resolve(proxy);
            }, (e) => {
                reject(e);
                this._onError('Worker failed to load ' + moduleId, e);
            });
        });
        // Create proxy to loaded code
        const proxyMethodRequest = (method, args) => {
            return this._request(method, args);
        };
        const createProxyMethod = (method, proxyMethodRequest) => {
            return function () {
                let args = Array.prototype.slice.call(arguments, 0);
                return proxyMethodRequest(method, args);
            };
        };
    }
    getProxyObject() {
        return this._lazyProxy;
    }
    _request(method, args) {
        return new Promise((resolve, reject) => {
            this._onModuleLoaded.then(() => {
                this._protocol.sendMessage(method, args).then(resolve, reject);
            }, reject);
        });
    }
    _onError(message, error) {
        console.error(message);
        console.info(error);
    }
}
/**
 * Worker side
 */
export class SimpleWorkerServer {
    constructor(postSerializedMessage, requestHandler) {
        this._requestHandler = requestHandler;
        this._protocol = new SimpleWorkerProtocol({
            sendMessage: (msg) => {
                postSerializedMessage(msg);
            },
            handleMessage: (method, args) => this._handleMessage(method, args)
        });
    }
    onmessage(msg) {
        this._protocol.handleMessage(msg);
    }
    _handleMessage(method, args) {
        if (method === INITIALIZE) {
            return this.initialize(args[0], args[1], args[2]);
        }
        if (!this._requestHandler || typeof this._requestHandler[method] !== 'function') {
            return Promise.reject(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return Promise.resolve(this._requestHandler[method].apply(this._requestHandler, args));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    initialize(workerId, moduleId, loaderConfig) {
        this._protocol.setWorkerId(workerId);
        if (this._requestHandler) {
            // static request handler
            let methods = [];
            for (const prop of getAllPropertyNames(this._requestHandler)) {
                if (typeof this._requestHandler[prop] === 'function') {
                    methods.push(prop);
                }
            }
            return Promise.resolve(methods);
        }
        if (loaderConfig) {
            // Remove 'baseUrl', handling it is beyond scope for now
            if (typeof loaderConfig.baseUrl !== 'undefined') {
                delete loaderConfig['baseUrl'];
            }
            if (typeof loaderConfig.paths !== 'undefined') {
                if (typeof loaderConfig.paths.vs !== 'undefined') {
                    delete loaderConfig.paths['vs'];
                }
            }
            // Since this is in a web worker, enable catching errors
            loaderConfig.catchError = true;
            self.require.config(loaderConfig);
        }
        return new Promise((resolve, reject) => {
            // Use the global require to be sure to get the global config
            self.require([moduleId], (...result) => {
                let handlerModule = result[0];
                this._requestHandler = handlerModule.create();
                if (!this._requestHandler) {
                    reject(new Error(`No RequestHandler!`));
                    return;
                }
                let methods = [];
                for (const prop of getAllPropertyNames(this._requestHandler)) {
                    if (typeof this._requestHandler[prop] === 'function') {
                        methods.push(prop);
                    }
                }
                resolve(methods);
            }, reject);
        });
    }
}
/**
 * Called on the worker side
 */
export function create(postMessage) {
    return new SimpleWorkerServer(postMessage, null);
}
//# sourceMappingURL=simpleWorker.js.map