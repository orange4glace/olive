type Handler = (data: any) => void;
type RequestHandler = (req: ReceivedRequest) => void;

type poster_id_t = number;
type request_id_t = number;

export class ReceivedRequest<T = any> {
  readonly source: MessageEventSource;
  readonly requestID: number;
  readonly data: T;

  private responded: boolean;

  constructor(source: MessageEventSource, requestID: number, data: any, responded = false) {
    this.source = source;
    this.requestID = requestID;
    this.data = data;
    this.responded = responded;
  }

  respond(data: any) {
    if (this.responded) {
      console.error('[Poster] Already sent response', this);
      return;
    }
    this.responded = true;
    this.source.postMessage({
      type: 'response',
      reqID: this.requestID,
      data: data
    }, undefined);
  }
}

class SentRequest {
  resolve: any;
  reject: any;

  constructor(resolve: any, reject: any) {
    this.resolve = resolve;
    this.reject = reject;
  }
}

export class PosterResponse<T = any> {
  requestID: number;
  data: T;

  constructor(requestID: number, data: any) {
    this.requestID = requestID;
    this.data = data;
  }
}

export class Poster {

  private __next_request_id = 0;

  private self: any;
  private requestHandlers: Map<string, Set<RequestHandler>> = new Map();
  private pendingSentRequests: Map<request_id_t, SentRequest> = new Map();

  constructor(self: any) {
    this.self = self;

    this.self.onmessage = ((e: MessageEvent) => {
      const data = e.data;
      let responded = false;
      switch (data.type) {
        case 'send':
          responded = true;
        case 'request':
          let req = new ReceivedRequest(e.source || this.self, data.reqID, data.data, responded);
          this.handleRequest(data.event, req);
        break;
        case 'response':
          let res = new PosterResponse(data.reqID, data.data);
          this.handleResponse(res);
        break;
      }
    })
  }
/*
  emit(event: string, data: any) {
    this.self.postMessage({
      event: event,
      data: data
    });
  }

  postMessage(event: string, data: any) {
    this.emit(event, data);
  }

  transferMessage(event: string, transferrable: any) {
    this.self.postMessage({
      event: event,
      data: transferrable
    }, [transferrable]);
  }

  on(event: string, handler: Handler) {
    if (!this.handlers.has(event))
      this.handlers.set(event, new Set());
    this.handlers.get(event).add(handler);
  }

  off(event: string, handler: Handler) {
    this.handlers.get(event).delete(handler);
  }
*/
  private handleRequest(event: string, req: ReceivedRequest) {
    const handlers = this.requestHandlers.get(event);
    if (!handlers) return;
    handlers.forEach(handler => handler(req));
  }

  private handleResponse(res: PosterResponse) {
    let sentReq = this.pendingSentRequests.get(res.requestID);
    sentReq.resolve(res.data);
  }

  addRequestListener(event: string, handler: RequestHandler) {
    if (!this.requestHandlers.has(event))
      this.requestHandlers.set(event, new Set());
    this.requestHandlers.get(event).add(handler);
  }

  request(event: string, data: any, transferrable: any[] = undefined): Promise<any> {
    let reqID = this.getNextRequestID();
    let promise = new Promise<PosterResponse<any>>((resolve, reject) => {
      this.self.postMessage({
        type: 'request',
        event: event,
        reqID: reqID,
        data: data
      }, transferrable);
      this.pendingSentRequests.set(reqID,
          new SentRequest(resolve, reject));
    })
    return promise;
  }

  send(event: string, data: any, transferrable: any[] = undefined): void {
    this.self.postMessage({
      type: 'send',
      event: event,
      data: data
    }, transferrable);
  }

  get(): Window | Worker {
    return this.self;
  }

  private getNextRequestID() {
    return this.__next_request_id++;
  }

}