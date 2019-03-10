type Handler = (data: any) => void;

export class Poster {

  private self: any;
  private handlers: Map<string, Set<Handler>> = new Map();

  constructor(self: any) {
    this.self = self;

    this.self.onmessage = ((msg: any) => {
      const data = msg.data;
      const handlers = this.handlers.get(data.event);
      if (!handlers) return;
      handlers.forEach(handler => handler(data.data));
    })
  }

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

  get(): Window | Worker {
    return this.self;
  }

}