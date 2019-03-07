type Handler = (data: any) => void;

export class Poster {

  private self: any;
  private handlers: Map<string, Set<Handler>> = new Map();

  constructor(self: any) {
    this.self = self;

    this.self.onmessage = ((msg: any) => {
      const event = msg.event;
      const data = msg.data;
      const handlers = this.handlers.get(event);
      if (!handlers) return;
      handlers.forEach(handler => handler(data));
    })
  }

  emit(event: string, data: any) {
    this.self.postMessage({
      event: event,
      data: data
    });
  }

  on(event: string, handler: Handler) {
    if (!this.handlers.has(event))
      this.handlers.set(event, new Set());
    this.handlers.get(event).add(handler);
  }

  off(event: string, handler: Handler) {
    this.handlers.get(event).delete(handler);
  }

}